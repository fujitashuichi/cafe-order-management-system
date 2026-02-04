using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin();
            //.WithOrigins(
            //    "https://cafe-order-management-system-topaz.vercel.app",
            //    "https://cafe-order-management-system-7olf42chn-fujita-shuichis-projects.vercel.app"
            //);
    });
});
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite("Data Source=cafe.db");
});
builder.Services.AddControllers();

// JSON送信時の循環参照を無視
builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options =>
{
    options.SerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});

var app = builder.Build();

var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
app.Urls.Add($"http://*:{port}");

app.UseCors();

app.MapControllers();

app.Run();
