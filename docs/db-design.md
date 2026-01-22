# 🗄 DB設計

## 1. エンティティ定義

### Category (カテゴリー)
- Id (int, PK)
- Name (string): カテゴリー名 (例: Coffee, Dessert)

### Product (商品)
- Id (int, PK)
- Name (string): 商品名
- Price (decimal): 価格
- ImageUrl (string?): 商品画像のパス
- CategoryId (int, FK): Category.Id への参照

## 2. リレーションシップ
- Category (1) <---> (N) Product
  - 1つのカテゴリーには複数の商品が属する。
