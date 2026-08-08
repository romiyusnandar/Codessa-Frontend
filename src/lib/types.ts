export type ReviewLanguage = string;

export type ReviewTone = "friendly" | "strict" | "concise";

export interface UserSettings {
  reviewLanguage: ReviewLanguage;
  // Optional: accounts created before these fields existed may not have them set.
  tone?: ReviewTone;
  customInstructions?: string;
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

// The verdict on the CODE itself (only meaningful once status === "success"),
// as opposed to `status` which just tracks whether Codessa's own review
// process completed. A critical bug found still leaves status "success".
export type ReviewVerdict = "passed" | "issues_found" | "error";

export type ReviewSeverity = "info" | "minor" | "major" | "critical";

export interface ReviewComment {
  filePath: string;
  line: number;
  severity: ReviewSeverity;
  comment: string;
}

export interface ReviewStats {
  totalPullRequests: number;
  totalComments: number;
  totalReviewTimeMs: number;
}

export interface Review {
  _id: string;
  repositoryId: string;
  repositoryFullName: string;
  repositoryName: string;
  pullNumber: number;
  commitSha: string;
  shortSha: string;
  commitMessage: string;
  additions: number;
  deletions: number;
  status: ReviewStatus;
  // Optional: only set once the review completes, and absent on reviews
  // created before the backend started returning it.
  verdict?: ReviewVerdict;
  summary: string;
  comments: ReviewComment[];
  errorMessage?: string;
  promptTokens?: number;
  completionTokens?: number;
  createdAt: string;
  finishedAt?: string;
}

export interface ReviewsResponse {
  data: Review[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}
