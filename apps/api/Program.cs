global using Microsoft.EntityFrameworkCore;

global using Tenet;
global using Tenet.Data;
global using Tenet.Interfaces;
global using Tenet.Models;
global using Tenet.Utils;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddAuthorization();

builder.SetupDatabase();
builder.SetupOptions();
builder.SetupServices();
builder.SetupAuthentication();

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
