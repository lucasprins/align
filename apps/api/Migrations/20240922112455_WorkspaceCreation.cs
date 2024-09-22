using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class WorkspaceCreation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkspaceMember_AspNetUsers_UserId",
                table: "WorkspaceMember");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkspaceMember_Workspaces_WorkspaceId",
                table: "WorkspaceMember");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WorkspaceMember",
                table: "WorkspaceMember");

            migrationBuilder.RenameTable(
                name: "WorkspaceMember",
                newName: "WorkspaceMembers");

            migrationBuilder.RenameIndex(
                name: "IX_WorkspaceMember_WorkspaceId",
                table: "WorkspaceMembers",
                newName: "IX_WorkspaceMembers_WorkspaceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WorkspaceMembers",
                table: "WorkspaceMembers",
                columns: new[] { "UserId", "WorkspaceId" });

            migrationBuilder.AddForeignKey(
                name: "FK_WorkspaceMembers_AspNetUsers_UserId",
                table: "WorkspaceMembers",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkspaceMembers_Workspaces_WorkspaceId",
                table: "WorkspaceMembers",
                column: "WorkspaceId",
                principalTable: "Workspaces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkspaceMembers_AspNetUsers_UserId",
                table: "WorkspaceMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkspaceMembers_Workspaces_WorkspaceId",
                table: "WorkspaceMembers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WorkspaceMembers",
                table: "WorkspaceMembers");

            migrationBuilder.RenameTable(
                name: "WorkspaceMembers",
                newName: "WorkspaceMember");

            migrationBuilder.RenameIndex(
                name: "IX_WorkspaceMembers_WorkspaceId",
                table: "WorkspaceMember",
                newName: "IX_WorkspaceMember_WorkspaceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WorkspaceMember",
                table: "WorkspaceMember",
                columns: new[] { "UserId", "WorkspaceId" });

            migrationBuilder.AddForeignKey(
                name: "FK_WorkspaceMember_AspNetUsers_UserId",
                table: "WorkspaceMember",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkspaceMember_Workspaces_WorkspaceId",
                table: "WorkspaceMember",
                column: "WorkspaceId",
                principalTable: "Workspaces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
