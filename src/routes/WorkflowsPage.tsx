import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api';
import { Badge, Button, Card, Input, SectionHeader, Topbar } from '../components/ui';
import { formatTime, workflowStatus } from '../lib/utils';
import type { Workflow } from '../lib/types';

export function WorkflowsPage() {
  const queryClient = useQueryClient();
  const { data = [], isLoading, error } = useQuery({ queryKey: ['workflows'], queryFn: apiClient.getWorkflows });
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Workflow | null>(null);

  const activateMutation = useMutation({
    mutationFn: (id: string) => apiClient.activateWorkflow(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workflows'] }),
  });
  const deactivateMutation = useMutation({
    mutationFn: (id: string) => apiClient.deactivateWorkflow(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workflows'] }),
  });

  const filtered = useMemo(() => data.filter((w) => w.name.toLowerCase().includes(query.toLowerCase())), [data, query]);

  return (
    <div className="grid">
      <Topbar title="Workflows" subtitle="Scan, filter, and control workflow state without opening the full editor." />
      <div className="grid grid-3">
        <Card className="grid" style={{ gridColumn: 'span 2' }}>
          <SectionHeader title="Workflow inventory" subtitle="Fast scanning with lightweight actions." />
          <div className="toolbar">
            <Input placeholder="Search workflows" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          {isLoading ? <p>Loading workflows…</p> : error instanceof Error ? <p>{error.message}</p> : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Tags</th>
                    <th>Triggers</th>
                    <th>Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((workflow) => (
                    <tr key={workflow.id}>
                      <td>
                        <button className="button" onClick={() => setSelected(workflow)}>{workflow.name}</button>
                      </td>
                      <td><Badge label={workflowStatus(workflow)} /></td>
                      <td>{workflow.tags?.map((t) => t.name).join(', ') || '—'}</td>
                      <td>{workflow.triggerCount ?? '—'}</td>
                      <td>{formatTime(workflow.updatedAt)}</td>
                      <td>
                        <div className="actions">
                          {workflow.active ? (
                            <Button className="danger" onClick={() => deactivateMutation.mutate(workflow.id)}>Deactivate</Button>
                          ) : (
                            <Button className="success" onClick={() => activateMutation.mutate(workflow.id)}>Activate</Button>
                          )}
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
          <SectionHeader title="Workflow detail" subtitle="A simple drill-down panel for the selected workflow." />
          {selected ? (
            <div className="stack">
              <div className="surface">
                <strong>{selected.name}</strong>
                <div className="muted small">Updated {formatTime(selected.updatedAt)}</div>
              </div>
              <div className="row"><span>Status</span><Badge label={workflowStatus(selected)} /></div>
              <div className="row"><span>Tags</span><strong>{selected.tags?.map((t) => t.name).join(', ') || '—'}</strong></div>
              <div className="row"><span>Trigger count</span><strong>{selected.triggerCount ?? '—'}</strong></div>
              <div className="actions">
                {selected.active ? (
                  <Button className="danger" onClick={() => deactivateMutation.mutate(selected.id)}>Deactivate</Button>
                ) : (
                  <Button className="success" onClick={() => activateMutation.mutate(selected.id)}>Activate</Button>
                )}
                <a className="button" href="#" onClick={(e) => e.preventDefault()}>Open in n8n</a>
              </div>
            </div>
          ) : <p className="muted">Select a workflow to inspect it here.</p>}
        </Card>
      </div>
    </div>
  );
}
