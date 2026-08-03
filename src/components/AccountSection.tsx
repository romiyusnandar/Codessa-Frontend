"use client";

import { logout } from "@/lib/api";
import { AuthMeResponse } from "@/lib/types";

export function AccountSection({ user }: { user: AuthMeResponse }) {
  return (
    <section className="rounded-lg border border-line bg-white p-6 shadow-sm">
      <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">Account</span>
      <h2 className="text-lg font-semibold text-ink">Your account</h2>

      <div className="mt-4 flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user.avatarUrl}
          alt={user.username}
          className="h-12 w-12 rounded-full ring-1 ring-line"
        />
        <div>
          <p className="text-sm font-medium text-ink">{user.username}</p>
          <p className="text-xs text-ink-muted">GitHub ID: {user.githubId}</p>
        </div>
        <span
          className={`ml-auto inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
            user.tokenRevoked ? "bg-rust-soft text-rust" : "bg-moss-soft text-moss"
          }`}
        >
          {user.tokenRevoked ? "Needs reauthorization" : "Connected"}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <p className="text-xs text-ink-muted">Sign out of your Codessa account on this device.</p>
        <button
          onClick={logout}
          className="rounded-md border border-line px-3 py-1.5 text-sm font-medium text-ink-muted transition hover:border-rust/40 hover:text-rust"
        >
          Logout
        </button>
      </div>
    </section>
  );
}
