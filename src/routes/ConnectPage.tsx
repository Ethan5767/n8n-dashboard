import { useState } from 'react';
import { Button, Card, Input } from '../components/ui';
import { apiClient } from '../lib/api';

export function ConnectPage({ error }: { error?: string }) {
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState<string | null>(error ?? null);

  async function handleTest() {
    try {
      setTesting(true);
      const res = await apiClient.testConnection();
      setMessage(res.message);
      window.location.reload();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Connection failed');
    } finally {
      setTesting(false);
    }
  }

  return (
    <div className="connect-card">
      <Card>
        <div className="kicker">n8n Dashboard</div>
        <h1 style={{ marginTop: 8 }}>Connect your n8n instance</h1>
        <p className="muted">This app expects a local server-side config with only two values: your n8n URL and API key. Put them in <span className="code">.env.local</span>, then test the connection.</p>
        <div className="grid" style={{ marginTop: 20 }}>
          <div>
            <label className="muted small">N8N_BASE_URL</label>
            <Input disabled value="Loaded from .env.local on the server" />
          </div>
          <div>
            <label className="muted small">N8N_API_KEY</label>
            <Input disabled value="Kept server-side only" />
          </div>
          {message ? <Card><strong>Status:</strong> {message}</Card> : null}
          <div className="split">
            <p className="muted small">Example base URL: <span className="code">http://localhost:5678</span></p>
            <Button className="primary" onClick={handleTest} disabled={testing}>{testing ? 'Testing…' : 'Test connection'}</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
