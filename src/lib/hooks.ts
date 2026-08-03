import useSWR, { mutate as globalMutate } from "swr";
import { apiFetch } from "./api";
import { AuthMeResponse, Language, RepositoriesResponse, Review } from "./types";

const fetcher = <T,>(path: string) => apiFetch<T>(path);

// Different pages query /repositories with different params (page, search,
// enabled filter), so each gets its own SWR cache key. Revalidate all of
// them together whenever a repo is enabled/disabled from anywhere.
export function revalidateRepositories() {
  return globalMutate(
    (key) => typeof key === "string" && key.startsWith("/repositories"),
    undefined,
    { revalidate: true },
  );
}

export function useAuthMe() {
  const { data, error, isLoading, mutate } = useSWR<AuthMeResponse>("/auth/me", fetcher, {
    shouldRetryOnError: false,
  });
  return { user: data, error, isLoading, mutate };
}

export function useRepositories(page: number, perPage: number, search: string, enabled?: boolean) {
  const params = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  });
  if (search) params.set("search", search);
  if (enabled !== undefined) params.set("enabled", String(enabled));

  const { data, error, isLoading, mutate } = useSWR<RepositoriesResponse>(
    `/repositories?${params.toString()}`,
    fetcher,
  );
  return { repositories: data, error, isLoading, mutate };
}

export function useReviews(repo?: string) {
  const params = repo ? `?repo=${encodeURIComponent(repo)}` : "";
  const { data, error, isLoading, mutate } = useSWR<Review[]>(`/reviews${params}`, fetcher);
  return { reviews: data, error, isLoading, mutate };
}

export function useLanguages() {
  const { data, error, isLoading } = useSWR<Language[]>("/auth/languages", fetcher);
  return { languages: data, error, isLoading };
}
