import { useQuery } from '@tanstack/react-query';
import { Navigate, Route, Routes } from 'react-router-dom';
import { apiClient } from './lib/api';
import { Shell, Sidebar } from './components/ui';
import { ConnectPage } from './routes/ConnectPage';
import { HomePage } from './routes/HomePage';
import { WorkflowsPage } from './routes/WorkflowsPage';
import { ExecutionsPage } from './routes/ExecutionsPage';
import { InstancePage } from './routes/InstancePage';
import { SettingsPage } from './routes/SettingsPage';

export default function App() {
  const status = useQuery({ queryKey: ['connection-status'], queryFn: apiClient.getConnectionStatus, retry: false });

  if (status.isLoading) {
    return <div className="connect-card card">Loading dashboard…</div>;
  }

  if (!status.data?.ok) {
    return <ConnectPage error={status.error instanceof Error ? status.error.message : status.data?.message} />;
  }

  return (
    <Shell>
      <Sidebar />
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workflows" element={<WorkflowsPage />} />
          <Route path="/executions" element={<ExecutionsPage />} />
          <Route path="/instance" element={<InstancePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Shell>
  );
}
