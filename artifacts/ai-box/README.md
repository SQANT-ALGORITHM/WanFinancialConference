# AI BOX Command Center

An interactive React web **UI prototype** of a local-first AI desktop product for personal and professional users.

> Built for Local. Our Own Design. Our Applications. Our Modules.
>
> Privacy, ownership and offline independence.

These statements describe the intended product direction, not verified capabilities of this prototype.

## Prototype scope

- Home: sample system status, clearly marked demo/simulated.
- AI Workspace: selectable sample model, conversation composer, simulated responses, loading and stop interactions. No real model is connected.
- Projects: seeded sample projects and client-side project creation.
- Memory & Knowledge: search over seeded local demo records.
- Models & Tools: sample model inventory and an explanation of the unconnected inference runtime.
- Guardian: editable demo permissions, approval queue, and activity log. These controls do not enforce security or access permissions.
- Time Travel: sample version history and simulated restore confirmation. No files or databases are restored.
- Settings: Local/Connected Mode preference and JSON demo-data export. Connected Mode does not establish any connection.

## Data and networking

Demo data and entered content are held in browser memory. They survive page navigation within the app, but refreshing the page resets the demo. Export demo data before refreshing if you want a copy.

The prototype does not call an AI service, send conversation input to a server, or add analytics or telemetry. It does not implement a persistent database or cloud synchronization. Export uses a browser-generated JSON download.

The preview still loads application assets from its web host, and development tooling may communicate with the development server. **This is not a verified offline desktop application.** No claim is made that browser, hosting, or device infrastructure has been audited.

Do not enter sensitive information into a UI prototype.

## Running

From the repository root:

```sh
pnpm install
pnpm --filter @workspace/ai-box run typecheck
```

Run the configured AI BOX web workflow for the preview. It supplies the required `PORT` and `BASE_PATH` values to Vite. No API server or database is needed for this prototype.

## Engineering still required

Before shipping a real local-first desktop product:

1. Integrate a real local inference runtime, model installation, hardware detection, streaming generation, and cancellation.
2. Engineer a persistent local database, schema migrations, data lifecycle, export/import, and appropriate encryption and key management.
3. Implement OS-level permission enforcement and a real approval boundary; UI switches are not security controls.
4. Verify offline operation, package required assets locally, audit network behavior and dependencies, and test connected-mode consent.
5. Implement durable version snapshots, integrity checks, real recovery, failure handling, and restore tests.
6. Add automated unit, integration, accessibility, responsive, and end-to-end tests, plus security review and platform-specific desktop testing.

No inference, persistence, OS permissions, offline verification, or recovery is represented as complete.
