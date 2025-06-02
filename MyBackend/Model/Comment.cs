using System;
using System.ComponentModel.DataAnnotations;

namespace CarApi.Models
{
    public class Comment
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    [Required]
    public string Text { get; set; }

    [Required]
    public int CarId { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; }
    public Car Car { get; set; }
}

}
