# 開発ログ（完全版・暫定）

> 本ログは、実装結果そのものではなく **設計判断・試行錯誤・破棄した仮説を含む思考履歴** を記録したものです。
> 後続の設計判断を自分自身で説明できる状態を保つことを目的とします。

---

## 2026-01-22

### 要件定義・初期設計

* 開発の要件定義
* **バックエンド先行開発** を決定

  * データ型の混乱を避けるため、DB → API → FE の順で構築
* DB構造を明確化し、クラスファイルを作成

  * 堅牢な型定義の練習を兼ねる
* DB作成
* クラス設計ミスによりDBを再作成
* 開発用 Proxy で動作確認
* Proxy経由でステータスコード **304（通信成功）** を確認
* CORSに移行
* React Context でポート番号を一元管理

---

## 2026-01-23

### 通信確立・管理画面の初期構築

* CORS 環境でステータスコード **200** を確認
* シードデータを作成
* frontend → backend のデータ通信テスト（合格）
* 管理者ページを追加
* 商品登録機能（POST）を実装

---

## 2026-01-24

### CRUD拡張

* 管理者ページに商品一覧を表示
* 商品の追加・削除・カテゴリー指定を可能に

---

## 2026-01-25

### モデル構造とUI拡張

* カテゴリー削除機能を実装

  * 商品が紐づいたカテゴリーは削除不可
* 商品情報の編集機能を実装

  * Model構造に挑戦
* Tailwind CSS 環境構築

---

## 2026-01-26

### UI改善

* 管理者ページのUIデザイン調整
* ボタンの部品化による可読性向上
* Header / HomePage メインビジュアルをコーディング

---

## 2026-01-27

### 設計上の問題点の顕在化

* 状況整理

  * 将来的に BE Controller の処理切り出しが必要（Service層の検討）
  * 型安全性に隙がある
  * **AdminPage = 画面 + 状態管理 + 通信 + 業務ルール** という密結合
  * DTOをそのままFEに流している
  * 一般的でないロジックが散在
* Context を分割予定

  * Provider が依存関係を持たない構造へ移行

---

## 2026-01-28

### 責務分離（Service導入）

* FE で Service 層に通信処理を委譲

  * Provider の肥大化を抑制
* ProductServices を作成

---

## 2026-01-29

### Provider設計の試行錯誤

* ProductService をクラス化

  * ProductProvider の Effect フェーズで利用
* 01/27 の続き

  * AdminPage における Product 関連の責務切り出し完了
* 例外処理コードを整形

#### 問題発生

* Provider が **最新情報をUIに渡していない**
* UI は Service を直接利用せず、Provider経由で値を受け取るべき

#### 対応

* UI 側で再取得を要求 → Provider が Service と連携
* 技術力・移行コストを考慮し、**nullを複数返す可能性を一時的に許容**

---

## 2026-01-31

### 状態管理の再設計

* AdminPage の例外処理整理
* Provider が UI に null を渡していた問題を修正

  * error / loading を返すため null 不要
* StrictMode を解除

  * 設計固めを優先
* UrlProvider を作成
* AddProductForm を組み込み、AdminPage 再構築

#### 方針変更

* テスト導入前に **状態遷移図の整理** を優先
* Provider 改修を最優先に変更
* 例外増加により Provider の責務が肥大化

  * **中間層の設計を検討**

---

## 2026-02-01

### 無限エラー問題の発生と解決

#### 問題

* dev環境で無限エラー
* Loading失敗後に即再取得している可能性
* 非同期処理が大量に溜まっている疑い

#### 切り分け

* Provider の status 管理を検証 → 問題なし
* BE 停止 → FE単独でも無限レンダリング発生
* CategoriesProvider は正常

#### 原因

* Loader 層で **loading=true にするタイミングのミス**
* Provider 自体は破綻していなかった
* 上層が誤った状態を伝えていた

---

## 2026-02-02

### 契約不整合の発見

* Error でも Product[] でもない値が流入
* typeof 検査 → object
* Provider の型検証ロジックが誤っていた

#### 本質的原因

* **Loader と Provider の契約不一致**
* Provider は unknown | Error を期待
* Loader は loading 状態を付与

#### 再定義

```
Service   : ok / value / error
Loading   : status（通信状態の意味付け）
Provider  : status + データ検証 + 配布
```

* UI描画タイミングまで上層が握っていたことが問題
* Provider はローディング状態も公開
* Union型を導入

---

## 2026-02-03

### Boundary構造の確立

* Validators を切り出し、Provider を薄く
* Boundary を追加
* 構造確定

```
Service   -> Loader -> Provider -> Boundary -> useSuccess -> UI
```

* Boundary が success 以外を遮断
* useSuccess は設計上の契約
* UI は成功前提で実装

---

## 2026-02-04

### 最終整理・最適化

* AdminPage をセクション単位で分割
* Boundary の責務範囲を明確化
* URL取得を StateHook から純粋関数へ変更
* UrlProvider を廃止

  * 環境変数管理へ移行
  * **初回読み込み速度が大幅に向上**
* POST / PUT / DELETE を Service 層へ集約
* 状態更新は全体リロードで対応
* 不要な URL props を排除

  * 依存関係が明確に

---

## 現在の設計方針（暫定結論）

* 将来使うかもしれない最適化は行わない
* 状態管理は成功パスを最短にする
* Provider は薄く、Boundary で制御
* UI は Union を扱わない

> 本設計は **破綻しにくさを最優先** とした暫定解であり、
> パフォーマンス最適化・部分更新は次フェーズで検討する。
