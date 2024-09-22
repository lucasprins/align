namespace Align.Data;

public interface IWorkspaceRepository
{
    Task<Workspace?> Get(Guid id);
    Task Add(Workspace workspace);
    Task<bool> AddUserToWorkspace(Guid workspaceId, Guid userId, WorkspaceMemberRole role);

    Task<bool> UrlExists(string url);
}