using System;
using System.ComponentModel.DataAnnotations;

public class User
{
    [Key]
    public string Id { get; set; } // Це буде `sub` з Auth0 — унікальний ідентифікатор користувача

    [Required]
    public string Name { get; set; }

    public string Email { get; set; }

    public string PictureUrl { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
