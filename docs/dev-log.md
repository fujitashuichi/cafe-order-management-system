## 2026-01-22
* 開発の要件定義
* バックエンドから作ることに決定: データ型の混乱が生じにくいように、DBから作っていくことに決めました
* DB構造を明確にし、クラスファイルを作成: 堅牢な型定義の練習を兼ねています
* DBを作成
* 一部のクラスにミスがあり、データベースを作り直し
* 開発用Proxyで動作確認
* Proxyでステータスコード304(通信成功)を確認。Corsに移行
* reactのcontextでポート番号を一元管理

## 2026-01-23
* Corsでステータスコード200を確認
* シードデータを作成。frontend → backendのデータ通信をテストし、合格
* 管理者ページを追加し、商品登録の機能を追加（POSTメソッド）

## 2026-01-24
* 管理者ページに商品を一覧表示
* 商品追加・削除・カテゴリー指定を可能に

## 2026-01-25
* カテゴリー削除機能を実装。商品が紐ずけられたカテゴリーは削除できない仕様に
* 商品情報を編集可能に (Model構造に挑戦)
* Tailwindの環境構築

## 2026-01-26
* 管理者ページのUIデザインを調整
* ボタンの部品化を行い、可読性を向上
* ヘッダーとHomePageのメインビジュアルをゴーディング

## 2026-01-27
* 状況整理: 将来的にBEのControllerの処理を切り出すべき（Services層を追加）。型安全性に隙あり。
            「AdminPage = 画面 + 状態管理 + 通信 + 業務ルール」という問題。DtoをFEに垂れ流している。
            一般的でないロジックが散見。
* Contextを分割化 → Providerが依存関係を持たないように修正する予定

## 2026-01-28
* FEでServiceに通信処理を委託（Providerの肥大化を抑える）
* ProductServicesを作成。

## 2026-01-29
* ProductServiceをクラス化 → ProductProviderのEffectフェーズとして利用。
* 01/27の続き: AdminPageのProduct関連で、画面・ローディング状態以外の切り出しが完了。
* 例外処理のコードを整形
* ///// 問題発生 /////
  Providerが最新情報を渡していない。UIがServiceを利用することなく値を利用できなければならない。
  * 同日: 解決。UI側で情報再取得を依頼したら、ProviderがServiceとの連携を取り持つ。
  * ただし、技術力と移行コストを考え、**nullを複数返す可能性を許容**している
* AdminPageを編集（これからブラッシュアップ）
* AddProductsも編集

## 2026-01-31
* AdminPageの例外処理を整理
* 修正: ProviderがUIにnullを伝えていたのを修正。（error, loading を返すため、nullは不要）
* StrictModeを解除（設計固めを優先）
* UrlProviderを作成し、URL管理方法を若干修正
* AddProductFormを挿し込み、AdminPageの再構築を完了
* <s>予定: 次の改修に移る前に、一度テストを導入</s>
  テスト導入の前に、State遷移図を書いて流れを確認する。
* 予定変更: Providerの改修を優先。(テストはバグ探しではなくバグ対策後の確認作業として扱う方針)
* 例外を考えるとProviderの責務が増えるため、中間層を設計する方針に

## 2026-02-01
* AdminPageを編集 → <s>UIに「SuccessかつError」が届く可能性を発見（**修正最優先**）</s>✓済
* Provider/Loaderを編集 → 例外データの流れを確認し、重複確認を排除
  これにより、「SuccessかつError」状態が解消されました。
* **問題発生**: dev時に無限エラー状態（同じfetchエラーが連続）
* 無限エラーはService層で発生 → Loading失敗後に即座に呼び直されている可能性
* dev切断後もエラーが長時間流れる → 非同期が大量に溜まっていることを示している可能性
* Service層でinstanceof Error に引っかかっている → 単純にfetch時のエラー。
  ただし、エラー時に即座に再読み込みしているのが最大の問題
* **修正最優先**: 取得エラー時に即座にリロードしないように制御する
* 予定(すぐにではない): Service層のBE通信を行うファイルは例外処理に集中させたいため、1層下のLoader層で実行タイミングを計る方針に。
  したがって、さらに1層下のProviderにローディング可能かどうかを伝える。
* 構造上無限エラーの原因はService/Providerの非同期処理のトリガーにある可能性が高い → エラーメッセージにより否定された
* UIが再レンダリングを起こしている → 状態が変わって繰り返しRenderされている可能性 → 無限エラーに話が回帰する
* **原因を切り分け**: renderに関わる値を1つ1つ固定化するか、分岐をなくしてみる。
  * status分岐を無効化し、レンダリング一回で止まるか確認: 変化なし
  * statusの取りうる値すべてを試す: 変化なし
  * 以上から、Providerのstatus管理失敗を否定
* **外部データを切り離す**: 外部データに関わらないエラーであるため、BE自体を止めてみた。
  * **FE単独のエラー**: FE単独で無限レンダリングが起こっている。fetchエラーの表示はない
  * ただし、ProductProviderでエラーが起こっているという表示がここでも残った。
    これは、fetchエラーが渡った時、データが空だった時、必ずProductProviderだけが破綻しているように見える。
* **考察**: Providerのstatus管理は問題ないが例外には耐えられない。これは、最近追加したデータロジックに起因している可能性が高い。
  最初に浮かぶとすれば → **Providerのローディング管理の欠陥**
* 「ProductProvider内でロジックを無効化し、固定値を返す → レンダリング成功」
  かつ、
  「同様のロジックを持つCategoriesProviderは正常動作」
  よって、
  <s>**タイポ、またはデータ構造自体のミスの可能性が浮上**</s>
* **解決**: Loader層の Loading=true にするタイミングを書き間違えていた → Providerは崩壊していなかったが、その上層が嘘をついていたため、Loading管理の欠陥として露呈した。

## 2026-02-02
* **エラー**: ErrorでもProduct[]でもない値が流入。上層がundefinedなどをErrorかのように扱っている可能性。
    → console.error("dataType: " + typeof data); で精査
    → **datatype: object** だった。Service層の責務が正しくない？
* dataにnew Error を渡していたため、typeof data の意味がなかった。new Error 以前の値で再精査
    → invalid products data: {ok: true, value: Array(3)}
    → jsonは生きているが、Providerでの型検証が間違っていたためにError扱いされている
    → 生のjsonを型検証にかけないように修正
    → Serviceがres.json() をしておく
    → 遡ったらすでにされていた。よって、**jsonが悪い可能性が消えた**
* 確信: **LoaderとProviderの契約がずれていた**
    よく見たところ、Providerは unknown | Error を期待しているのに、
    Providerは loading: boolean を付けていた。
    つまり、今までの検証は関係なかった。
* Providerはステータスも扱いたいため、今回はLoader側の型に従う
* **責務再定義**: UIから状態を切り離しすぎて、UIの描画タイミングまで上層が握っていた。
    これは、進めば進むほど自分の首を絞める設計だと気づいた。
    よってここで、Providerはローディング状態も公開し、Union型も導入する。

  ------Service------- <br />
  ok: boolean <br />
  ------Loading------- <br />
  status: "loading" | "success" | "error" <br />
  ------Provider------ <br />
  status: "loading" | "success" | "error" <br />

  **Loadingが通信状態の意味付けを済ませて、Providerにはデータ検査と配布を任せる**
* LoaderをHookに変更
* Providerを改修
* AdminPageを改修
* AddProductFormを改修
* **UI側にHookの責務が混ざったが、責務の状態自体は明確にできた**

## 2026-02-03
* validatorsを切り出し、Providerを薄く
* **タスク**: Boundaryを追加して、success以外を処理させる
* Boundary → useSuccess → UI の構造が完成。現段階では毎回全体ロードを基本にして改修していく

  ------Service------ <br />
  ok: boolean <br />
  ------Loading------ <br />
  status: "idle" | "loading" | "error" | "success" <br />
  ------Provider----- <br />
  // ここでデータの整合性を調査
  status: "idle" | "loading" | "error" | "success" <br />
  ------Boundary----- <br />
  \<Loading /> | <></> <br />
  -----useSuccess---- <br />
  "success"→data <br />
  !"success"→Error <br />
  --------UI--------- <br />
  data <br />

## 2026-02-04
* AdminPageのセクションを切り出し、Boundaryの使用を細分化
* getURL処理をStateHookから純粋関数に変更
* **訂正**: 未解析のJSONをProviderまで渡しているとしたが、正確にはunknownを渡していて、JSON自体は解析済み
* 細やかなリファクタリングを実行
* UrlProviderを排除し、環境変数で扱うことに → 読み込み速度が大きく向上
* POST/DELETE/PUTもService層に追加。状態更新は全体ロードで施行
* 無駄なURLプロップを排除し依存関係が明白に

## 2026-02-05
* 初デプロイ
* ユーザーの商品一覧ページとカート追加機能を作成
* Mocksを作成