import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api';
import { Badge, Card, StatCard, Topbar } from '../components/ui';
import { executionStatus, formatTime, workflowStatus } from '../lib/utils';

export function HomePage() {
  const { data, isLoading, error } = useQuery({ queryKey: ['dashboard'], queryFn: apiClient.getDashboard });

  if (isLoading) return <div>Loading overview…</div>;
  if (error instanceof Error) return <Card>{error.message}</Card>;
  if (!data) return null;

  const attention = data.executions.filter((e) => ['error', 'failed', 'crashed'].includes((e.status || '').toLowerCase())).slice(0, 6);
  const recentWorkflows = data.workflows.slice(0, 6);

  return (
    <div className="grid">
      <Topbar title="Home" subtitle={`Last updated ${formatTime(data.lastUpdated)}`} />
      <div className="grid grid-4">
        <StatCard label="Total workflows" value={data.metrics.totalWorkflows} />
        <StatCard label="Active workflows" value={data.metrics.activeWorkflows} />
        <StatCard label="Failed executions" value={data.metrics.failedExecutions} hint="Last fetch window" />
        <StatCard label="Success rate" value={`${data.metrics.successRate}%`} />
      </div>
      <div className="grid grid-2">
        <Card>
          <div className="split"><h3>Needs attention</h3><Badge label={attention.length ? 'Attention' : 'Healthy'} /></div>
          <div className="list">
            {attention.length ? attention.map((item) => (
              <div key={String(item.id)} className="row">
                <div>
                  <strong>Execution #{item.id}</strong>
                  <div className="muted small">Workflow {item.workflowId || 'Unknown'} • {formatTime(item.startedAt)}</div>
                </div>
                <Badge label={executionStatus(item)} />
              </div>
            )) : <p className="muted">No failed runs in the latest fetch. Good sign.</p>}
          </div>
        </Card>
        <Card>
          <div className="split"><h3>Workflow snapshot</h3><Badge label={data.metrics.runningExecutions ? 'Running' : 'Stable'} /></div>
          <div className="list">
            {recentWorkflows.map((workflow) => (
              <div key={workflow.id} className="row">
                <div>
                  <strong>{workflow.name}</strong>
                  <div className="muted small">Updated {formatTime(workflow.updatedAt)}</div>
                </div>
                <Badge label={workflowStatus(workflow)} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
