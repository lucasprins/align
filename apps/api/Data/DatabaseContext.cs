using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Align.Data;

public class DatabaseContext(DbContextOptions<DatabaseContext> options) : IdentityDbContext<User, IdentityRole<Guid>, Guid>(options)
{
    public DbSet<Workspace> Workspaces { get; set; }
    public DbSet<WorkspaceMember> WorkspaceMembers { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<User>()
            .HasKey(e => e.Id);

        builder.Entity<Workspace>()
            .HasKey(e => e.Id);

        builder.Entity<User>()
            .HasMany(e => e.Workspaces)
            .WithMany(e => e.Users)
            .UsingEntity<WorkspaceMember>();

        builder.Entity<Workspace>()
            .HasMany(e => e.Users)
            .WithMany(e => e.Workspaces)
            .UsingEntity<WorkspaceMember>();

        builder.Entity<WorkspaceMember>()
            .Property(e => e.Role)
            .HasConversion<string>();
    }
}