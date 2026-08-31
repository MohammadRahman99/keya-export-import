using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using KeyaExportImport.Api.Core.Entities;
using KeyaExportImport.Api.Core.Interfaces;

namespace KeyaExportImport.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImportPOsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ImportPOsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ImportPO>>> GetImportPOs()
        {
            var pos = await _unitOfWork.ImportPOs.GetAllAsync();
            return Ok(pos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ImportPO>> GetImportPO(int id)
        {
            var po = await _unitOfWork.ImportPOs.GetByIdAsync(id);
            if (po == null) return NotFound();
            return Ok(po);
        }

        [HttpPost]
        public async Task<ActionResult<ImportPO>> CreateImportPO(ImportPO po)
        {
            await _unitOfWork.ImportPOs.AddAsync(po);
            await _unitOfWork.CompleteAsync();
            return CreatedAtAction(nameof(GetImportPO), new { id = po.Id }, po);
        }
    }
}
