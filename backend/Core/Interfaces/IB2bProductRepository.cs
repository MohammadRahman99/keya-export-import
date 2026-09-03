using System.Collections.Generic;
using System.Threading.Tasks;
using KeyaExportImport.Api.Core.Entities;

namespace KeyaExportImport.Api.Core.Interfaces
{
    public interface IB2bProductRepository : IGenericRepository<B2bProduct>
    {
        Task<IReadOnlyList<B2bProduct>> SearchProductsAsync(string query, string category, string country);
        Task<IReadOnlyList<B2bProduct>> GetByCategoryAsync(string category);
    }
}
