namespace Align.Models;

public record LoginRequestDTO
{
    public required string Email { get; init; }
    public required string Password { get; init; }
    public required bool RememberMe { get; init; }

    public bool IsValid()
    {
        return !string.IsNullOrEmpty(this.Email) && !string.IsNullOrEmpty(this.Password);
    }
}