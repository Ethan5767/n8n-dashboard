import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api';
import { Badge, Card, SectionHeader, StatCard, Topbar } from '../components/ui';
import { executionStatus, formatTime, workflowStatus } from '../lib/utils';

export function HomePage() {
  const { data, isLoading, error } = useQuery({ queryKey: ['dashboard'], queryFn: apiClient.getDashboard, refetchInterval: 60000 });

  if (isLoading) return <div>Loading overview…</div>;
  if (error instanceof Error) return <Card>{error.message}</Card>;
  if (!data) return null;

  const attention = data.executions.filter((e) => ['error', 'failed', 'crashed'].includes((e.status || '').toLowerCase())).slice(0, 5);
  const running = data.executions.filter((e) => (e.status || '').toLowerCase() === 'running').slice(0, 5);
  const activeWorkflows = data.workflows.filter((w) => w.active).slice(0, 6);

  return (
    <div className="grid">
      <Topbar title="Home" subtitle={`Last synced ${formatTime(data.lastUpdated)}`} />
      <div className="grid grid-4">
        <StatCard label="Workflows" value={data.metrics.totalWorkflows} hint={`${data.metrics.activeWorkflows} active`} />
        <StatCard label="Failed runs" value={data.metrics.failedExecutions} hint="Current fetch window" />
        <StatCard label="Running now" value={data.metrics.runningExecutions} hint={`${data.metrics.waitingExecutions} waiting`} />
        <StatCard label="Success rate" value={`${data.metrics.successRate}%`} hint="Derived from recent executions" />
      </div>
      <div className="grid grid-2">
        <Card>
          <SectionHeader title="Needs attention" subtitle="Recent failures that likely need triage." action={<Badge label={attention.length ? 'Attention' : 'Healthy'} />} />
          <div className="stack">
            {attention.length ? attention.map((item) => (
              <div key={String(item.id)} className="surface">
                <div className="split">
                  <div>
                    <strong>Execution #{item.id}</strong>
                    <div className="muted small">Workflow {item.workflowId || 'Unknown'} • {formatTime(item.startedAt)}</div>
                  </div>
                  <Badge label={executionStatus(item)} />
                </div>
              </div>
            )) : <p className="muted">No recent failures surfaced in the latest fetch.</p>}
          </div>
        </Card>
        <Card>
          <SectionHeader title="Active workflows" subtitle="A quick view of currently enabled automations." action={<Badge label="Live" />} />
          <div className="stack">
            {activeWorkflows.map((workflow) => (
              <div key={workflow.id} className="surface">
                <div className="split">
                  <div>
                    <strong>{workflow.name}</strong>
                    <div className="muted small">Updated {formatTime(workflow.updatedAt)}</div>
                  </div>
                  <Badge label={workflowStatus(workflow)} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="grid grid-2">
        <Card>
          <SectionHeader title="Running now" subtitle="Useful for checking what is currently in flight." />
          <div className="list">
            {running.length ? running.map((item) => (
              <div key={String(item.id)} className="row">
                <div>
                  <strong>Execution #{item.id}</strong>
                  <div className="muted small">Workflow {item.workflowId || 'Unknown'}</div>
                </div>
                <Badge label={executionStatus(item)} />
              </div>
            )) : <p className="muted">No executions are currently running.</p>}
          </div>
        </Card>
        <Card>
          <SectionHeader title="State summary" subtitle="A calm snapshot of the instance right now." />
          <div className="list">
            <div className="row"><span>Archived workflows</span><strong>{data.metrics.archivedWorkflows}</strong></div>
            <div className="row"><span>Total executions fetched</span><strong>{data.metrics.totalExecutions}</strong></div>
            <div className="row"><span>Waiting executions</span><strong>{data.metrics.waitingExecutions}</strong></div>
            <div className="row"><span>Last refresh</span><strong>{formatTime(data.lastUpdated)}</strong></div>
          </div>
        </Card>
      </div>
    </div>
  );
}
