using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using KeyaExportImport.Api.Core.Entities;
using KeyaExportImport.Api.Core.Interfaces;
using KeyaExportImport.Api.Infrastructure.Data;

namespace KeyaExportImport.Api.Infrastructure.Repositories
{
    public class BuyLeadRepository : GenericRepository<BuyLead>, IBuyLeadRepository
    {
        public BuyLeadRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IReadOnlyList<BuyLead>> GetActiveBuyLeadsAsync()
        {
            return await _context.BuyLeads
                .Where(b => b.Status == "Active Buy Lead")
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<IReadOnlyList<BuyLead>> GetByCategoryAsync(string category)
        {
            return await _context.BuyLeads
                .Where(b => b.Category == category)
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
