using Microsoft.AspNetCore.Identity;

namespace Tenet.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration config)
    {
        services
            .AddDbContext<DatabaseContext>(options => options
            .UseNpgsql(config.GetConnectionString("WebApiDatabase"))
            .LogTo(Console.WriteLine, LogLevel.Information));

        return services;
    }

    public static IServiceCollection AddConfig(this IServiceCollection services, IConfiguration config)
    {
        services.Configure<FrontendOptions>(config.GetSection("Frontend"));

        return services;
    }

    public static IServiceCollection AddAuth(this IServiceCollection services)
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

    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddTransient<IWorkspaceRepository, WorkspaceRepository>();

        services.AddTransient<IAuthenticationService, AuthenticationService>();
        services.AddTransient<IValidationService, ValidationService>();
        services.AddTransient<IWorkspaceService, WorkspaceService>();

        return services;
    }
}