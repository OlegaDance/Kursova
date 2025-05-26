using System.ComponentModel.DataAnnotations;

namespace CarApi.Models
{
    public class Car
    {
        public int Id { get; set; }

        // Додавання регулярного виразу для валідації VIN
        [RegularExpression(@"^[A-HJ-NPR-Z0-9]{17}$", ErrorMessage = "Invalid VIN format")]
        [Required] // зробити обов'язковим
        public string VinCode { get; set; } // VIN

        [Required]
        public string Make { get; set; } // Make

        [Required]
        public string Model { get; set; } // Model

        [Required]
        public int ModelYear { get; set; } // Model Year

        [Required]
        public string ProductType { get; set; } // Product Type

        [Required]
        public string Body { get; set; } // Body Type

        [Required]
        public string Trim { get; set; } // Trim

        [Required]
        public string Series { get; set; } // Series

        [Required]
        public string Drive { get; set; } // Drive

        public int EngineDisplacement { get; set; } // Engine Displacement (ccm)

        [Required]
        public string FuelTypePrimary { get; set; } // Fuel Type - Primary

        [Required]
        public string EngineModel { get; set; } // Engine Model

        [Required]
        public string Manufacturer { get; set; } // Manufacturer

        [Required]
        public string ManufacturerAddress { get; set; } // Manufacturer Address

        [Required]
        public string PlantCompany { get; set; } // Plant Company

        [Required]
        public string PlantCountry { get; set; } // Plant Country

        [Required]
        public string PlantState { get; set; } // Plant State

        public double FuelConsumptionExtraUrban { get; set; } // Fuel Consumption Extra Urban (l/100km)
        public double FuelConsumptionUrban { get; set; } // Fuel Consumption Urban (l/100km)

        public int NumberOfDoors { get; set; } // Number of Doors
        public int MaxWeight { get; set; } // Max Weight (kg)

        [Required]
        public string CheckDigit { get; set; } // Check Digit

        [Required]
        public string SequentialNumber { get; set; } // Sequential Number

        public decimal Price { get; set; } // Price

        // Властивість для збереження шляхів до фото
        public string PhotoPaths { get; set; } // Photo Paths (фото зберігаються на сервері)
    }
}
