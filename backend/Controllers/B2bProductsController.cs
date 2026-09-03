using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using KeyaExportImport.Api.Core.Entities;
using KeyaExportImport.Api.Core.Interfaces;

namespace KeyaExportImport.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class B2bProductsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public B2bProductsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<B2bProduct>>> GetProducts([FromQuery] string? search, [FromQuery] string? category, [FromQuery] string? country)
        {
            var products = await _unitOfWork.B2bProducts.SearchProductsAsync(search ?? "", category ?? "", country ?? "");
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<B2bProduct>> GetProduct(int id)
        {
            var product = await _unitOfWork.B2bProducts.GetByIdAsync(id);
            if (product == null) return NotFound();
            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<B2bProduct>> CreateProduct(B2bProduct product)
        {
            await _unitOfWork.B2bProducts.AddAsync(product);
            await _unitOfWork.CompleteAsync();
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }
    }
}
