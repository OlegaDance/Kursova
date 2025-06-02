using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace CarApi.Models
{
    public class Car
    {
        public int Id { get; set; }

        [Required]
        [RegularExpression(@"^[A-HJ-NPR-Z0-9]{17}$", ErrorMessage = "Invalid VIN format")]
        public string VinCode { get; set; }

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

        // Зберігаємо шляхи фото у JSON рядку у базі
        public string PhotoPathsJson { get; set; }

        public List<Comment> Comments { get; set; } = new List<Comment>();

        [NotMapped]
        public List<string> PhotoPaths
        {
            get => string.IsNullOrEmpty(PhotoPathsJson) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(PhotoPathsJson);
            set => PhotoPathsJson = JsonSerializer.Serialize(value);
        }
    }
}
