using Microsoft.EntityFrameworkCore;
using KeyaExportImport.Api.Core.Entities;

namespace KeyaExportImport.Api.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products => Set<Product>();
        public DbSet<Supplier> Suppliers => Set<Supplier>();
        public DbSet<Customer> Customers => Set<Customer>();
        public DbSet<ImportPO> ImportPOs => Set<ImportPO>();
        public DbSet<ExportOrder> ExportOrders => Set<ExportOrder>();
        public DbSet<Shipment> Shipments => Set<Shipment>();
        public DbSet<CustomsDoc> CustomsDocs => Set<CustomsDoc>();
        public DbSet<WarehouseItem> WarehouseItems => Set<WarehouseItem>();
        public DbSet<LandedCost> LandedCosts => Set<LandedCost>();
        public DbSet<UserRoleProfile> UserRoles => Set<UserRoleProfile>();

        // TradeWheel B2B Global Trade Marketplace Entities
        public DbSet<B2bProduct> B2bProducts => Set<B2bProduct>();
        public DbSet<BuyLead> BuyLeads => Set<BuyLead>();
        public DbSet<TradeInquiry> TradeInquiries => Set<TradeInquiry>();
        public DbSet<SellerProfile> SellerProfiles => Set<SellerProfile>();
        public DbSet<SupplierBid> SupplierBids => Set<SupplierBid>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>().HasIndex(p => p.Sku).IsUnique();
            modelBuilder.Entity<ImportPO>().HasIndex(p => p.PoNumber).IsUnique();
            modelBuilder.Entity<ExportOrder>().HasIndex(e => e.OrderId).IsUnique();
            modelBuilder.Entity<Shipment>().HasIndex(s => s.ShipmentCode).IsUnique();
            modelBuilder.Entity<B2bProduct>().HasIndex(b => b.ProductCode).IsUnique();
            modelBuilder.Entity<BuyLead>().HasIndex(l => l.LeadCode).IsUnique();
            modelBuilder.Entity<SupplierBid>().HasIndex(sb => sb.BidCode).IsUnique();
        }
    }
}
