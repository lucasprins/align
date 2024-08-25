namespace Tenet.Configuration;

public static class ConfigureDatabase
{
    public static IServiceCollection AddDatabaseConfiguration(this IServiceCollection services, IConfiguration config)
    {
        services
            .AddDbContext<DatabaseContext>(options => options
            .UseNpgsql(config.GetConnectionString("WebApiDatabase"))
            .LogTo(Console.WriteLine, LogLevel.Information));

        return services;
    }
}