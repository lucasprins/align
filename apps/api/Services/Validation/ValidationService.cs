using System.Text.RegularExpressions;

namespace Align.Services;

public partial class ValidationService : IValidationService
{
    [GeneratedRegex(@"^[a-z](?:[a-z-]{1,}[a-z])?$")]
    private partial Regex WorkspaceNameRegex();

    public bool ValidateWorkspaceUrl(string url)
    {
        return WorkspaceNameRegex().IsMatch(url) && url.Length > 3;
    }
}