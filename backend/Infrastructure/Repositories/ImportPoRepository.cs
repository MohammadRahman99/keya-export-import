using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using KeyaExportImport.Api.Core.Entities;
using KeyaExportImport.Api.Core.Interfaces;
using KeyaExportImport.Api.Infrastructure.Data;

namespace KeyaExportImport.Api.Infrastructure.Repositories
{
    public class ImportPoRepository : GenericRepository<ImportPO>, IImportPoRepository
    {
        public ImportPoRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<ImportPO?> GetByPoNumberAsync(string poNumber)
        {
            return await _context.ImportPOs.FirstOrDefaultAsync(p => p.PoNumber == poNumber);
        }

        public async Task<IReadOnlyList<ImportPO>> GetByStatusAsync(string status)
        {
            return await _context.ImportPOs.Where(p => p.Status == status).ToListAsync();
        }
    }
}
