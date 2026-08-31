using System;
using System.ComponentModel.DataAnnotations;

namespace KeyaExportImport.Api.Core.Entities
{
    public class ImportPO : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string PoNumber { get; set; } = string.Empty;

        [MaxLength(100)]
        public string PiNumber { get; set; } = string.Empty;

        [MaxLength(100)]
        public string LcNumber { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string SupplierName { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string ProductName { get; set; } = string.Empty;

        public int Quantity { get; set; }

        [MaxLength(50)]
        public string Unit { get; set; } = string.Empty;

        public decimal UnitPriceUSD { get; set; }

        public decimal TotalValueUSD { get; set; }

        [MaxLength(20)]
        public string Currency { get; set; } = "USD";

        public DateTime ExpectedArrival { get; set; }

        [MaxLength(100)]
        public string Status { get; set; } = "In Transit";
    }
}
