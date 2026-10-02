using System.Text.Json;
using EventEase.Models;
using Microsoft.JSInterop;

namespace EventEase.Services;

/// <summary>Événements, inscriptions et présences, persistés dans localStorage.</summary>
public class EventService(IJSRuntime js)
{
    private const string Key = "eventease.state";
    private bool _loaded;

    public List<EventItem> Events { get; private set; } = [];
    public List<Registration> Registrations { get; private set; } = [];
    public event Action? Changed;

    private record State(List<EventItem> Events, List<Registration> Registrations);

    public async Task EnsureLoadedAsync()
    {
        if (_loaded) return;
        _loaded = true;
        try
        {
            var json = await js.InvokeAsync<string?>("localStorage.getItem", Key);
            if (!string.IsNullOrEmpty(json))
            {
                var s = JsonSerializer.Deserialize<State>(json);
                if (s is not null) { Events = s.Events; Registrations = s.Registrations; return; }
            }
        }
        catch { /* données corrompues : on repart des données par défaut */ }

        Events =
        [
            new() { Id = 1, Title = "Conférence Blazor", Date = new DateTime(2026, 11, 15), Location = "Ouagadougou", Capacity = 100, Description = "Une journée sur Blazor et .NET." },
            new() { Id = 2, Title = "Atelier UX Design", Date = new DateTime(2026, 12, 2), Location = "Bobo-Dioulasso", Capacity = 30, Description = "Atelier pratique de conception centrée utilisateur." },
            new() { Id = 3, Title = "Hackathon Startup", Date = new DateTime(2027, 1, 20), Location = "Abidjan", Capacity = 60, Description = "48h pour construire un prototype." }
        ];
        Registrations = [];
    }

    private async Task SaveAsync()
    {
        await js.InvokeVoidAsync("localStorage.setItem", Key, JsonSerializer.Serialize(new State(Events, Registrations)));
        Changed?.Invoke();
    }

    public EventItem? GetEvent(int id) => Events.FirstOrDefault(e => e.Id == id);
    public List<Registration> GetRegistrations(int eventId) => Registrations.Where(r => r.EventId == eventId).ToList();
    public int Count(int eventId) => Registrations.Count(r => r.EventId == eventId);

    public async Task AddEventAsync(EventItem e)
    {
        e.Id = Events.Count == 0 ? 1 : Events.Max(x => x.Id) + 1;
        Events.Add(e);
        await SaveAsync();
    }

    public async Task UpdateEventAsync(EventItem e)
    {
        var i = Events.FindIndex(x => x.Id == e.Id);
        if (i >= 0) Events[i] = e;
        await SaveAsync();
    }

    public async Task DeleteEventAsync(int id)
    {
        Events.RemoveAll(e => e.Id == id);
        Registrations.RemoveAll(r => r.EventId == id);
        await SaveAsync();
    }

    /// <returns>Un message d'erreur, ou null si l'inscription a réussi.</returns>
    public async Task<string?> RegisterAsync(Registration r)
    {
        var ev = GetEvent(r.EventId);
        if (ev is null) return "Événement introuvable.";
        if (Count(r.EventId) >= ev.Capacity) return "Cet événement est complet.";
        if (Registrations.Any(x => x.EventId == r.EventId && x.Email.Equals(r.Email.Trim(), StringComparison.OrdinalIgnoreCase)))
            return "Cet e-mail est déjà inscrit.";

        r.Id = Registrations.Count == 0 ? 1 : Registrations.Max(x => x.Id) + 1;
        r.Name = r.Name.Trim();
        r.Email = r.Email.Trim();
        r.Phone = r.Phone?.Trim() ?? "";
        Registrations.Add(r);
        await SaveAsync();
        return null;
    }

    public async Task SetPresenceAsync(int registrationId, bool present)
    {
        var r = Registrations.FirstOrDefault(x => x.Id == registrationId);
        if (r is not null) { r.Present = present; await SaveAsync(); }
    }
}
