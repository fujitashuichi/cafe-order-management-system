namespace backend.Modules;

public class Category
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    public required string Details { get; set; }

    public List<Product> Product { get; set; } = new ();
}