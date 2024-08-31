namespace Align.Configuration;

public static class ConfigureServices
{
    public static IServiceCollection AddServicesConfiguration(this IServiceCollection services)
    {
        services.AddTransient<IUserRepository, UserRepository>();
        services.AddTransient<IWorkspaceRepository, WorkspaceRepository>();

        services.AddTransient<IAuthenticationService, AuthenticationService>();
        services.AddTransient<IUserService, UserService>();
        services.AddTransient<IValidationService, ValidationService>();
        services.AddTransient<IWorkspaceService, WorkspaceService>();

        return services;
    }
}