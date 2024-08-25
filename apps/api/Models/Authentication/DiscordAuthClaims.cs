using System.Security.Claims;

namespace Tenet.Models;

public class DiscordAuthClaims
{
    public required string Id { get; set; }
    public required string Username { get; set; }
    public required string Email { get; set; }

    public static DiscordAuthClaims? Extract(IEnumerable<Claim> claims)
    {
        var discordId = claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
        var discordUsername = claims.FirstOrDefault(x => x.Type == ClaimTypes.Name);
        var discordEmail = claims.FirstOrDefault(x => x.Type == ClaimTypes.Email);

        if (discordId == null || discordUsername == null || discordEmail == null)
        {
            return null;
        }
        else
        {
            return new() { Id = discordId.Value, Username = discordUsername.Value, Email = discordEmail.Value };
        }
    }
}