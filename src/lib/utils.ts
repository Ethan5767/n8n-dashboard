import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import type { Execution, Workflow } from './types';

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function formatTime(value?: string) {
  if (!value) return '—';
  try {
    return `${formatDistanceToNowStrict(parseISO(value))} ago`;
  } catch {
    return value;
  }
}

export function workflowStatus(workflow: Workflow) {
  if (workflow.isArchived) return 'Archived';
  if (workflow.active) return 'Active';
  return 'Inactive';
}

export function executionStatus(execution: Execution) {
  return execution.status || (execution.finished ? 'success' : 'unknown');
}

export function statusTone(status: string) {
  const value = status.toLowerCase();
  if (['success', 'active', 'connected', 'ready'].includes(value)) return 'success';
  if (['error', 'failed', 'crashed'].includes(value)) return 'danger';
  if (['running'].includes(value)) return 'info';
  if (['waiting', 'queued'].includes(value)) return 'warning';
  return 'muted';
}
