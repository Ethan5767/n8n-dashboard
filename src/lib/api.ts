import type { ConnectionStatus, DashboardData, Execution, Workflow } from './types';

async function api<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const apiClient = {
  getConnectionStatus: () => api<ConnectionStatus>('/api/connection-status'),
  testConnection: () => api<ConnectionStatus>('/api/test-connection'),
  getDashboard: () => api<DashboardData>('/api/dashboard'),
  getWorkflows: () => api<Workflow[]>('/api/workflows'),
  getExecutions: () => api<Execution[]>('/api/executions'),
  getWorkflow: (id: string) => api<Workflow>(`/api/workflows/${id}`),
  getExecution: (id: string) => api<Execution>(`/api/executions/${id}`),
};
