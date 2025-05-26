using CarApi.Data;
using CarApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;

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

        // Оновлений метод AddCar для валідації VIN і завантаження фото
        [HttpPost("cars")]
        public async Task<ActionResult<Car>> AddCar([FromForm] Car car, [FromForm] IFormFileCollection photoPaths)
        {
            // Перевірка на валідність моделі (включаючи VIN)
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Повертає помилку, якщо VIN не відповідає шаблону
            }

            // Збереження файлів
            foreach (var file in photoPaths)
            {
                // Перевірка, чи є файл
                if (file != null && file.Length > 0)
                {
                   var filePath = Path.Combine("C:\\Users\\MrKyg\\Desktop\\xd\\Kursova\\Photo", file.FileName);

                    // Збереження файлу
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    // Додавання шляху до фото в базу даних
                    car.PhotoPaths += filePath + ";"; // Додаємо шлях до фото, розділений крапкою з комою
                }
            }

            // Додаємо автомобіль до бази даних
            _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCars), new { id = car.Id }, car);
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
