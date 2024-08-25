using Microsoft.AspNetCore.Identity;

namespace Tenet.Utils;

public static class IdentityUtils
{
    public static bool HasDuplicateEmailError(IdentityResult identityResult)
    {
        return identityResult.Errors.Where(err => err.Code == Constants.OAUTH_DUPLICATE_EMAIL_CODE).Any();
    }
}