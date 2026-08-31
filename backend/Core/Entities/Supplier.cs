using System.ComponentModel.DataAnnotations;

namespace KeyaExportImport.Api.Core.Entities
{
    public class Supplier : BaseEntity
    {
        [Required]
        [MaxLength(50)]
        public string SupplierCode { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Country { get; set; } = string.Empty;

        [MaxLength(150)]
        public string ContactPerson { get; set; } = string.Empty;

        [MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Phone { get; set; } = string.Empty;

        public decimal Rating { get; set; }

        public decimal TotalTransactionsUSD { get; set; }

        public string SuppliedProductsJson { get; set; } = "[]";

        [MaxLength(50)]
        public string Status { get; set; } = "Active";
    }
}
