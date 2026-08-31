using System.ComponentModel.DataAnnotations;

namespace KeyaExportImport.Api.Core.Entities
{
    public class WarehouseItem : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string ItemCode { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string ProductName { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Sku { get; set; } = string.Empty;

        public int ImportedQty { get; set; }

        public int ReceivedQty { get; set; }

        public int DamagedQty { get; set; }

        public int CurrentStock { get; set; }

        [MaxLength(50)]
        public string Unit { get; set; } = "Pcs";

        [MaxLength(200)]
        public string WarehouseLocation { get; set; } = "Gazipur Central Hub";
    }
}
