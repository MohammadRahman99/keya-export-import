using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using KeyaExportImport.Api.Core.Interfaces;
using KeyaExportImport.Api.Infrastructure.Data;
using KeyaExportImport.Api.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add Services to DI Container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure EF Core DbContext (SQLite Data Source keya_erp.db)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=keya_erp.db"));

// Register Repositories & Unit of Work for Repository Pattern
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IImportPoRepository, ImportPoRepository>();
builder.Services.AddScoped<IExportOrderRepository, ExportOrderRepository>();
builder.Services.AddScoped<IB2bProductRepository, B2bProductRepository>();
builder.Services.AddScoped<IBuyLeadRepository, BuyLeadRepository>();
builder.Services.AddScoped<ITradeInquiryRepository, TradeInquiryRepository>();
builder.Services.AddScoped<ISupplierBidRepository, SupplierBidRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// Configure CORS Policy for Angular Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:4200", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Auto Create Database & Seed Initial Enterprise Data
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    await DbInitializer.SeedAsync(context);
}

// Configure HTTP Middleware Pipeline
if (app.Environment.IsDevelopment() || true)
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Keya Group Global B2B Trade & ERP API v1");
    });
}

app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();

app.Run();
