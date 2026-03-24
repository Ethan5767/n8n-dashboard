import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ path: '.env.local' });

const envSchema = z.object({
  N8N_BASE_URL: z.string().url(),
  N8N_API_KEY: z.string().min(1),
  PORT: z.coerce.number().default(3001),
});

const parsed = envSchema.safeParse(process.env);
const env = parsed.success
  ? parsed.data
  : { N8N_BASE_URL: '', N8N_API_KEY: '', PORT: 3001 };

const app = express();
app.use(cors());
app.use(express.json());

function baseUrl() {
  return env.N8N_BASE_URL.replace(/\/$/, '');
}

async function n8nFetch(path: string) {
  if (!env.N8N_BASE_URL || !env.N8N_API_KEY) {
    throw new Error('Missing N8N_BASE_URL or N8N_API_KEY in .env.local');
  }
  const res = await fetch(`${baseUrl()}/api/v1${path}`, {
    headers: {
      'X-N8N-API-KEY': env.N8N_API_KEY,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`n8n API error (${res.status})`);
  }
  return res.json();
}

function normalizeWorkflows(raw: any) {
  return Array.isArray(raw?.data) ? raw.data : Array.isArray(raw) ? raw : raw?.items || [];
}
function normalizeExecutions(raw: any) {
  return Array.isArray(raw?.data) ? raw.data : Array.isArray(raw) ? raw : raw?.items || [];
}

app.get('/api/connection-status', async (_req, res) => {
  if (!parsed.success) {
    return res.json({ ok: false, baseUrl: env.N8N_BASE_URL || 'unset', message: 'Set N8N_BASE_URL and N8N_API_KEY in .env.local', timestamp: new Date().toISOString() });
  }
  try {
    await n8nFetch('/workflows?limit=1');
    res.json({ ok: true, baseUrl: env.N8N_BASE_URL, message: 'Connected to n8n', timestamp: new Date().toISOString() });
  } catch (error) {
    res.json({ ok: false, baseUrl: env.N8N_BASE_URL, message: error instanceof Error ? error.message : 'Connection failed', timestamp: new Date().toISOString() });
  }
});

app.get('/api/test-connection', async (_req, res) => {
  try {
    await n8nFetch('/workflows?limit=1');
    res.json({ ok: true, baseUrl: env.N8N_BASE_URL, message: 'Connection looks good', timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'Connection failed');
  }
});

app.get('/api/workflows', async (_req, res) => {
  try {
    const raw = await n8nFetch('/workflows?limit=100');
    res.json(normalizeWorkflows(raw));
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'Failed to load workflows');
  }
});

app.get('/api/executions', async (_req, res) => {
  try {
    const raw = await n8nFetch('/executions?limit=100');
    res.json(normalizeExecutions(raw));
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'Failed to load executions');
  }
});

app.get('/api/workflows/:id', async (req, res) => {
  try {
    const raw = await n8nFetch(`/workflows/${req.params.id}`);
    res.json(raw);
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'Failed to load workflow');
  }
});

app.get('/api/executions/:id', async (req, res) => {
  try {
    const raw = await n8nFetch(`/executions/${req.params.id}`);
    res.json(raw);
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'Failed to load execution');
  }
});

app.get('/api/dashboard', async (_req, res) => {
  try {
    const [workflowRaw, executionRaw] = await Promise.all([
      n8nFetch('/workflows?limit=100'),
      n8nFetch('/executions?limit=100'),
    ]);
    const workflows = normalizeWorkflows(workflowRaw);
    const executions = normalizeExecutions(executionRaw);
    const failed = executions.filter((item: any) => ['error', 'failed', 'crashed'].includes(String(item.status || '').toLowerCase())).length;
    const running = executions.filter((item: any) => String(item.status || '').toLowerCase() === 'running').length;
    const waiting = executions.filter((item: any) => ['waiting', 'queued'].includes(String(item.status || '').toLowerCase())).length;
    const success = executions.filter((item: any) => String(item.status || '').toLowerCase() === 'success').length;
    const total = executions.length || 1;
    res.json({
      workflows,
      executions,
      lastUpdated: new Date().toISOString(),
      metrics: {
        totalWorkflows: workflows.length,
        activeWorkflows: workflows.filter((item: any) => item.active).length,
        archivedWorkflows: workflows.filter((item: any) => item.isArchived).length,
        totalExecutions: executions.length,
        failedExecutions: failed,
        runningExecutions: running,
        waitingExecutions: waiting,
        successRate: Math.round((success / total) * 100),
      },
    });
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'Failed to load dashboard');
  }
});

app.listen(env.PORT, () => {
  console.log(`n8n-dashboard server listening on http://localhost:${env.PORT}`);
});
