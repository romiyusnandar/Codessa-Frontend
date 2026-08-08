"use client";

import { useState } from "react";
import { apiFetch, ApiError } from "@/lib/api";
import { useLanguages } from "@/lib/hooks";
import { AuthMeResponse } from "@/lib/types";

export function SettingsSection({
  user,
  mutateUser,
}: {
  user: AuthMeResponse;
  mutateUser: () => Promise<unknown>;
}) {
  const { languages, isLoading: isLoadingLanguages, error: languagesError } = useLanguages();
  const [reviewLanguage, setReviewLanguage] = useState(user.settings.reviewLanguage);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setSaveError(null);
    try {
      await apiFetch("/auth/settings", {
        method: "PATCH",
        body: JSON.stringify({ reviewLanguage }),
      });
      await mutateUser();
      setSaved(true);
    } catch (err) {
      setSaveError(err instanceof ApiError ? err.message : "Gagal menyimpan settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-xl border border-line bg-surface p-6 shadow-sm">
      <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">Review</span>
      <h2 className="text-lg font-semibold text-ink">Review output</h2>
      <p className="mt-1 text-sm text-ink-muted">
        Bahasa penulisan hasil review. Berlaku untuk review berikutnya.
      </p>

      <div className="mt-4 flex flex-col gap-2 sm:max-w-sm">
        <label className="text-sm font-medium text-ink" htmlFor="reviewLanguage">
          Review output language
        </label>
        <select
          id="reviewLanguage"
          value={reviewLanguage}
          onChange={(e) => {
            setReviewLanguage(e.target.value);
            setSaved(false);
            setSaveError(null);
          }}
          disabled={isLoadingLanguages}
          className="rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10 disabled:opacity-50"
        >
          {languages?.map((language) => (
            <option key={language.code} value={language.code}>
              {language.label}
            </option>
          ))}
        </select>

        {languagesError && (
          <p className="text-sm text-rust">Gagal memuat daftar bahasa.</p>
        )}

        <div className="mt-2 flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving || isLoadingLanguages}
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/90 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          {saved && <span className="text-sm text-moss">Saved!</span>}
          {saveError && <span className="text-sm text-rust">{saveError}</span>}
        </div>
      </div>
    </section>
  );
}
