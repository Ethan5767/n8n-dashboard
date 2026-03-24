import { useEffect, useState } from 'react';
import { Card, Input, Topbar } from '../components/ui';
import type { ThemeMode } from '../lib/types';

export function SettingsPage() {
  const [theme, setTheme] = useState<ThemeMode>((localStorage.getItem('theme') as ThemeMode) || 'system');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
  }, [theme]);

  return (
    <div className="grid">
      <Topbar title="Settings" subtitle="Minimal local-first settings. Keep credentials server-side in .env.local." />
      <Card>
        <div className="grid grid-2">
          <div>
            <label className="muted small">Theme</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value as ThemeMode)}>
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div>
            <label className="muted small">Credential mode</label>
            <Input disabled value="Server-side only via .env.local" />
          </div>
        </div>
      </Card>
    </div>
  );
}
