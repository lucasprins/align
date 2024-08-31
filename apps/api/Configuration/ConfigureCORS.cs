namespace Align.Configuration;

public static class ConfigureCORS
{
    public static IServiceCollection AddCORSConfiguration(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(name: Constants.CORS_POLICY_NAME, policy =>
            {
                policy
                    .WithOrigins("http://localhost:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });

        return services;
    }
}