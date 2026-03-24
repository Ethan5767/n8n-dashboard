import { Link, NavLink } from 'react-router-dom';
import { cn, statusTone } from '../lib/utils';
import type { PropsWithChildren } from 'react';

export function Shell({ children }: PropsWithChildren) {
  return <div className="shell">{children}</div>;
}

export function Sidebar() {
  const items = [
    ['/', 'Home'],
    ['/workflows', 'Workflows'],
    ['/executions', 'Executions'],
    ['/instance', 'Instance'],
    ['/settings', 'Settings'],
  ];

  return (
    <aside className="sidebar">
      <Link to="/" className="brand">n8n Dashboard</Link>
      <p className="muted small">Local-first operations view for your n8n instance.</p>
      <nav className="nav">
        {items.map(([to, label]) => (
          <NavLink key={to} to={to} className={({ isActive }) => cn('nav-link', isActive && 'active')}>
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export function Topbar({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="topbar">
      <div>
        <h1>{title}</h1>
        {subtitle ? <p className="muted">{subtitle}</p> : null}
      </div>
      <div className="topbar-actions">{actions}</div>
    </div>
  );
}

export function Card({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <section className={cn('card', className)}>{children}</section>;
}

export function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <Card>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {hint ? <div className="stat-hint">{hint}</div> : null}
    </Card>
  );
}

export function Badge({ label }: { label: string }) {
  return <span className={cn('badge', statusTone(label))}>{label}</span>;
}

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={cn('button', props.className)} />;
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn('input', props.className)} />;
}
