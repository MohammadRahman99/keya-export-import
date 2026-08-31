using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using KeyaExportImport.Api.Core.Entities;
using KeyaExportImport.Api.Core.Interfaces;

namespace KeyaExportImport.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExportOrdersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ExportOrdersController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ExportOrder>>> GetExportOrders()
        {
            var exports = await _unitOfWork.ExportOrders.GetAllAsync();
            return Ok(exports);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ExportOrder>> GetExportOrder(int id)
        {
            var export = await _unitOfWork.ExportOrders.GetByIdAsync(id);
            if (export == null) return NotFound();
            return Ok(export);
        }

        [HttpPost]
        public async Task<ActionResult<ExportOrder>> CreateExportOrder(ExportOrder export)
        {
            await _unitOfWork.ExportOrders.AddAsync(export);
            await _unitOfWork.CompleteAsync();
            return CreatedAtAction(nameof(GetExportOrder), new { id = export.Id }, export);
        }
    }
}
