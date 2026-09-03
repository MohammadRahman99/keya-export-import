using System;
using System.ComponentModel.DataAnnotations;

namespace KeyaExportImport.Api.Core.Entities
{
    public class TradeInquiry : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string InquiryCode { get; set; } = string.Empty;

        [Required]
        [MaxLength(250)]
        public string Subject { get; set; } = string.Empty;

        [Required]
        public string Message { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string SenderName { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string SenderEmail { get; set; } = string.Empty;

        [MaxLength(50)]
        public string SenderPhone { get; set; } = string.Empty;

        [MaxLength(100)]
        public string TargetProductOrLeadCode { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Status { get; set; } = "Pending Review";

        public DateTime DateSent { get; set; } = DateTime.UtcNow;
    }
}
