namespace Tenet.Models;

public record CreateWorkspaceResult
{
    public required bool IsSuccess { get; init; }
    public WorkspaceValidationError? ValidationError { get; init; }
    public WorkspaceDTO? Workspace { get; init; }

    public static CreateWorkspaceResult Failed(WorkspaceValidationError error)
    {
        return new()
        {
            IsSuccess = false,
            ValidationError = error
        };
    }

    public static CreateWorkspaceResult Success(WorkspaceDTO workspaceDTO)
    {
        return new()
        {
            IsSuccess = true,
            Workspace = workspaceDTO
        };
    }
}