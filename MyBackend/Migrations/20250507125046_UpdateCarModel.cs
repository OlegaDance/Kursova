using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyBackend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCarModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FuelConsumptionCity",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "IsSold",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "VerifiedVin",
                table: "Cars");

            migrationBuilder.RenameColumn(
                name: "Year",
                table: "Cars",
                newName: "VehicleId");

            migrationBuilder.RenameColumn(
                name: "TypeOfTransport",
                table: "Cars",
                newName: "Trim");

            migrationBuilder.RenameColumn(
                name: "Runs",
                table: "Cars",
                newName: "ModelYear");

            migrationBuilder.RenameColumn(
                name: "Region",
                table: "Cars",
                newName: "Series");

            migrationBuilder.RenameColumn(
                name: "PhoneOwner",
                table: "Cars",
                newName: "SequentialNumber");

            migrationBuilder.RenameColumn(
                name: "NumberOfOwners",
                table: "Cars",
                newName: "MaxWeight");

            migrationBuilder.RenameColumn(
                name: "Gearbox",
                table: "Cars",
                newName: "ProductType");

            migrationBuilder.RenameColumn(
                name: "FuelType",
                table: "Cars",
                newName: "PlantState");

            migrationBuilder.RenameColumn(
                name: "FuelConsumptionHighway",
                table: "Cars",
                newName: "FuelConsumptionUrban");

            migrationBuilder.RenameColumn(
                name: "FuelConsumptionCombined",
                table: "Cars",
                newName: "FuelConsumptionExtraUrban");

            migrationBuilder.RenameColumn(
                name: "EnginePower",
                table: "Cars",
                newName: "EngineDisplacement");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Cars",
                newName: "PlantCountry");

            migrationBuilder.RenameColumn(
                name: "Color",
                table: "Cars",
                newName: "PlantCompany");

            migrationBuilder.RenameColumn(
                name: "City",
                table: "Cars",
                newName: "ManufacturerAddress");

            migrationBuilder.RenameColumn(
                name: "Brand",
                table: "Cars",
                newName: "Manufacturer");

            migrationBuilder.RenameColumn(
                name: "BodyType",
                table: "Cars",
                newName: "Make");

            migrationBuilder.AddColumn<string>(
                name: "Body",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CheckDigit",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Drive",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EngineModel",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FuelTypePrimary",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Body",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "CheckDigit",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Drive",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "EngineModel",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "FuelTypePrimary",
                table: "Cars");

            migrationBuilder.RenameColumn(
                name: "VehicleId",
                table: "Cars",
                newName: "Year");

            migrationBuilder.RenameColumn(
                name: "Trim",
                table: "Cars",
                newName: "TypeOfTransport");

            migrationBuilder.RenameColumn(
                name: "Series",
                table: "Cars",
                newName: "Region");

            migrationBuilder.RenameColumn(
                name: "SequentialNumber",
                table: "Cars",
                newName: "PhoneOwner");

            migrationBuilder.RenameColumn(
                name: "ProductType",
                table: "Cars",
                newName: "Gearbox");

            migrationBuilder.RenameColumn(
                name: "PlantState",
                table: "Cars",
                newName: "FuelType");

            migrationBuilder.RenameColumn(
                name: "PlantCountry",
                table: "Cars",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "PlantCompany",
                table: "Cars",
                newName: "Color");

            migrationBuilder.RenameColumn(
                name: "ModelYear",
                table: "Cars",
                newName: "Runs");

            migrationBuilder.RenameColumn(
                name: "MaxWeight",
                table: "Cars",
                newName: "NumberOfOwners");

            migrationBuilder.RenameColumn(
                name: "ManufacturerAddress",
                table: "Cars",
                newName: "City");

            migrationBuilder.RenameColumn(
                name: "Manufacturer",
                table: "Cars",
                newName: "Brand");

            migrationBuilder.RenameColumn(
                name: "Make",
                table: "Cars",
                newName: "BodyType");

            migrationBuilder.RenameColumn(
                name: "FuelConsumptionUrban",
                table: "Cars",
                newName: "FuelConsumptionHighway");

            migrationBuilder.RenameColumn(
                name: "FuelConsumptionExtraUrban",
                table: "Cars",
                newName: "FuelConsumptionCombined");

            migrationBuilder.RenameColumn(
                name: "EngineDisplacement",
                table: "Cars",
                newName: "EnginePower");

            migrationBuilder.AddColumn<double>(
                name: "FuelConsumptionCity",
                table: "Cars",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<bool>(
                name: "IsSold",
                table: "Cars",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "VerifiedVin",
                table: "Cars",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
