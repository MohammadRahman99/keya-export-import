using System.ComponentModel.DataAnnotations;

namespace KeyaExportImport.Api.Core.Entities
{
    public class B2bProduct : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string ProductCode { get; set; } = string.Empty;

        [Required]
        [MaxLength(250)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Moq { get; set; } = "1,000 Pcs";

        [Required]
        [MaxLength(100)]
        public string FobPriceRange { get; set; } = "$2.50 - $4.00 / Pc";

        public decimal FobPriceMinUSD { get; set; }
        public decimal FobPriceMaxUSD { get; set; }

        [MaxLength(100)]
        public string SupplyCapacity { get; set; } = "100,000 Pcs / Month";

        [Required]
        [MaxLength(200)]
        public string SellerName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string SellerVerificationTier { get; set; } = "Gold Supplier";

        [MaxLength(100)]
        public string Country { get; set; } = "Bangladesh";

        [MaxLength(500)]
        public string ImageUrl { get; set; } = string.Empty;

        [MaxLength(50)]
        public string HsCode { get; set; } = string.Empty;

        [MaxLength(200)]
        public string PortOfLoading { get; set; } = "Chattogram Port (CGP)";
    }
}
