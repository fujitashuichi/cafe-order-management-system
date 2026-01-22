using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    });
});
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite("Data Source=cafe.db");
});

var app = builder.Build();
app.UseCors();

app.MapGet("/", () => {});

app.Run();
