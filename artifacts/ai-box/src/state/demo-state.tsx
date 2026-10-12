import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  REPLIES, SEED_APPROVALS, SEED_LOG, SEED_MEMORY, SEED_MESSAGES, SEED_METRICS, SEED_PERMS,
  SEED_PROJECTS, SEED_VERSIONS, MODELS,
  type Approval, type LogEntry, type MemoryRec, type Mode, type Msg, type Perm, type Project, type Version,
} from '@/lib/demo-data';

const stamp = () => new Date().toTimeString().slice(0, 5);
let counter = 100;
const uid = (p: string) => `${p}${++counter}`;

type Ctx = {
  mode: Mode; setMode: (m: Mode) => void;
  modelId: string; setModelId: (id: string) => void;
  messages: Msg[]; pending: boolean; send: (t: string) => void; stop: () => void; clearChat: () => void;
  projects: Project[]; addProject: (p: Omit<Project, 'id' | 'created' | 'status'>) => Project;
  memory: MemoryRec[];
  perms: Perm[]; togglePerm: (id: string) => void;
  approvals: Approval[]; resolveApproval: (id: string, s: 'approved' | 'denied') => void; simulateRequest: () => void;
  log: LogEntry[];
  versions: Version[]; restoredId: string; restore: (id: string) => void; restoreNote: string;
  metrics: typeof SEED_METRICS; refreshMetrics: () => void;
  exportJson: () => string;
};
const C = createContext<Ctx | null>(null);
export const useDemo = () => {
  const c = useContext(C);
  if (!c) throw new Error('DemoProvider missing');
  return c;
};

export function DemoProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('local');
  const [modelId, setModelId] = useState(MODELS[0].id);
  const [messages, setMessages] = useState<Msg[]>(SEED_MESSAGES);
  const [pending, setPending] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [projects, setProjects] = useState<Project[]>(SEED_PROJECTS);
  const [perms, setPerms] = useState<Perm[]>(SEED_PERMS);
  const [approvals, setApprovals] = useState<Approval[]>(SEED_APPROVALS);
  const [log, setLog] = useState<LogEntry[]>(SEED_LOG);
  const [restoredId, setRestoredId] = useState('v1');
  const [restoreNote, setRestoreNote] = useState('');
  const [metrics, setMetrics] = useState(SEED_METRICS);

  const addLog = useCallback((text: string) => setLog((l) => [{ id: uid('l'), time: stamp(), text }, ...l]), []);

  const send = useCallback((t: string) => {
    const text = t.trim();
    if (!text || timer.current) return;
    setMessages((m) => [...m, { id: uid('u'), role: 'user', text }]);
    setPending(true);
    timer.current = setTimeout(() => {
      timer.current = null;
      setPending(false);
      setMessages((m) => [...m, { id: uid('a'), role: 'assistant', text: REPLIES[Math.floor(Math.random() * REPLIES.length)] }]);
    }, 1800);
  }, []);
  const stop = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setPending(false);
    setMessages((m) => [...m, { id: uid('s'), role: 'system', text: 'Simulated response stopped by you.' }]);
  }, []);
  const clearChat = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setPending(false);
    setMessages(SEED_MESSAGES);
  }, []);

  const value: Ctx = useMemo(() => ({
    mode, setMode: (m) => { setMode(m); addLog(`Demo event: preference set to ${m === 'local' ? 'Local Mode' : 'Connected Mode'} (preference only).`); },
    modelId, setModelId, messages, pending, send, stop, clearChat,
    projects,
    addProject: (p) => {
      const np: Project = { ...p, id: uid('p'), created: new Date().toISOString().slice(0, 10), status: 'Active' };
      setProjects((l) => [np, ...l]);
      addLog(`Demo event: project "${np.name}" created in memory.`);
      return np;
    },
    memory: SEED_MEMORY,
    perms,
    togglePerm: (id) => setPerms((l) => l.map((p) => {
      if (p.id !== id) return p;
      addLog(`Demo toggle: "${p.label}" set to ${p.on ? 'off' : 'on'} (not enforced).`);
      return { ...p, on: !p.on };
    })),
    approvals,
    resolveApproval: (id, s) => {
      setApprovals((l) => l.map((a) => (a.id === id ? { ...a, state: s } : a)));
      const a = approvals.find((x) => x.id === id);
      if (a) addLog(`Demo decision: ${s} "${a.action}" on ${a.target}. Nothing was actually allowed or blocked.`);
    },
    simulateRequest: () => {
      const a: Approval = { id: uid('a'), action: 'Read file', target: 'notes/ideas.txt', requestedBy: 'Workspace assistant', state: 'pending' };
      setApprovals((l) => [a, ...l]);
      addLog('Demo event: simulated approval request added.');
    },
    log,
    versions: SEED_VERSIONS, restoredId, restoreNote,
    restore: (id) => {
      const v = SEED_VERSIONS.find((x) => x.id === id);
      if (!v) return;
      setRestoredId(id);
      setRestoreNote(`Simulated restore marked "${v.label}". No files were changed.`);
      addLog(`Demo event: simulated restore to "${v.label}". No real recovery occurred.`);
    },
    metrics,
    refreshMetrics: () => setMetrics({ cpu: 20 + Math.round(Math.random() * 50), mem: 35 + Math.round(Math.random() * 40), disk: 30 + Math.round(Math.random() * 25), index: 50 + Math.round(Math.random() * 45) }),
    exportJson: () => JSON.stringify({
      note: 'AI BOX demo data. Sample content only; generated in the browser.',
      exportedAt: new Date().toISOString(),
      preferences: { mode, selectedModel: modelId },
      conversation: messages, projects, memoryRecords: SEED_MEMORY, models: MODELS,
      guardian: { permissions: perms, approvals, activityLog: log },
      timeTravel: { versions: SEED_VERSIONS, simulatedRestoreMarker: restoredId },
      metrics,
    }, null, 2),
  }), [mode, modelId, messages, pending, send, stop, clearChat, projects, perms, approvals, log, restoredId, restoreNote, metrics, addLog]);

  return <C.Provider value={value}>{children}</C.Provider>;
}
