using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarApi.Data;
using CarApi.Models;
using CarApi.DTOs;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace CarApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarsController : ControllerBase
    {
        private readonly CarContext _context;

        public CarsController(CarContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Car>>> GetCars()
        {
            return await _context.Cars.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null)
                return NotFound();
            return car;
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<Car>> AddCar([FromForm] CarCreateDto carDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var photoPaths = new List<string>();

            if (carDto.PhotoPaths != null && carDto.PhotoPaths.Any())
            {
                var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(uploadPath))
                    Directory.CreateDirectory(uploadPath);

                foreach (var file in carDto.PhotoPaths)
                {
                    if (file.Length > 0)
                    {
                        var fileName = Path.GetRandomFileName() + Path.GetExtension(file.FileName);
                        var filePath = Path.Combine(uploadPath, fileName);

                        using var stream = new FileStream(filePath, FileMode.Create);
                        await file.CopyToAsync(stream);

                        photoPaths.Add($"/uploads/{fileName}");
                    }
                }
            }

            var car = new Car
            {
                VinCode = carDto.VinCode,
                VehicleId = carDto.VehicleId,
                Make = carDto.Make,
                Model = carDto.Model,
                ModelYear = carDto.ModelYear,
                ProductType = carDto.ProductType,
                Body = carDto.Body,
                Trim = carDto.Trim,
                Series = carDto.Series,
                Drive = carDto.Drive,
                EngineDisplacement = carDto.EngineDisplacement,
                FuelTypePrimary = carDto.FuelTypePrimary,
                EngineModel = carDto.EngineModel,
                Manufacturer = carDto.Manufacturer,
                ManufacturerAddress = carDto.ManufacturerAddress,
                PlantCompany = carDto.PlantCompany,
                PlantCountry = carDto.PlantCountry,
                PlantState = carDto.PlantState,
                FuelConsumptionExtraUrban = carDto.FuelConsumptionExtraUrban,
                FuelConsumptionUrban = carDto.FuelConsumptionUrban,
                NumberOfDoors = carDto.NumberOfDoors,
                MaxWeight = carDto.MaxWeight,
                CheckDigit = carDto.CheckDigit,
                SequentialNumber = carDto.SequentialNumber,
                Price = carDto.Price,

                PhotoPaths = photoPaths
            };

            _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCar), new { id = car.Id }, car);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null)
                return NotFound();

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
