namespace backend.Modules;

using System.Text.Json.Serialization;

public class Product
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }

    public int? CategoryId { get; set; }
    [JsonIgnore]
    public Category? Category { get; set; }
}