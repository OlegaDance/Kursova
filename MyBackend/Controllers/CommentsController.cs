using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using CarApi.Data;
using CarApi.Models;
using CarApi.DTOs;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace CarApi.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly CarContext _context;
        private readonly ILogger<CommentsController> _logger;

        public CommentsController(CarContext context, ILogger<CommentsController> logger)
        {
            _context = context;
            _logger = logger;
        }

[HttpGet("car/{carId}")]
public async Task<IActionResult> GetCommentsForCar(int carId)
{
    var comments = await _context.Comments
        .Where(c => c.CarId == carId)
        .OrderByDescending(c => c.CreatedAt)
        .Include(c => c.User) 
        .Select(c => new CommentDto
        {
            Id = c.Id,
            UserId = c.UserId,
            UserName = c.User != null ? c.User.Name : "Невідомо",
            Text = c.Text,
            CreatedAt = c.CreatedAt
        })
        .ToListAsync();

    return Ok(comments);
}


        [HttpPost("car/{carId}")]
        public async Task<IActionResult> PostCommentForCar(int carId, [FromBody] CommentDto commentDto)
        {
            try
            {
                var comment = new Comment
                {
                    CarId = carId,
                    UserId = commentDto.UserId,
                    Text = commentDto.Text,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Comments.Add(comment);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetCommentsForCar), new { carId = comment.CarId }, comment);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Помилка при додаванні коментаря для CarId {CarId} з UserId {UserId}", carId, commentDto.UserId);
                return StatusCode(500, "Внутрішня помилка сервера. Деталі в логах.");
            }
        }
    }
}
