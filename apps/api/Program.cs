global using Microsoft.EntityFrameworkCore;

global using Tenet.Data;
global using Tenet.Enums;
global using Tenet.Interfaces;
global using Tenet.Models;
global using Tenet.Services;
global using Tenet.Utils;

using Tenet.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddControllerConfiguration()
    .AddOptionsConfiguration(builder.Configuration)
    .AddDatabaseConfiguration(builder.Configuration)
    .AddAuthenticationConfiguration()
    .AddServicesConfiguration();

builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseHttpsRedirection();

app.Run();
