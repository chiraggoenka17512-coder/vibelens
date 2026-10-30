export interface CodebaseFunction {
  id: string;
  name: string;
  astFingerprint: string;
  lines: number;
  reachability: "reachable" | "unreachable" | "likely" | "unknown";
  isVulnerable?: boolean;
  cves?: string[];
}

export interface CodebaseNodeMetrics {
  lines: number;
  complexity: number;
  duplication: number;
  reachableCVEs: number;
  totalCVEs: number;
  tests: "pass" | "fail" | "none";
  errors?: number;
  hasBuildFailure?: boolean;
  todosCount?: number;
  isUnfinishedBranch?: boolean;
  hasActiveSession?: boolean;
  isDeadCode?: boolean;
  reachability: "reachable" | "unreachable" | "likely" | "unknown";
}

export interface CodebaseNode {
  id: string;
  name: string;
  path: string;
  type: "file" | "function";
  parentPath?: string;
  metrics: CodebaseNodeMetrics;
  astFingerprint?: string;
  functions?: CodebaseFunction[];
}

export interface CodebaseEdge {
  id: string;
  source: string;
  target: string;
  type: "import" | "call";
  isEntryPath?: boolean;
}

export interface Pin {
  id: string;
  filePath: string;
  functionFingerprint?: string;
  title: string;
  comment: string;
  author: string;
  createdAt: string;
  orphaned?: boolean;
}

export interface ScanResult {
  repo: string;
  timestamp: string;
  nodes: CodebaseNode[];
  edges: CodebaseEdge[];
  pins: Pin[];
}
