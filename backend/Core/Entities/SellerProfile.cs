using System.ComponentModel.DataAnnotations;

namespace KeyaExportImport.Api.Core.Entities
{
    public class SellerProfile : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string SellerCode { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string CompanyName { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string VerificationTier { get; set; } = "Gold Supplier";

        [Required]
        [MaxLength(100)]
        public string Country { get; set; } = "Bangladesh";

        public int MemberSinceYears { get; set; } = 5;

        public decimal Rating { get; set; } = 4.9m;

        public decimal ResponseRatePercentage { get; set; } = 98.5m;

        [MaxLength(500)]
        public string MainExportProductsJson { get; set; } = "[]";
    }
}
