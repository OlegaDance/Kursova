using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddPhotoPathsJson : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PhotoPaths",
                table: "Cars",
                newName: "VehicleId");

            migrationBuilder.AlterColumn<double>(
                name: "EngineDisplacement",
                table: "Cars",
                type: "float",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "PhotoPathsJson",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoPathsJson",
                table: "Cars");

            migrationBuilder.RenameColumn(
                name: "VehicleId",
                table: "Cars",
                newName: "PhotoPaths");

            migrationBuilder.AlterColumn<int>(
                name: "EngineDisplacement",
                table: "Cars",
                type: "int",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");
        }
    }
}
