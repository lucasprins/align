namespace Align.Configuration;

public static class ConfigureOptions
{
    public static IServiceCollection AddOptionsConfiguration(this IServiceCollection services, IConfiguration config)
    {
        services.Configure<FrontendOptions>(config.GetSection("Frontend"));

        return services;
    }
}