using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace CarApi.DTOs
{
    public class CarCreateDto
    {
        [Required]
        [RegularExpression(@"^[A-HJ-NPR-Z0-9]{17}$", ErrorMessage = "Invalid VIN format")]
        public string VinCode { get; set; }

        public List<IFormFile> PhotoPaths { get; set; }

        public string VehicleId { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int ModelYear { get; set; }
        public string ProductType { get; set; }
        public string Body { get; set; }
        public string Trim { get; set; }
        public string Series { get; set; }
        public string Drive { get; set; }
        public double EngineDisplacement { get; set; }
        public string FuelTypePrimary { get; set; }
        public string EngineModel { get; set; }
        public string Manufacturer { get; set; }
        public string ManufacturerAddress { get; set; }
        public string PlantCompany { get; set; }
        public string PlantCountry { get; set; }
        public string PlantState { get; set; }
        public double FuelConsumptionExtraUrban { get; set; }
        public double FuelConsumptionUrban { get; set; }
        public int NumberOfDoors { get; set; }
        public int MaxWeight { get; set; }
        public string CheckDigit { get; set; }
        public string SequentialNumber { get; set; }
        public decimal Price { get; set; }
        public bool VerifiedVin { get; set; }

        [Phone]
[MaxLength(20)]
public string UserPhoneNumber { get; set; }

    }
}
