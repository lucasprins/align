using Microsoft.AspNetCore.Identity;

namespace Tenet;

public static class ApplicationSetupExtensions
{
    public static void SetupDatabase(this WebApplicationBuilder builder)
    {
        builder.Services
            .AddDbContext<DatabaseContext>(options => options
            .UseNpgsql(builder.Configuration.GetConnectionString("WebApiDatabase"))
            .LogTo(Console.WriteLine, LogLevel.Information));
    }

    public static void SetupOptions(this WebApplicationBuilder builder)
    {
        builder.Services.Configure<FrontendOptions>(builder.Configuration.GetSection("Frontend"));
    }

    public static void SetupServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddTransient<IWorkspaceRepository, WorkspaceRepository>();

        builder.Services.AddTransient<IAuthenticationService, AuthenticationService>();
        builder.Services.AddTransient<IValidationService, ValidationService>();
        builder.Services.AddTransient<IWorkspaceService, WorkspaceService>();
    }

    public static void SetupAuthentication(this WebApplicationBuilder builder)
    {
        builder.Services
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
    }
}