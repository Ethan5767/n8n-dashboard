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
      <Topbar title="Execution Logs" subtitle="Monitor and debug your automated workflows across the latest execution window." />
      <div className="grid grid-3">
        <Card className="grid" style={{ gridColumn: 'span 2' }}>
          <SectionHeader title="Execution inventory" subtitle="Fast status scanning with lightweight actions." />
          <div className="toolbar">
            <Input placeholder="Search executions" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Button>All Workflows</Button>
            <Button>Last 24 Hours</Button>
          </div>
          {isLoading ? <p>Loading executions…</p> : error instanceof Error ? <p>{error.message}</p> : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Workflow Name</th>
                    <th>Status</th>
                    <th>Mode</th>
                    <th>Started</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((execution) => (
                    <tr key={String(execution.id)}>
                      <td><button className="button" onClick={() => setSelected(execution)}>#EXE-{execution.id}</button></td>
                      <td>{execution.workflowId || 'Unknown workflow'}</td>
                      <td><Badge label={executionStatus(execution)} /></td>
                      <td>{execution.mode || '—'}</td>
                      <td>{formatTime(execution.startedAt)}</td>
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
          <SectionHeader title="Execution Details" subtitle="Context-first drill-down for the selected run." />
          {selected ? (
            <div className="stack">
              <div className="surface">
                <div className="grid grid-2">
                  <div>
                    <div className="muted small">Execution ID</div>
                    <strong>#EXE-{selected.id}</strong>
                  </div>
                  <div>
                    <div className="muted small">Duration</div>
                    <strong>{selected.startedAt && selected.stoppedAt ? 'Completed' : 'In progress'}</strong>
                  </div>
                </div>
              </div>
              <div className="surface">
                <strong>{executionStatus(selected) === 'error' ? 'Workflow issue detected' : 'Execution status'}</strong>
                <div className="muted small" style={{ marginTop: 8 }}>
                  Workflow {selected.workflowId || 'Unknown'} • Started {formatTime(selected.startedAt)}
                </div>
              </div>
              <div className="list">
                <div className="row"><span>Status</span><Badge label={executionStatus(selected)} /></div>
                <div className="row"><span>Mode</span><strong>{selected.mode || '—'}</strong></div>
                <div className="row"><span>Started</span><strong>{formatTime(selected.startedAt)}</strong></div>
                <div className="row"><span>Stopped</span><strong>{formatTime(selected.stoppedAt)}</strong></div>
              </div>
              <div className="actions">
                <Button onClick={() => retryMutation.mutate(String(selected.id))}>Retry Now</Button>
                <Button className="primary">Edit Workflow</Button>
              </div>
            </div>
          ) : <p className="muted">Select an execution to inspect it here.</p>}
        </Card>
      </div>
    </div>
  );
}
