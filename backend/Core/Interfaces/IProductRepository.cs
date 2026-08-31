using System.Collections.Generic;
using System.Threading.Tasks;
using KeyaExportImport.Api.Core.Entities;

namespace KeyaExportImport.Api.Core.Interfaces
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        Task<Product?> GetBySkuAsync(string sku);
        Task<IReadOnlyList<Product>> GetByCategoryAsync(string category);
    }
}
