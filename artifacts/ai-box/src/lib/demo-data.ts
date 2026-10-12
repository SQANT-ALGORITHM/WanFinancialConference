export type Model = { id: string; name: string; family: string; size: string; ctx: string; note: string };
export type Msg = { id: string; role: 'user' | 'assistant' | 'system'; text: string };
export type Project = { id: string; name: string; description: string; model: string; status: string; created: string };
export type MemoryRec = { id: string; title: string; body: string; tags: string[]; updated: string };
export type Perm = { id: string; label: string; desc: string; on: boolean };
export type Approval = { id: string; action: string; target: string; requestedBy: string; state: 'pending' | 'approved' | 'denied' };
export type LogEntry = { id: string; time: string; text: string };
export type Version = { id: string; label: string; when: string; summary: string; changes: number };
export type Mode = 'local' | 'connected';

export const MODELS: Model[] = [
  { id: 'm1', name: 'Sample Mistral-class 7B', family: 'General', size: '4.1 GB', ctx: '32k', note: 'Placeholder entry for layout' },
  { id: 'm2', name: 'Sample Llama-class 8B', family: 'General', size: '4.7 GB', ctx: '8k', note: 'Placeholder entry for layout' },
  { id: 'm3', name: 'Sample Coder 6.7B', family: 'Code', size: '3.8 GB', ctx: '16k', note: 'Placeholder entry for layout' },
  { id: 'm4', name: 'Sample Embedder Small', family: 'Embedding', size: '0.3 GB', ctx: '512', note: 'Placeholder entry for layout' },
];
export const SEED_MESSAGES: Msg[] = [
  { id: 's1', role: 'system', text: 'Demo conversation. No model is connected; replies are canned and labeled simulated.' },
  { id: 's2', role: 'user', text: 'Summarize my notes on the Harbor Lane renovation budget.' },
  { id: 's3', role: 'assistant', text: 'Simulated reply: this is where a summary would appear if a local model were wired in. Nothing was read from your files.' },
];
export const REPLIES = [
  'Simulated reply: I would outline three next steps here, but no model is attached to this prototype.',
  'Simulated reply: this text is canned. In a wired build, a locally run model would draft the answer.',
  'Simulated reply: placeholder response produced by the demo state, not by an AI.',
];
export const SEED_PROJECTS: Project[] = [
  { id: 'p1', name: 'Harbor Lane Renovation', description: 'Budget notes, contractor quotes and permit checklist.', model: 'Sample Mistral-class 7B', status: 'Active', created: '2025-02-03' },
  { id: 'p2', name: 'Quarterly Client Brief', description: 'Drafts and talking points for the Q3 review.', model: 'Sample Llama-class 8B', status: 'Active', created: '2025-03-18' },
  { id: 'p3', name: 'Scripts Toolbox', description: 'Small automation scripts and refactor notes.', model: 'Sample Coder 6.7B', status: 'Paused', created: '2025-01-12' },
];
export const SEED_MEMORY: MemoryRec[] = [
  { id: 'k1', title: 'Renovation budget ceiling', body: 'Agreed ceiling of 48,200 including a 12 percent contingency. Kitchen is the largest line item.', tags: ['finance', 'harbor-lane'], updated: '2025-03-02' },
  { id: 'k2', title: 'Client preferences: Okafor Studio', body: 'Prefers written summaries before calls. Reviews happen on Thursdays. Keep decks under 12 slides.', tags: ['clients'], updated: '2025-03-20' },
  { id: 'k3', title: 'Backup routine', body: 'Weekly copy of the projects folder to the external drive on Sunday evenings.', tags: ['routine', 'ops'], updated: '2025-01-28' },
  { id: 'k4', title: 'Regex snippets', body: 'Date matcher, invoice number matcher and a tolerant email pattern for cleaning exports.', tags: ['code'], updated: '2025-02-14' },
  { id: 'k5', title: 'Travel notes: Lisbon', body: 'Conference runs 9 to 11 June. Book the early train; hotel near Rossio is walkable.', tags: ['travel'], updated: '2025-04-01' },
];
export const SEED_PERMS: Perm[] = [
  { id: 'g1', label: 'Read project files', desc: 'Let assistants read files inside project folders.', on: true },
  { id: 'g2', label: 'Write and edit files', desc: 'Allow assistants to propose and save edits.', on: false },
  { id: 'g3', label: 'Run shell commands', desc: 'Allow command execution from tools.', on: false },
  { id: 'g4', label: 'Access Memory records', desc: 'Allow retrieval from the local knowledge store.', on: true },
  { id: 'g5', label: 'Network access for modules', desc: 'Let modules request outside connections.', on: false },
];
export const SEED_APPROVALS: Approval[] = [
  { id: 'a1', action: 'Edit file', target: 'harbor-lane/budget.md', requestedBy: 'Workspace assistant', state: 'pending' },
  { id: 'a2', action: 'Run command', target: 'npm run build', requestedBy: 'Scripts module', state: 'pending' },
  { id: 'a3', action: 'Read folder', target: '~/Documents/Clients', requestedBy: 'Memory indexer', state: 'pending' },
];
export const SEED_LOG: LogEntry[] = [
  { id: 'l1', time: '09:12', text: 'Demo event: Memory indexer read 14 sample records.' },
  { id: 'l2', time: '09:30', text: 'Demo event: Write access request was denied by default.' },
  { id: 'l3', time: '10:05', text: 'Demo event: Workspace session started (simulated).' },
];
export const SEED_VERSIONS: Version[] = [
  { id: 'v1', label: 'Today, 10:42', when: 'Current', summary: 'Added Quarterly Client Brief notes', changes: 6 },
  { id: 'v2', label: 'Yesterday, 17:15', when: '1 day ago', summary: 'Reorganized Harbor Lane folder', changes: 23 },
  { id: 'v3', label: 'Mon, 08:50', when: '3 days ago', summary: 'Imported contractor quotes', changes: 11 },
  { id: 'v4', label: 'Last week, Fri 16:20', when: '8 days ago', summary: 'Baseline snapshot before cleanup', changes: 41 },
];
export const SEED_METRICS = { cpu: 34, mem: 58, disk: 41, index: 72 };
