using System.ComponentModel.DataAnnotations;

namespace KeyaExportImport.Api.Core.Entities
{
    public class UserRoleProfile : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string UserCode { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Role { get; set; } = "Admin";

        [MaxLength(500)]
        public string Avatar { get; set; } = string.Empty;

        [MaxLength(150)]
        public string Department { get; set; } = string.Empty;

        public string PermissionsJson { get; set; } = "[]";
    }
}
