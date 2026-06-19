"use client";

import { useSearchParams } from "next/navigation";
import { loginWithGithub } from "@/lib/api";

export function InstallToast() {
  const searchParams = useSearchParams();
  const installed = searchParams.get("installed");
  const installError = searchParams.get("install_error");

  if (installed === "1") {
    return (
      <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
        GitHub App berhasil diinstall. Repository kamu sekarang bisa diaktifkan untuk auto-review.
      </div>
    );
  }

  if (installError) {
    return (
      <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        Install GitHub App gagal: {installError}
      </div>
    );
  }

  return null;
}

export function TokenRevokedBanner({ tokenRevoked }: { tokenRevoked: boolean }) {
  if (!tokenRevoked) return null;

  return (
    <div className="mb-6 flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      <span>GitHub access revoked, please re-login.</span>
      <button
        onClick={loginWithGithub}
        className="rounded-md bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700"
      >
        Login again
      </button>
    </div>
  );
}
