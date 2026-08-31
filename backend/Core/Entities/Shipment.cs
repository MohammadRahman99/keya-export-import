using System;
using System.ComponentModel.DataAnnotations;

namespace KeyaExportImport.Api.Core.Entities
{
    public class Shipment : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string ShipmentCode { get; set; } = string.Empty;

        [MaxLength(100)]
        public string BolNumber { get; set; } = string.Empty;

        [MaxLength(100)]
        public string LcNumber { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Type { get; set; } = "EXPORT"; // EXPORT or IMPORT

        [MaxLength(200)]
        public string Division { get; set; } = string.Empty;

        [MaxLength(200)]
        public string ClientOrSupplier { get; set; } = string.Empty;

        [MaxLength(150)]
        public string OriginPort { get; set; } = string.Empty;

        [MaxLength(150)]
        public string DestinationPort { get; set; } = string.Empty;

        [MaxLength(100)]
        public string ContainerId { get; set; } = string.Empty;

        [MaxLength(50)]
        public string ContainerSize { get; set; } = "40FT HC";

        [MaxLength(500)]
        public string ItemsDescription { get; set; } = string.Empty;

        [MaxLength(100)]
        public string QuantityUnits { get; set; } = string.Empty;

        public decimal ValueUSD { get; set; }

        [MaxLength(100)]
        public string Status { get; set; } = "Loaded at Sea";

        public int ProgressPercentage { get; set; }

        public DateTime DepartureDate { get; set; }

        public DateTime Eta { get; set; }

        [MaxLength(200)]
        public string VesselName { get; set; } = string.Empty;
    }
}
