using System;
using System.ComponentModel.DataAnnotations;

namespace KeyaExportImport.Api.Core.Entities
{
    public class CustomsDoc : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string DocId { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Type { get; set; } = string.Empty;

        [MaxLength(100)]
        public string RefNumber { get; set; } = string.Empty;

        public decimal DutyTaxUSD { get; set; }

        [MaxLength(100)]
        public string ClearanceStatus { get; set; } = "Passed";

        public DateTime IssueDate { get; set; }
    }
}
