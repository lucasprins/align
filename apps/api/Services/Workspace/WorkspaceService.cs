namespace Align.Services;

public partial class WorkspaceService(IWorkspaceRepository workspaceRepository, IValidationService validationService, IUserService userService) : IWorkspaceService
{
    private readonly IWorkspaceRepository _workspaceRepository = workspaceRepository;
    private readonly IValidationService _validationService = validationService;
    private readonly IUserService _userService = userService;

    public async Task<WorkspaceDTO?> Get(Guid id)
    {
        var workspace = await _workspaceRepository.Get(id);
        return workspace == null ? null : WorkspaceDTO.Create(workspace);
    }

    public async Task<CreateWorkspaceResult> Create(CreateWorkspaceDTO createWorkspaceDTO, Guid userId)
    {
        if (!await IsUrlAvailable(createWorkspaceDTO.Url))
        {
            return CreateWorkspaceResult.Failed(WorkspaceValidationError.UrlTaken);
        }

        if (!_validationService.ValidateWorkspaceUrl(createWorkspaceDTO.Url))
        {
            return CreateWorkspaceResult.Failed(WorkspaceValidationError.InvalidUrl);
        }

        Workspace workspace = new()
        {
            Id = Guid.NewGuid(),
            UpdatedAt = DateTime.UtcNow,
            CreatedAt = DateTime.UtcNow,
            Name = createWorkspaceDTO.Name,
            Url = createWorkspaceDTO.Url
        };

        await _workspaceRepository.Add(workspace);

        var addedUserToWorkspace = await _workspaceRepository
            .AddUserToWorkspace(workspace.Id, userId, WorkspaceMemberRole.Admin);

        return CreateWorkspaceResult.Success(
            WorkspaceDTO.Create(workspace),
            addedUserToWorkspace
                ? await _userService.GetById(userId)
                : null
        );
    }

    public async Task<bool> IsUrlAvailable(string url)
    {
        return (await _workspaceRepository.UrlExists(url)) == false;
    }
}