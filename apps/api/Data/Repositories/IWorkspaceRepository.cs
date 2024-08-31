namespace Align.Data;

public interface IWorkspaceRepository
{
    Task<Workspace?> Get(Guid id);
    Task Add(Workspace workspace);

    Task<bool> UrlExists(string url);
}