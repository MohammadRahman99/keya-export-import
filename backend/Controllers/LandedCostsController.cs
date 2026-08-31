using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using KeyaExportImport.Api.Core.Entities;
using KeyaExportImport.Api.Core.Interfaces;

namespace KeyaExportImport.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LandedCostsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public LandedCostsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<LandedCost>>> GetLandedCosts()
        {
            var costs = await _unitOfWork.LandedCosts.GetAllAsync();
            return Ok(costs);
        }
    }
}
