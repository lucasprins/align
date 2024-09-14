global using Microsoft.EntityFrameworkCore;

global using Align.Data;
global using Align.Enums;
global using Align.Interfaces;
global using Align.Models;
global using Align.Services;

using Align;
using Align.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddControllerConfiguration()
    .AddOptionsConfiguration(builder.Configuration)
    .AddDatabaseConfiguration(builder.Configuration)
    .AddAuthenticationConfiguration()
    .AddCORSConfiguration()
    .AddServicesConfiguration();

builder.Services.AddCors();
builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
    options.Cookie.Domain = "localhost";
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(Constants.CORS_POLICY_NAME);

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseHttpsRedirection();

app.Run();
