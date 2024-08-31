using Microsoft.AspNetCore.Identity;

namespace Align.Configuration;

public static class ConfigureAuthentication
{
    public static IServiceCollection AddAuthenticationConfiguration(this IServiceCollection services)
    {
        services
           .AddIdentityApiEndpoints<User>(options =>
           {
               options.Password.RequireDigit = true;
               options.Password.RequiredLength = 8;
               options.Password.RequiredUniqueChars = 1;
               options.Password.RequireLowercase = true;
               options.Password.RequireNonAlphanumeric = false;
               options.Password.RequireUppercase = true;

               options.User.RequireUniqueEmail = true;
           })
           .AddEntityFrameworkStores<DatabaseContext>()
           .AddDefaultTokenProviders();

        return services;
    }
}