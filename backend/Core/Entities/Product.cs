using System.ComponentModel.DataAnnotations;

namespace KeyaExportImport.Api.Core.Entities
{
    public class Product : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string ProductId { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Sku { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Unit { get; set; } = string.Empty;

        [MaxLength(100)]
        public string SupplierId { get; set; } = string.Empty;

        [MaxLength(200)]
        public string SupplierName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string CountryOfOrigin { get; set; } = string.Empty;

        [MaxLength(50)]
        public string HsCode { get; set; } = string.Empty;

        public decimal UnitPriceUSD { get; set; }

        public int StockLevel { get; set; }
    }
}
