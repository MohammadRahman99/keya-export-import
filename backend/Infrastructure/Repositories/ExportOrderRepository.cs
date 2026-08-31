using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using KeyaExportImport.Api.Core.Entities;
using KeyaExportImport.Api.Core.Interfaces;
using KeyaExportImport.Api.Infrastructure.Data;

namespace KeyaExportImport.Api.Infrastructure.Repositories
{
    public class ExportOrderRepository : GenericRepository<ExportOrder>, IExportOrderRepository
    {
        public ExportOrderRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<ExportOrder?> GetByOrderIdAsync(string orderId)
        {
            return await _context.ExportOrders.FirstOrDefaultAsync(e => e.OrderId == orderId);
        }

        public async Task<IReadOnlyList<ExportOrder>> GetByCustomerAsync(string customerName)
        {
            return await _context.ExportOrders.Where(e => e.CustomerName == customerName).ToListAsync();
        }
    }
}
