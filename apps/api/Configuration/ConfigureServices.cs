namespace Tenet.Configuration;

public static class ConfigureServices
{
    public static IServiceCollection AddServicesConfiguration(this IServiceCollection services)
    {
        services.AddTransient<IWorkspaceRepository, WorkspaceRepository>();

        services.AddTransient<IAuthenticationService, AuthenticationService>();
        services.AddTransient<IValidationService, ValidationService>();
        services.AddTransient<IWorkspaceService, WorkspaceService>();

        return services;
    }
}