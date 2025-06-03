using System;
using System.ComponentModel.DataAnnotations;

namespace CarApi.Models
{
 public class UpdatePhoneDto
{
    public int UserId { get; set; }
    public string PhoneNumber { get; set; }
}
}
