using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using KeyaExportImport.Api.Core.Entities;
using KeyaExportImport.Api.Core.Interfaces;

namespace KeyaExportImport.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TradeInquiriesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public TradeInquiriesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<TradeInquiry>>> GetInquiries()
        {
            var inquiries = await _unitOfWork.TradeInquiries.GetAllAsync();
            return Ok(inquiries);
        }

        [HttpPost]
        public async Task<ActionResult<TradeInquiry>> SendInquiry(TradeInquiry inquiry)
        {
            await _unitOfWork.TradeInquiries.AddAsync(inquiry);
            await _unitOfWork.CompleteAsync();
            return Ok(inquiry);
        }
    }
}
