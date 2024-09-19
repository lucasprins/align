namespace Align.Models;

public record RegistrationResult
{
    public required bool IsSuccess { get; init; }
    public RegistrationError? Error { get; init; }
    public UserDTO? User { get; init; }

    public static RegistrationResult Failed(RegistrationError error)
    {
        return new()
        {
            IsSuccess = false,
            Error = error
        };
    }

    public static RegistrationResult Success(UserDTO user)
    {
        return new()
        {
            IsSuccess = true,
            User = user
        };
    }
}