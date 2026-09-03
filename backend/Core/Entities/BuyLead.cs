using System;
using System.ComponentModel.DataAnnotations;

namespace KeyaExportImport.Api.Core.Entities
{
    public class BuyLead : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string LeadCode { get; set; } = string.Empty;

        [Required]
        [MaxLength(250)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string QuantityNeeded { get; set; } = string.Empty;

        public decimal TargetUnitPriceUSD { get; set; }

        [Required]
        [MaxLength(100)]
        public string DestinationCountry { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string BuyerName { get; set; } = string.Empty;

        [MaxLength(200)]
        public string CompanyName { get; set; } = string.Empty;

        [MaxLength(150)]
        public string BuyerEmail { get; set; } = string.Empty;

        [MaxLength(50)]
        public string BuyerPhone { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Type { get; set; } = "BUYER_RFQ"; // "BUYER_RFQ" or "KEYA_TENDER"

        [MaxLength(100)]
        public string Status { get; set; } = "New RFQ";

        public DateTime ExpiryDate { get; set; } = DateTime.UtcNow.AddDays(30);

        [MaxLength(1000)]
        public string Specifications { get; set; } = string.Empty;
    }
}
