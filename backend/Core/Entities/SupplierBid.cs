using System.ComponentModel.DataAnnotations;

namespace KeyaExportImport.Api.Core.Entities
{
    public class SupplierBid : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string BidCode { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string TenderCode { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string SupplierCompanyName { get; set; } = string.Empty;

        public decimal OfferedUnitPriceUSD { get; set; }

        public decimal TotalBidValueUSD { get; set; }

        public int DeliveryLeadTimeDays { get; set; } = 15;

        [MaxLength(1000)]
        public string ProposalDetails { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string ContactEmail { get; set; } = string.Empty;

        [MaxLength(50)]
        public string ContactPhone { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Status { get; set; } = "Submitted"; // Submitted, Under Review, Accepted, Rejected
    }
}
