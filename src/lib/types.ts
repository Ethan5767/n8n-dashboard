export type ThemeMode = 'light' | 'dark' | 'system';

export type Workflow = {
  id: string;
  name: string;
  active: boolean;
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
  triggerCount?: number;
  tags?: Array<{ id: string; name: string }>;
};

export type Execution = {
  id: string | number;
  workflowId?: string;
  status?: string;
  mode?: string;
  startedAt?: string;
  stoppedAt?: string;
  waitTill?: string;
  finished?: boolean;
  customData?: Record<string, unknown>;
};

export type Metrics = {
  totalWorkflows: number;
  activeWorkflows: number;
  archivedWorkflows: number;
  totalExecutions: number;
  failedExecutions: number;
  runningExecutions: number;
  waitingExecutions: number;
  successRate: number;
};

export type DashboardData = {
  workflows: Workflow[];
  executions: Execution[];
  metrics: Metrics;
  lastUpdated: string;
};

export type ConnectionStatus = {
  ok: boolean;
  baseUrl: string;
  message: string;
  timestamp: string;
};
