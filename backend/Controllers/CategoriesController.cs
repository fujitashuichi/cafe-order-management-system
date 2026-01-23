using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Modules;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly AppDbContext _context;

    public CategoriesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
    {
        return await _context.Categories.ToListAsync();
    }

    [HttpPost]
    public async Task<IResult> AddCategory([FromBody] Category category)
    {
        try {
            if (string.IsNullOrEmpty(category.Name))
            {
                return Results.BadRequest("登録しようとしたカテゴリー名が見つかりません");
            }

            var exists = await _context.Categories.AnyAsync(c => c.Name == category.Name);
            if (exists)
            {
                return Results.Conflict("登録しようとしたカテゴリー名が既に存在します");
            }

            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();

            return Results.Ok(category);
        } catch (Exception ex)
        {
            return Results.InternalServerError("カテゴリー名の登録に失敗: " + ex.Message);
        }
    }
}
