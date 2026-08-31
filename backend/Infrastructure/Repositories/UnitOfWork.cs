using System;
using System.Threading.Tasks;
using KeyaExportImport.Api.Core.Entities;
using KeyaExportImport.Api.Core.Interfaces;
using KeyaExportImport.Api.Infrastructure.Data;

namespace KeyaExportImport.Api.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

        public IProductRepository Products { get; }
        public IImportPoRepository ImportPOs { get; }
        public IExportOrderRepository ExportOrders { get; }
        public IGenericRepository<Supplier> Suppliers { get; }
        public IGenericRepository<Customer> Customers { get; }
        public IGenericRepository<Shipment> Shipments { get; }
        public IGenericRepository<CustomsDoc> CustomsDocs { get; }
        public IGenericRepository<WarehouseItem> WarehouseItems { get; }
        public IGenericRepository<LandedCost> LandedCosts { get; }
        public IGenericRepository<UserRoleProfile> UserRoles { get; }

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
            Products = new ProductRepository(_context);
            ImportPOs = new ImportPoRepository(_context);
            ExportOrders = new ExportOrderRepository(_context);
            Suppliers = new GenericRepository<Supplier>(_context);
            Customers = new GenericRepository<Customer>(_context);
            Shipments = new GenericRepository<Shipment>(_context);
            CustomsDocs = new GenericRepository<CustomsDoc>(_context);
            WarehouseItems = new GenericRepository<WarehouseItem>(_context);
            LandedCosts = new GenericRepository<LandedCost>(_context);
            UserRoles = new GenericRepository<UserRoleProfile>(_context);
        }

        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
