using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CarApi.Data;
using CarApi.Models;
using System;

namespace CarApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly CarContext _context;

        public AuthController(CarContext context)
        {
            _context = context;
        }

        [HttpPost("sync")]
        public async Task<IActionResult> SyncUser([FromBody] User user)
        {
            if (user == null || string.IsNullOrEmpty(user.Id))
                return BadRequest("Invalid user data");

            var existingUser = await _context.Users.FindAsync(user.Id);
            if (existingUser == null)
            {
                user.CreatedAt = DateTime.UtcNow;
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }

           return Ok(new { message = "Все заїбато" });

        }
    }
}
