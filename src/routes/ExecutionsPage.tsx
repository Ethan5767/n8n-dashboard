import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api';
import { Badge, Card, Input, Topbar } from '../components/ui';
import { executionStatus, formatTime } from '../lib/utils';

export function ExecutionsPage() {
  const { data = [], isLoading, error } = useQuery({ queryKey: ['executions'], queryFn: apiClient.getExecutions });
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => data.filter((e) => `${e.id}`.includes(query) || `${e.workflowId || ''}`.includes(query)), [data, query]);

  return (
    <div className="grid">
      <Topbar title="Executions" subtitle="Fast triage for recent runs, failures, and waiting states." />
      <Card>
        <div className="toolbar">
          <Input placeholder="Search by execution or workflow id" value={query} onChange={(e) => setQuery(e.target.value)} />
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
                </tr>
              </thead>
              <tbody>
                {filtered.map((execution) => (
                  <tr key={String(execution.id)}>
                    <td>{execution.id}</td>
                    <td>{execution.workflowId || '—'}</td>
                    <td><Badge label={executionStatus(execution)} /></td>
                    <td>{execution.mode || '—'}</td>
                    <td>{formatTime(execution.startedAt)}</td>
                    <td>{formatTime(execution.stoppedAt)}</td>
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
