namespace Align.Models;

public record CreateWorkspaceResult
{
    public required bool IsSuccess { get; init; }
    public WorkspaceValidationError? ValidationError { get; init; }
    public WorkspaceDTO? Workspace { get; init; }
    public UserDTO? User { get; init; }

    public static CreateWorkspaceResult Failed(WorkspaceValidationError error)
    {
        return new()
        {
            IsSuccess = false,
            ValidationError = error
        };
    }

    public static CreateWorkspaceResult Success(WorkspaceDTO workspaceDTO, UserDTO? user)
    {
        return new()
        {
            IsSuccess = true,
            Workspace = workspaceDTO,
            User = user
        };
    }
}