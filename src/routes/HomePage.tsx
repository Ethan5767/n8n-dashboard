import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api';
import { Badge, Button, Card, SectionHeader, StatCard, Topbar } from '../components/ui';
import { executionStatus, formatTime, workflowStatus } from '../lib/utils';

export function HomePage() {
  const { data, isLoading, error } = useQuery({ queryKey: ['dashboard'], queryFn: apiClient.getDashboard, refetchInterval: 60000 });

  if (isLoading) return <div>Loading overview…</div>;
  if (error instanceof Error) return <Card>{error.message}</Card>;
  if (!data) return null;

  const attention = data.executions.filter((e) => ['error', 'failed', 'crashed'].includes((e.status || '').toLowerCase())).slice(0, 4);
  const recentWorkflows = data.workflows.slice(0, 3);

  return (
    <div className="grid">
      <Topbar
        title="Dashboard Overview"
        subtitle="System status and execution metrics for your n8n instance."
        actions={
          <div className="actions">
            <Button>Last 24 Hours</Button>
            <Button className="primary">Refresh Data</Button>
          </div>
        }
      />

      <div className="hero-strip">
        <div>
          <strong>Engine online</strong>
          <div className="muted small">A local-first monitoring view with fast operational drill-downs.</div>
        </div>
        <Badge label="Connected" />
      </div>

      <div className="grid grid-4">
        <StatCard label="Success Rate" value={`${data.metrics.successRate}%`} hint="Based on fetched executions" />
        <StatCard label="Total Executions" value={data.metrics.totalExecutions} hint={`${data.metrics.failedExecutions} failed`} />
        <StatCard label="Active Workflows" value={data.metrics.activeWorkflows} hint={`${data.metrics.totalWorkflows} total`} />
        <StatCard label="Running Now" value={data.metrics.runningExecutions} hint={`${data.metrics.waitingExecutions} waiting`} />
      </div>

      <div className="grid grid-2">
        <Card>
          <SectionHeader title="Recent Workflows" subtitle="A quick scan of what matters most right now." action={<a className="button" href="/workflows">View All</a>} />
          <div className="stack">
            {recentWorkflows.map((workflow) => (
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
        <Card>
          <SectionHeader title="Needs Attention" subtitle="Recent failures and unhealthy signals worth checking." />
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
      </div>
    </div>
  );
}
