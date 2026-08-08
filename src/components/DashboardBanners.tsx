"use client";

import { useSearchParams } from "next/navigation";
import { loginWithGithub } from "@/lib/api";

export function InstallToast() {
  const searchParams = useSearchParams();
  const installed = searchParams.get("installed");
  const installError = searchParams.get("install_error");

  if (installed === "1") {
    return (
      <div className="mx-6 mt-6 rounded-lg border border-moss/25 bg-moss-soft px-4 py-3 text-sm text-moss sm:mx-10 lg:mx-12">
        GitHub App berhasil diinstall. Repository kamu sekarang bisa diaktifkan untuk auto-review.
      </div>
    );
  }

  if (installError) {
    return (
      <div className="mx-6 mt-6 rounded-lg border border-rust/25 bg-rust-soft px-4 py-3 text-sm text-rust sm:mx-10 lg:mx-12">
        Install GitHub App gagal: {installError}
      </div>
    );
  }

  return null;
}

export function TokenRevokedBanner({ tokenRevoked }: { tokenRevoked: boolean }) {
  if (!tokenRevoked) return null;

  return (
    <div className="mx-6 mt-6 flex items-center justify-between rounded-lg border border-amber/25 bg-amber-soft px-4 py-3 text-sm text-amber sm:mx-10 lg:mx-12">
      <span>GitHub access revoked, please re-login.</span>
      <button
        onClick={loginWithGithub}
        className="rounded-md bg-amber px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-amber/90"
      >
        Login again
      </button>
    </div>
  );
}
