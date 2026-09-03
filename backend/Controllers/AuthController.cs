using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using KeyaExportImport.Api.Core.Entities;
using KeyaExportImport.Api.Core.Interfaces;

namespace KeyaExportImport.Api.Controllers
{
    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public AuthController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserRoleProfile>> Login([FromBody] LoginRequest request)
        {
            var users = await _unitOfWork.UserRoles.GetAllAsync();
            var user = users.FirstOrDefault(u => u.Email.ToLower() == request.Email.ToLower() && u.Password == request.Password);

            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            return Ok(user);
        }

        [HttpGet("users")]
        public async Task<ActionResult<IReadOnlyList<UserRoleProfile>>> GetAllUsers()
        {
            var users = await _unitOfWork.UserRoles.GetAllAsync();
            return Ok(users);
        }
    }
}
