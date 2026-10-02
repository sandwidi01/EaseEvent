using System.Text.Json;
using EventEase.Models;
using Microsoft.JSInterop;

namespace EventEase.Services;

/// <summary>Gestion de l'état de la session utilisateur (persistée dans localStorage).</summary>
public class SessionService(IJSRuntime js)
{
    private const string Key = "eventease.session";
    private bool _loaded;

    public UserSession? User { get; private set; }
    public bool IsLoggedIn => User is not null;
    public event Action? Changed;

    public async Task EnsureLoadedAsync()
    {
        if (_loaded) return;
        _loaded = true;
        try
        {
            var json = await js.InvokeAsync<string?>("localStorage.getItem", Key);
            if (!string.IsNullOrEmpty(json)) User = JsonSerializer.Deserialize<UserSession>(json);
        }
        catch { User = null; }
        Changed?.Invoke();
    }

    public async Task LoginAsync(UserSession user)
    {
        User = new UserSession { Name = user.Name.Trim(), Email = user.Email.Trim() };
        await js.InvokeVoidAsync("localStorage.setItem", Key, JsonSerializer.Serialize(User));
        Changed?.Invoke();
    }

    public async Task LogoutAsync()
    {
        User = null;
        await js.InvokeVoidAsync("localStorage.removeItem", Key);
        Changed?.Invoke();
    }
}
