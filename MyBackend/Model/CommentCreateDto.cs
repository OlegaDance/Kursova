// DTOs/CommentDto.cs
namespace CarApi.DTOs
{
    public class CommentDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; } = "Невідомо";
        public string Text { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
