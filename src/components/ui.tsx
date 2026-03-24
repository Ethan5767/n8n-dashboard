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
      <div className="sidebar-inner">
        <Link to="/" className="brand">⚡ n8n Dashboard</Link>
        <p className="muted small">A calm operations layer for your automations.</p>
        <nav className="nav">
          {items.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => cn('nav-link', isActive && 'active')}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export function Topbar({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="topbar">
      <div>
        <div className="kicker">Operations</div>
        <h1>{title}</h1>
        {subtitle ? <p className="muted">{subtitle}</p> : null}
      </div>
      <div className="topbar-actions">{actions}</div>
    </div>
  );
}

export function Card({ children, className, style }: PropsWithChildren<{ className?: string; style?: React.CSSProperties }>) {
  return <section className={cn('card', className)} style={style}>{children}</section>;
}

export function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <Card className="stat-card">
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

export function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="section-header">
      <div>
        <h3>{title}</h3>
        {subtitle ? <p className="muted small">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}
