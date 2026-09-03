using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using KeyaExportImport.Api.Core.Entities;
using KeyaExportImport.Api.Core.Interfaces;
using KeyaExportImport.Api.Infrastructure.Data;

namespace KeyaExportImport.Api.Infrastructure.Repositories
{
    public class TradeInquiryRepository : GenericRepository<TradeInquiry>, ITradeInquiryRepository
    {
        public TradeInquiryRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IReadOnlyList<TradeInquiry>> GetInquiriesByTargetCodeAsync(string targetCode)
        {
            return await _context.TradeInquiries
                .Where(t => t.TargetProductOrLeadCode == targetCode)
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
