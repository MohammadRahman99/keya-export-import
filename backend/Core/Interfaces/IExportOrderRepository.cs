using System.Collections.Generic;
using System.Threading.Tasks;
using KeyaExportImport.Api.Core.Entities;

namespace KeyaExportImport.Api.Core.Interfaces
{
    public interface IExportOrderRepository : IGenericRepository<ExportOrder>
    {
        Task<ExportOrder?> GetByOrderIdAsync(string orderId);
        Task<IReadOnlyList<ExportOrder>> GetByCustomerAsync(string customerName);
    }
}
