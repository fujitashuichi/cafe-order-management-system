using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Modules;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        return await _context.Products.ToListAsync();
    }

    [HttpPost]
    public async Task<IResult> AddProducts(Product product)
    {
        try {
            if (product.Id == Guid.Empty)
            {
                product.Id = Guid.NewGuid();
            }
            if (product.CategoryId == 0)
            {
                product.CategoryId = 1;
            }

            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();

            return Results.Ok(product);
        } catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            return Results.Problem("商品登録失敗: " + ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IResult> DeleteProduct(Guid id)
    {
        try
        {
            var product = await _context.Products.FindAsync(id);
            if (product is null)
            {
                return Results.NotFound("削除しようとした商品は存在しません");
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return Results.NoContent();
        } catch (Exception ex)
        {
            return Results.Problem("商品の削除に失敗しました" + ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IResult> UpdateProduct(Guid id, [FromBody] Product dto)
    {
        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
        if (product is null) return Results.NotFound("編集しようとしている商品が見つかりません");

        product.Name = dto.Name;
        product.Price = dto.Price;
        product.CategoryId = dto.CategoryId;

        try
        {
            await _context.SaveChangesAsync();
            return Results.Ok(product);
        } catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
}
