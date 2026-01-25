using System.ComponentModel.DataAnnotations;

namespace backend.Modules;

public class Category
{
    [Key]
    public int Id { get; set; }
    public required string Name { get; set; }
    public bool hasProducts => Products.Count != 0;

    ///////////// hasProductsを扱うときは、必ずCategories.Include(c => c.Products)とする /////////////
    // Productsが取得されないことで hasProducts が常にfalseになることを防ぐ
    public List<Product> Products { get; set; } = new ();
}