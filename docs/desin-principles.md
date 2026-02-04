# 設計共有メモ（暫定）

本ドキュメントは、現在のプロジェクトにおける **データ取得・UI分岐・Mutation（書き込み）** の設計方針を共有するためのまとめです。実装の迷走を防ぎ、今後の変更時の判断基準を明確にすることを目的とします。

---

## 1. 全体アーキテクチャ（読み取り系）

```
Service
  ↓
Provider（Unionを保証）
  ↓
Boundary（success 以外を遮断）
  ↓
useSuccess（型と前提を確定）
  ↓
UI（成功前提）
```

### 各レイヤーの責務

* **Service**

  * API通信
  * ok / error の一次判定
  * UI都合の状態は一切持たない

* **Provider**

  * 上層データの検閲（型検証）
  * `idle | loading | error | success` の Union を返す
  * 業務操作（追加・削除・更新）は扱わない

* **Boundary**

  * Provider の Union を UI 用の状態に変換
  * `success` のみ children を描画
  * `idle / loading / error` は専用UIに分岐

* **useSuccessXXX**

  * `status === "success"` を保証するための最終関門
  * それ以外は例外を投げる（Boundary設定ミス検知）

* **UI**

  * 成功前提のデータのみを扱う
  * ローディング・エラー分岐は書かない

---

## 2. Boundary配置の原則

* Boundaryは **ページ or セクション単位** で配置する
* Router には置かない（依存関係が見えなくなるため）
* 「どのUIが、どのデータの success に依存しているか」を JSX 構造で表現する

### 推奨例（AdminPage）

```tsx
function AdminPage() {
  return (
    <CategoryBoundary>
      <AddProductForm />
      <AddCategoryForm />

      <ProductBoundary>
        <ProductsList />
      </ProductBoundary>

      <CategoriesList />
    </CategoryBoundary>
  );
}
```

---

## 3. useSuccess の使用ルール

* **Boundary の children 内でのみ使用する**
* AdminPage のトップレベルなど、Boundary外での使用は禁止
* useSuccess は「便利Hook」ではなく **設計上の契約**

---

## 4. Mutation（書き込み系）の方針（現段階）

### 基本方針

* Mutation は **読み取りレーンとは完全に別物**
* Boundary / Provider は Mutation の失敗を扱わない
* try-catch + UI 表示は Service / UI の責務

### 再ロードについて

* 現在は **毎回全体再ロード** を前提とする
* 自動リロード・楽観更新は **まだ導入しない**
* reload 概念の抽象化は、設計が安定してから別途検討

---

## 5. やらないこと（重要）

* Provider に業務操作を持たせない
* Boundary に「半成功」や操作結果を混ぜない
* useSuccess に副作用を持たせない
* 成功前提UIに例外的分岐を足さない

---

## 6. この設計の狙い

* UIから例外状態を完全に排除する
* 成功前提UIを安全かつ簡潔に書く
* 依存関係を JSX 構造として可視化する
* 拡張前に“壊れない基準”を固定する

---

※ 本メモは暫定です。Mutation設計・再ロード戦略に入る際に更新します。
