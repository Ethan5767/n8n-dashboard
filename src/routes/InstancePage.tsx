import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api';
import { Badge, Card, Topbar } from '../components/ui';
import { formatTime } from '../lib/utils';

export function InstancePage() {
  const status = useQuery({ queryKey: ['connection-status'], queryFn: apiClient.getConnectionStatus });

  return (
    <div className="grid">
      <Topbar title="Instance" subtitle="Connection, readiness, and quick diagnostics." />
      <Card>
        {status.data ? (
          <div className="list">
            <div className="row"><span>Base URL</span><strong>{status.data.baseUrl}</strong></div>
            <div className="row"><span>Status</span><Badge label={status.data.ok ? 'Connected' : 'Disconnected'} /></div>
            <div className="row"><span>Timestamp</span><strong>{formatTime(status.data.timestamp)}</strong></div>
            <div className="row"><span>Message</span><strong>{status.data.message}</strong></div>
          </div>
        ) : <p>Loading instance data…</p>}
      </Card>
    </div>
  );
}
