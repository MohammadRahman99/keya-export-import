using System.Collections.Generic;
using System.Threading.Tasks;
using KeyaExportImport.Api.Core.Entities;

namespace KeyaExportImport.Api.Core.Interfaces
{
    public interface IImportPoRepository : IGenericRepository<ImportPO>
    {
        Task<ImportPO?> GetByPoNumberAsync(string poNumber);
        Task<IReadOnlyList<ImportPO>> GetByStatusAsync(string status);
    }
}
