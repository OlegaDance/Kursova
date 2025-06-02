using System;
using System.ComponentModel.DataAnnotations;

namespace CarApi.Models
{
    public class User
    {
         [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Email { get; set; }
        public string Auth0Sub { get; set; }

        public string PictureUrl { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
