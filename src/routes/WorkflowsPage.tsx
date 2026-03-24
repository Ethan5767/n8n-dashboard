import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api';
import { Badge, Card, Input, Topbar } from '../components/ui';
import { formatTime, workflowStatus } from '../lib/utils';

export function WorkflowsPage() {
  const { data = [], isLoading, error } = useQuery({ queryKey: ['workflows'], queryFn: apiClient.getWorkflows });
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => data.filter((w) => w.name.toLowerCase().includes(query.toLowerCase())), [data, query]);

  return (
    <div className="grid">
      <Topbar title="Workflows" subtitle="Search, scan, and jump into workflow health quickly." />
      <Card>
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
                </tr>
              </thead>
              <tbody>
                {filtered.map((workflow) => (
                  <tr key={workflow.id}>
                    <td>{workflow.name}</td>
                    <td><Badge label={workflowStatus(workflow)} /></td>
                    <td>{workflow.tags?.map((t) => t.name).join(', ') || '—'}</td>
                    <td>{workflow.triggerCount ?? '—'}</td>
                    <td>{formatTime(workflow.updatedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
