using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddComment2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Auth0Sub",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Auth0Sub",
                table: "Users");
        }
    }
}
