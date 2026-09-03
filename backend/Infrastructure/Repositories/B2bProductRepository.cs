using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using KeyaExportImport.Api.Core.Entities;
using KeyaExportImport.Api.Core.Interfaces;
using KeyaExportImport.Api.Infrastructure.Data;

namespace KeyaExportImport.Api.Infrastructure.Repositories
{
    public class B2bProductRepository : GenericRepository<B2bProduct>, IB2bProductRepository
    {
        public B2bProductRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IReadOnlyList<B2bProduct>> SearchProductsAsync(string query, string category, string country)
        {
            var q = _context.B2bProducts.AsQueryable();

            if (!string.IsNullOrWhiteSpace(category) && category != "ALL")
            {
                q = q.Where(p => p.Category.ToLower() == category.ToLower());
            }

            if (!string.IsNullOrWhiteSpace(country) && country != "ALL")
            {
                q = q.Where(p => p.Country.ToLower() == country.ToLower());
            }

            if (!string.IsNullOrWhiteSpace(query))
            {
                var term = query.ToLower();
                q = q.Where(p => p.Title.ToLower().Contains(term) ||
                                 p.HsCode.ToLower().Contains(term) ||
                                 p.SellerName.ToLower().Contains(term));
            }

            return await q.AsNoTracking().ToListAsync();
        }

        public async Task<IReadOnlyList<B2bProduct>> GetByCategoryAsync(string category)
        {
            return await _context.B2bProducts
                .Where(p => p.Category == category)
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
