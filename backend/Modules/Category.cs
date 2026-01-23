using System.ComponentModel.DataAnnotations;

namespace backend.Modules;

public class Category
{
    [Key]
    public int Id { get; set; }
    public required string Name { get; set; }

    public List<Product> Products { get; set; } = new ();
}