import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api';
import { Badge, Button, Card, Input, SectionHeader, Topbar } from '../components/ui';
import { executionStatus, formatTime } from '../lib/utils';
import type { Execution } from '../lib/types';

export function ExecutionsPage() {
  const queryClient = useQueryClient();
  const { data = [], isLoading, error } = useQuery({ queryKey: ['executions'], queryFn: apiClient.getExecutions });
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Execution | null>(null);

  const retryMutation = useMutation({
    mutationFn: (id: string) => apiClient.retryExecution(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['executions'] }),
  });
  const stopMutation = useMutation({
    mutationFn: (id: string) => apiClient.stopExecution(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['executions'] }),
  });

  const filtered = useMemo(() => data.filter((e) => `${e.id}`.includes(query) || `${e.workflowId || ''}`.includes(query) || `${e.status || ''}`.toLowerCase().includes(query.toLowerCase())), [data, query]);

  return (
    <div className="grid">
      <Topbar title="Executions" subtitle="Triage recent runs, retry failures, and stop what should not keep running." />
      <div className="grid grid-3">
        <Card className="grid" style={{ gridColumn: 'span 2' }}>
          <SectionHeader title="Recent executions" subtitle="Search by execution id, workflow id, or status." />
          <div className="toolbar">
            <Input placeholder="Search executions" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          {isLoading ? <p>Loading executions…</p> : error instanceof Error ? <p>{error.message}</p> : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Workflow</th>
                    <th>Status</th>
                    <th>Mode</th>
                    <th>Started</th>
                    <th>Stopped</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((execution) => (
                    <tr key={String(execution.id)}>
                      <td><button className="button" onClick={() => setSelected(execution)}>{execution.id}</button></td>
                      <td>{execution.workflowId || '—'}</td>
                      <td><Badge label={executionStatus(execution)} /></td>
                      <td>{execution.mode || '—'}</td>
                      <td>{formatTime(execution.startedAt)}</td>
                      <td>{formatTime(execution.stoppedAt)}</td>
                      <td>
                        <div className="actions">
                          <Button className="success" onClick={() => retryMutation.mutate(String(execution.id))}>Retry</Button>
                          <Button className="danger" onClick={() => stopMutation.mutate(String(execution.id))}>Stop</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
        <Card>
          <SectionHeader title="Execution detail" subtitle="Quick drill-down without leaving the page." />
          {selected ? (
            <div className="stack">
              <div className="surface">
                <strong>Execution #{selected.id}</strong>
                <div className="muted small">Workflow {selected.workflowId || 'Unknown'}</div>
              </div>
              <div className="row"><span>Status</span><Badge label={executionStatus(selected)} /></div>
              <div className="row"><span>Mode</span><strong>{selected.mode || '—'}</strong></div>
              <div className="row"><span>Started</span><strong>{formatTime(selected.startedAt)}</strong></div>
              <div className="row"><span>Stopped</span><strong>{formatTime(selected.stoppedAt)}</strong></div>
              <div className="actions">
                <Button className="success" onClick={() => retryMutation.mutate(String(selected.id))}>Retry</Button>
                <Button className="danger" onClick={() => stopMutation.mutate(String(selected.id))}>Stop</Button>
              </div>
            </div>
          ) : <p className="muted">Select an execution to inspect it here.</p>}
        </Card>
      </div>
    </div>
  );
}
