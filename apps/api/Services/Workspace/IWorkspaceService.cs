namespace Tenet.Services;

public interface IWorkspaceService
{
    Task<WorkspaceDTO?> Get(Guid id);
    Task<CreateWorkspaceResult> Create(CreateWorkspaceDTO createWorkspaceDTO);
    Task<bool> IsUrlAvailable(string url);
}