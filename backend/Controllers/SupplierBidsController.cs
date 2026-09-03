using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using KeyaExportImport.Api.Core.Entities;
using KeyaExportImport.Api.Core.Interfaces;

namespace KeyaExportImport.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupplierBidsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public SupplierBidsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<SupplierBid>>> GetBids()
        {
            var bids = await _unitOfWork.SupplierBids.GetAllAsync();
            return Ok(bids);
        }

        [HttpGet("tender/{tenderCode}")]
        public async Task<ActionResult<IReadOnlyList<SupplierBid>>> GetBidsByTender(string tenderCode)
        {
            var bids = await _unitOfWork.SupplierBids.GetBidsByTenderCodeAsync(tenderCode);
            return Ok(bids);
        }

        [HttpPost]
        public async Task<ActionResult<SupplierBid>> PlaceBid(SupplierBid bid)
        {
            await _unitOfWork.SupplierBids.AddAsync(bid);
            await _unitOfWork.CompleteAsync();
            return Ok(bid);
        }
    }
}
