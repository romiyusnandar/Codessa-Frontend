import useSWR from "swr";
import { apiFetch } from "./api";
import { AuthMeResponse, Language, RepositoriesResponse, Review } from "./types";

const fetcher = <T,>(path: string) => apiFetch<T>(path);

export function useAuthMe() {
  const { data, error, isLoading, mutate } = useSWR<AuthMeResponse>("/auth/me", fetcher, {
    shouldRetryOnError: false,
  });
  return { user: data, error, isLoading, mutate };
}

export function useRepositories(page: number, perPage: number, search: string) {
  const params = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  });
  if (search) params.set("search", search);

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
