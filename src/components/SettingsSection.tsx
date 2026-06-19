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
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Settings</h2>

      <div className="mt-4 flex flex-col gap-2 sm:max-w-sm">
        <label className="text-sm font-medium text-slate-700" htmlFor="reviewLanguage">
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
          className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none disabled:opacity-50"
        >
          {languages?.map((language) => (
            <option key={language.code} value={language.code}>
              {language.label}
            </option>
          ))}
        </select>

        {languagesError && (
          <p className="text-sm text-red-600">Gagal memuat daftar bahasa.</p>
        )}

        <div className="mt-2 flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving || isLoadingLanguages}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          {saved && <span className="text-sm text-green-600">Saved!</span>}
          {saveError && <span className="text-sm text-red-600">{saveError}</span>}
        </div>
      </div>
    </section>
  );
}
