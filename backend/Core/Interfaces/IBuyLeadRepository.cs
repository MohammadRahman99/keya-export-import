using System.Collections.Generic;
using System.Threading.Tasks;
using KeyaExportImport.Api.Core.Entities;

namespace KeyaExportImport.Api.Core.Interfaces
{
    public interface IBuyLeadRepository : IGenericRepository<BuyLead>
    {
        Task<IReadOnlyList<BuyLead>> GetActiveBuyLeadsAsync();
        Task<IReadOnlyList<BuyLead>> GetByCategoryAsync(string category);
    }
}
