namespace Align.Services;

public interface IWorkspaceService
{
    Task<WorkspaceDTO?> Get(Guid id);
    Task<CreateWorkspaceResult> Create(CreateWorkspaceDTO createWorkspaceDTO, Guid userId);
    Task<bool> IsUrlAvailable(string url);
}