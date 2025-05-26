using CarApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.FileProviders;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

// Додаємо сервіси контролерів
builder.Services.AddControllers();

// Swagger для документації API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Car API", Version = "v1" });
});

// Налаштовуємо CORS для фронтенду
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // порт фронтенду (vite/react)
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Підключення до БД (SQL Server)
builder.Services.AddDbContext<CarContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
           .EnableSensitiveDataLogging()
           .LogTo(Console.WriteLine));

var app = builder.Build();

// У розробці вмикаємо Swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Роздаємо статичні файли із папки wwwroot/uploads за шляхом /uploads
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads")),
    RequestPath = "/uploads"
});

app.UseStaticFiles();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
