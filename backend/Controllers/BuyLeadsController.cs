using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using KeyaExportImport.Api.Core.Entities;
using KeyaExportImport.Api.Core.Interfaces;

namespace KeyaExportImport.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BuyLeadsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public BuyLeadsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<BuyLead>>> GetBuyLeads()
        {
            var leads = await _unitOfWork.BuyLeads.GetActiveBuyLeadsAsync();
            return Ok(leads);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BuyLead>> GetBuyLead(int id)
        {
            var lead = await _unitOfWork.BuyLeads.GetByIdAsync(id);
            if (lead == null) return NotFound();
            return Ok(lead);
        }

        [HttpPost]
        public async Task<ActionResult<BuyLead>> PostBuyLead(BuyLead lead)
        {
            await _unitOfWork.BuyLeads.AddAsync(lead);
            await _unitOfWork.CompleteAsync();
            return CreatedAtAction(nameof(GetBuyLead), new { id = lead.Id }, lead);
        }
    }
}
