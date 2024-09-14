namespace Align.Models;

public record LoginRequestDTO
{
    public required string Email { get; init; }
    public required string Password { get; init; }
    public required bool RememberMe { get; init; }

    public static bool IsValid(LoginRequestDTO dto)
    {
        return !string.IsNullOrEmpty(dto.Email) && !string.IsNullOrEmpty(dto.Password);
    }
}