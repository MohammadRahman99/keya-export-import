using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using KeyaExportImport.Api.Core.Entities;
using KeyaExportImport.Api.Core.Interfaces;
using KeyaExportImport.Api.Infrastructure.Data;

namespace KeyaExportImport.Api.Infrastructure.Repositories
{
    public class SupplierBidRepository : GenericRepository<SupplierBid>, ISupplierBidRepository
    {
        public SupplierBidRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IReadOnlyList<SupplierBid>> GetBidsByTenderCodeAsync(string tenderCode)
        {
            return await _context.SupplierBids
                .Where(b => b.TenderCode == tenderCode)
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
