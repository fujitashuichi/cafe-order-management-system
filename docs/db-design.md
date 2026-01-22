# 🗄 DB設計

## 1. エンティティ定義

| テーブル名   | 役割          | 主要カラム |
| :---------- | :-----------: | :-------- |
|  Categories | メニューの分類 | Id <br/> Name |
|  Products   | 具体的な商品   | Id <br/> Name <br/> Price <br/> ImageUrl <br/> CategoryId |
|  Orders     | 注文の記録     | Id <br/> OrderDate <br/> TotalAmount <br/> Details |

## 2. データ型
### Category
- Id (int, PK)
- Name (string): カテゴリー名 (例: Coffee, Dessert)

### Product
- Id (Guid, PK)
- Name (string): 商品名
- Price (decimal): 価格
- ImageUrl (string?): 商品画像のパス
- CategoryId (int, FK): Category.Id への参照

### Order
- Id (Guid, PK)
- OrderDate (DateTime)
- TotalAmount (decimal)
- details (string): 注文内容をテキストで保持

## 3. リレーションシップ
- Category (1) <---> (N) Product
  - 1つのカテゴリーには複数の商品が属する。
