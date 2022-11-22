using API.Data;
using API.Helper;
using API.Validation;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config) {
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(options => {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddValidatorsFromAssemblyContaining<ReservationValidator>();
            return services;
        }
    }
}