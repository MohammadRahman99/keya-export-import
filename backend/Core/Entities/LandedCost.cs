using System.ComponentModel.DataAnnotations;

namespace KeyaExportImport.Api.Core.Entities
{
    public class LandedCost : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string ImportId { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string ProductName { get; set; } = string.Empty;

        public decimal BaseCostUSD { get; set; }

        public decimal FreightUSD { get; set; }

        public decimal InsuranceUSD { get; set; }

        public decimal CustomsDutyUSD { get; set; }

        public decimal PortChargesUSD { get; set; }

        public decimal CnfChargesUSD { get; set; }

        public decimal OtherExpensesUSD { get; set; }

        public decimal TotalLandedCostUSD { get; set; }

        public decimal LandedUnitCostUSD { get; set; }

        public int Quantity { get; set; }

        public decimal ProjectedProfitMargin { get; set; }
    }
}
