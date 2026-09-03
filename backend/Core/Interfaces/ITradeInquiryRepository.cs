using System.Collections.Generic;
using System.Threading.Tasks;
using KeyaExportImport.Api.Core.Entities;

namespace KeyaExportImport.Api.Core.Interfaces
{
    public interface ITradeInquiryRepository : IGenericRepository<TradeInquiry>
    {
        Task<IReadOnlyList<TradeInquiry>> GetInquiriesByTargetCodeAsync(string targetCode);
    }
}
