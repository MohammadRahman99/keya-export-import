using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using KeyaExportImport.Api.Core.Entities;
using KeyaExportImport.Api.Core.Interfaces;

namespace KeyaExportImport.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomsDocsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public CustomsDocsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<CustomsDoc>>> GetCustomsDocs()
        {
            var docs = await _unitOfWork.CustomsDocs.GetAllAsync();
            return Ok(docs);
        }

        [HttpPost]
        public async Task<ActionResult<CustomsDoc>> CreateCustomsDoc(CustomsDoc doc)
        {
            await _unitOfWork.CustomsDocs.AddAsync(doc);
            await _unitOfWork.CompleteAsync();
            return Ok(doc);
        }
    }
}
