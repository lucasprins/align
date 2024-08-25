namespace Tenet.Services;

public partial class WorkspaceService(IWorkspaceRepository workspaceRepository, IValidationService validationService) : IWorkspaceService
{
    private readonly IWorkspaceRepository _workspaceRepository = workspaceRepository;
    private readonly IValidationService _validationService = validationService;

    public async Task<WorkspaceDTO?> Get(Guid id)
    {
        var workspace = await _workspaceRepository.Get(id);
        return workspace == null ? null : WorkspaceDTO.Create(workspace);
    }

    public async Task<CreateWorkspaceResult> Create(CreateWorkspaceDTO createWorkspaceDTO)
    {
        if (!await IsUrlAvailable(createWorkspaceDTO.Url))
        {
            return CreateWorkspaceResult.Failed(WorkspaceValidationError.UrlTaken);
        }

        if (!_validationService.ValidateWorkspaceUrl(createWorkspaceDTO.Url))
        {
            return CreateWorkspaceResult.Failed(WorkspaceValidationError.InvalidName);
        }

        Workspace workspace = new()
        {
            Id = Guid.NewGuid(),
            UpdatedAt = DateTime.UtcNow,
            CreatedAt = DateTime.UtcNow,
            Name = createWorkspaceDTO.Name,
            Url = createWorkspaceDTO.Url,
            LogoUrl = createWorkspaceDTO.LogoUrl,
        };

        await _workspaceRepository.Add(workspace);

        return CreateWorkspaceResult.Success(WorkspaceDTO.Create(workspace));
    }

    public async Task<bool> IsUrlAvailable(string url)
    {
        return (await _workspaceRepository.UrlExists(url)) == false;
    }
}