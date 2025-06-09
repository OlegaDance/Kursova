using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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
        public async Task<IActionResult> SyncUser([FromBody] SyncUserDto dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Id))
                return BadRequest("Invalid user data");

            try
            {
                var existingUser = await _context.Users
                    .FirstOrDefaultAsync(u => u.Auth0Sub == dto.Id);

                if (existingUser == null)
                {
                    var newUser = new User
                    {
                        Auth0Sub = dto.Id,
                        Name = dto.Name,
                        Email = dto.Email,
                        PictureUrl = dto.PictureUrl,
                        CreatedAt = DateTime.UtcNow
                    };

                    _context.Users.Add(newUser);
                    await _context.SaveChangesAsync();

                    return Ok(new { userId = newUser.Id, message = "User created and synced" });
                }

                existingUser.Name = dto.Name;
                existingUser.Email = dto.Email;
                existingUser.PictureUrl = dto.PictureUrl;

                await _context.SaveChangesAsync();

                return Ok(new { userId = existingUser.Id, message = "User synced" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }

    public class SyncUserDto
    {
        public string Id { get; set; }        
        public string Name { get; set; }
        public string Email { get; set; }
        public string PictureUrl { get; set; }
    }
}
