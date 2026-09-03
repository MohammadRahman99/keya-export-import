using System.Collections.Generic;
using System.Threading.Tasks;
using KeyaExportImport.Api.Core.Entities;

namespace KeyaExportImport.Api.Core.Interfaces
{
    public interface ISupplierBidRepository : IGenericRepository<SupplierBid>
    {
        Task<IReadOnlyList<SupplierBid>> GetBidsByTenderCodeAsync(string tenderCode);
    }
}
