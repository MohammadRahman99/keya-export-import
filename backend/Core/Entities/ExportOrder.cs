using System.ComponentModel.DataAnnotations;

namespace KeyaExportImport.Api.Core.Entities
{
    public class ExportOrder : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string OrderId { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string CustomerName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string DestinationCountry { get; set; } = string.Empty;

        [MaxLength(100)]
        public string SalesOrderNo { get; set; } = string.Empty;

        [MaxLength(100)]
        public string ExportInvoiceNo { get; set; } = string.Empty;

        public int ExportQuantity { get; set; }

        [MaxLength(50)]
        public string Unit { get; set; } = string.Empty;

        public decimal ExportValueUSD { get; set; }

        [MaxLength(100)]
        public string Status { get; set; } = "Vessel Dispatched";
    }
}
