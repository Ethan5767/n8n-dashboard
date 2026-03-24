import type { ConnectionStatus, DashboardData, Execution, Workflow } from './types';

async function parseResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

async function get<T>(path: string): Promise<T> {
  return parseResponse<T>(await fetch(path));
}

async function post<T>(path: string): Promise<T> {
  return parseResponse<T>(await fetch(path, { method: 'POST' }));
}

export const apiClient = {
  getConnectionStatus: () => get<ConnectionStatus>('/api/connection-status'),
  testConnection: () => get<ConnectionStatus>('/api/test-connection'),
  getDashboard: () => get<DashboardData>('/api/dashboard'),
  getWorkflows: () => get<Workflow[]>('/api/workflows'),
  getExecutions: () => get<Execution[]>('/api/executions'),
  getWorkflow: (id: string) => get<Workflow>(`/api/workflows/${id}`),
  getExecution: (id: string) => get<Execution>(`/api/executions/${id}`),
  activateWorkflow: (id: string) => post<{ ok: boolean }>(`/api/workflows/${id}/activate`),
  deactivateWorkflow: (id: string) => post<{ ok: boolean }>(`/api/workflows/${id}/deactivate`),
  retryExecution: (id: string) => post<{ ok: boolean }>(`/api/executions/${id}/retry`),
  stopExecution: (id: string) => post<{ ok: boolean }>(`/api/executions/${id}/stop`),
};
