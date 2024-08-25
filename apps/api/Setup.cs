using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Tenet.Services;

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
        builder.Services.Configure<DiscordAuthOptions>(builder.Configuration.GetSection("DiscordAuth"));
    }

    public static void SetupServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddTransient<IAuthenticationService, AuthenticationService>();
        builder.Services.AddTransient<IOpenAuthService, OpenAuthService>();
    }

    public static void SetupAuthentication(this WebApplicationBuilder builder)
    {
        builder.Services
            .AddIdentity<User, IdentityRole<Guid>>(options =>
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

        builder.Services
            .AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = IdentityConstants.ApplicationScheme;
                options.DefaultSignInScheme = IdentityConstants.ExternalScheme;
                options.DefaultChallengeScheme = "Discord";
            })
            .AddCookie()
            .AddDiscord(options =>
            {
                var discordOptions = builder.Configuration.GetSection("DiscordAuth").Get<DiscordAuthOptions>();

                if (discordOptions != null)
                {
                    options.ClientId = discordOptions.ClientId;
                    options.ClientSecret = discordOptions.ClientSecret;

                    options.Scope.Add("email");

                    options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.CallbackPath = "/auth/callback/discord";
                }
                else
                {
                    throw new Exception("Unable to find DiscordAuthSettings in appsettings");
                }
            });
    }
}