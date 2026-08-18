"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { apiFetch, ApiError, logout } from "@/lib/api";
import { useAuthMe, useLanguages } from "@/lib/hooks";
import { Icon } from "@/components/Icon";
import type { ReviewTone } from "@/lib/types";

const MAX_INSTRUCTIONS_LENGTH = 4000;

const toneOptions: { value: ReviewTone; labelKey: string }[] = [
  { value: "friendly", labelKey: "friendly" },
  { value: "strict", labelKey: "strict" },
  { value: "concise", labelKey: "concise" },
];

export function SettingsView() {
  const locale = useLocale();
  const t = useTranslations("dashboard.settings");
  const { user, isLoading, mutate } = useAuthMe();

  const withLocale = (path: string) => `/${locale}${path}`;

  if (isLoading || !user) {
    return (
      <div className="px-6 py-8 sm:px-10 lg:px-12">
        <p className="text-sm text-on-surface-variant">{t("loading")}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="pointer-events-none fixed inset-0 -z-10 text-on-surface opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="flex flex-col gap-8 px-6 py-8 sm:px-10 lg:px-12">
        <div>
          <h1 className="font-display text-[32px] font-semibold leading-tight tracking-tight text-on-surface">
            {t("title")}
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
          {/* Account */}
          <section className="flex flex-col items-center gap-4 rounded-xl bg-surface-container p-6 text-center shadow-sm lg:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatarUrl}
              alt={user.username}
              className="h-20 w-20 rounded-full ring-2 ring-outline-variant/30"
            />
            <div>
              <p className="text-base font-semibold text-on-surface">{user.username}</p>
              <p className="mt-0.5 font-mono text-xs text-on-surface-variant">
                {t("githubId")}: {user.githubId}
              </p>
            </div>
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                user.tokenRevoked
                  ? "bg-error-container/20 text-error"
                  : "bg-secondary text-on-secondary"
              }`}
            >
              <Icon
                name={user.tokenRevoked ? "error" : "check_circle"}
                filled
                className="text-[14px]"
              />
              {user.tokenRevoked ? t("needsReauth") : t("connected")}
            </span>

            <div className="mt-2 w-full border-t border-outline-variant/10 pt-4">
              <p className="text-xs text-on-surface-variant">
                {t("account.signOutDesc")}
              </p>
              <button
                onClick={logout}
                className="mt-3 w-full rounded-md border border-outline-variant/30 px-3 py-2 text-sm font-medium text-on-surface-variant transition hover:border-error/40 hover:text-error"
              >
                {t("logout")}
              </button>
            </div>
          </section>

          <ReviewPreferencesSection
            reviewLanguage={user.settings.reviewLanguage}
            tone={user.settings.tone ?? "friendly"}
            customInstructions={user.settings.customInstructions ?? ""}
            mutateUser={mutate}
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
}

function ReviewPreferencesSection({
  reviewLanguage: initialLanguage,
  tone: initialTone,
  customInstructions: initialInstructions,
  mutateUser,
  locale,
}: {
  reviewLanguage: string;
  tone: ReviewTone;
  customInstructions: string;
  mutateUser: () => Promise<unknown>;
  locale: string;
}) {
  const t = useTranslations("dashboard.settings");
  const { languages, isLoading: isLoadingLanguages, error: languagesError } = useLanguages();
  const [reviewLanguage, setReviewLanguage] = useState(initialLanguage);
  const [tone, setTone] = useState<ReviewTone>(initialTone);
  const [customInstructions, setCustomInstructions] = useState(initialInstructions);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  function clearStatus() {
    setSaved(false);
    setSaveError(null);
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setSaveError(null);
    try {
      await apiFetch("/auth/settings", {
        method: "PATCH",
        body: JSON.stringify({ reviewLanguage, tone, customInstructions }),
      });
      await mutateUser();
      setSaved(true);
    } catch (err) {
      setSaveError(err instanceof ApiError ? err.message : t("failedToSave"));
    } finally {
      setSaving(false);
    }
  }

  const withLocale = (path: string) => `/${locale}${path}`;

  return (
    <section className="rounded-xl bg-surface-container p-6 shadow-sm lg:col-span-2">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">
        {t("review.label")}
      </span>
      <h2 className="mt-1 font-display text-lg font-semibold text-on-surface">
        {t("review.title")}
      </h2>
      <p className="mt-1 text-sm text-on-surface-variant">
        {t("review.subtitle")}
      </p>

      <div className="mt-6 flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Review output language */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-on-surface" htmlFor="reviewLanguage">
              {t("review.language")}
            </label>
            <select
              id="reviewLanguage"
              value={reviewLanguage}
              onChange={(e) => {
                setReviewLanguage(e.target.value);
                clearStatus();
              }}
              disabled={isLoadingLanguages}
              className="rounded-lg border border-outline-variant/30 bg-surface-container-highest px-3 py-2.5 text-sm text-on-surface shadow-inner focus:outline-none focus:ring-1 focus:ring-secondary disabled:opacity-50"
            >
              {languages?.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.label}
                </option>
              ))}
            </select>
            {languagesError && <p className="text-sm text-error">{t("failedToLoadLanguages")}</p>}
          </div>

          {/* Tone */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-on-surface" htmlFor="tone">
              {t("review.tone")}
            </label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => {
                setTone(e.target.value as ReviewTone);
                clearStatus();
              }}
              className="rounded-lg border border-outline-variant/30 bg-surface-container-highest px-3 py-2.5 text-sm text-on-surface shadow-inner focus:outline-none focus:ring-1 focus:ring-secondary"
            >
              {toneOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {t(`review.tones.${option.labelKey}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Custom instructions */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-on-surface" htmlFor="customInstructions">
            {t("review.customInstructions")}
          </label>
          <textarea
            id="customInstructions"
            value={customInstructions}
            onChange={(e) => {
              setCustomInstructions(e.target.value.slice(0, MAX_INSTRUCTIONS_LENGTH));
              clearStatus();
            }}
            maxLength={MAX_INSTRUCTIONS_LENGTH}
            rows={6}
            placeholder={t("review.instructionsPlaceholder")}
            className="resize-y rounded-lg border border-outline-variant/30 bg-surface-container-highest px-3 py-2.5 text-sm text-on-surface shadow-inner placeholder:text-on-surface-variant focus:outline-none focus:ring-1 focus:ring-secondary"
          />
          <span className="self-end text-xs text-on-surface-variant">
            {customInstructions.length}/{MAX_INSTRUCTIONS_LENGTH}
          </span>
        </div>

        <div className="flex items-center gap-3 border-t border-outline-variant/10 pt-5">
          <button
            onClick={handleSave}
            disabled={saving || isLoadingLanguages}
            className="rounded-lg bg-secondary px-5 py-2.5 text-sm font-semibold text-on-secondary shadow-sm transition hover:opacity-90 disabled:opacity-50"
          >
            {saving ? t("saving") : t("save")}
          </button>
          {saved && <span className="text-sm text-secondary">{t("saved")}</span>}
          {saveError && <span className="text-sm text-error">{saveError}</span>}
        </div>
      </div>
    </section>
  );
}
