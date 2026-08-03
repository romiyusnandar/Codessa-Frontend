export type ReviewLanguage = string;

export interface UserSettings {
  reviewLanguage: ReviewLanguage;
}

export interface Language {
  code: string;
  label: string;
}

export interface AuthMeResponse {
  id: string;
  username: string;
  githubId: string;
  avatarUrl: string;
  tokenRevoked: boolean;
  settings: UserSettings;
}

export interface Repository {
  fullName: string;
  owner: string;
  name: string;
  private: boolean;
  defaultBranch: string;
  enabled: boolean;
  installationId: number;
  githubRepoId: string;
  createdAt: string;
}

export interface RepositoriesResponse {
  data: Repository[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export type ReviewStatus = "pending" | "running" | "success" | "failed" | "skipped";

export type ReviewSeverity = "info" | "minor" | "major" | "critical";

export interface ReviewComment {
  filePath: string;
  line: number;
  severity: ReviewSeverity;
  comment: string;
}

export interface Review {
  _id: string;
  repositoryId: string;
  repositoryFullName: string;
  pullNumber: number;
  commitSha: string;
  status: ReviewStatus;
  summary: string;
  comments: ReviewComment[];
  errorMessage?: string;
  promptTokens?: number;
  completionTokens?: number;
  createdAt: string;
  finishedAt?: string;
}
