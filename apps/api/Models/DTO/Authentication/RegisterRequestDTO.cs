namespace Align.Models;

public record RegisterRequestDTO
{
    public required string Email { get; init; }
    public required string Password { get; init; }
}