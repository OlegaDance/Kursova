using Microsoft.EntityFrameworkCore;
using CarApi.Models;

namespace CarApi.Data
{
    public class CarContext : DbContext
    {
        public CarContext(DbContextOptions<CarContext> options) : base(options) { }

        public DbSet<Car> Cars { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Car>()
                .Property(c => c.Price)
                .HasColumnType("decimal(18,2)"); 

            base.OnModelCreating(modelBuilder); 
        }
    }
}
