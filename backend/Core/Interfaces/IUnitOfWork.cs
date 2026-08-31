using System;
using System.Threading.Tasks;
using KeyaExportImport.Api.Core.Entities;

namespace KeyaExportImport.Api.Core.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IProductRepository Products { get; }
        IImportPoRepository ImportPOs { get; }
        IExportOrderRepository ExportOrders { get; }
        IGenericRepository<Supplier> Suppliers { get; }
        IGenericRepository<Customer> Customers { get; }
        IGenericRepository<Shipment> Shipments { get; }
        IGenericRepository<CustomsDoc> CustomsDocs { get; }
        IGenericRepository<WarehouseItem> WarehouseItems { get; }
        IGenericRepository<LandedCost> LandedCosts { get; }
        IGenericRepository<UserRoleProfile> UserRoles { get; }

        Task<int> CompleteAsync();
    }
}
