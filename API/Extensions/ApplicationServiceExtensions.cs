using API.Entities;
using ETaraba.Data;
using Microsoft.EntityFrameworkCore;

namespace ETaraba.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
            IConfiguration config)
        {
            services.AddDbContext<AppDbContext>(opt =>
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"))
            );

            services.AddDefaultIdentity<AppUser>().AddEntityFrameworkStores<AppDbContext>();

            services.AddCors();
            //services.AddScoped<ITokenService, TokenService>();

            return services;
        }
    }
}
