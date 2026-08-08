import { ReviewStatusBadge } from "@/components/dashboard/ReviewStatusBadge";
import { ReviewVerdictBadge } from "@/components/dashboard/ReviewVerdictBadge";
import type { Review } from "@/lib/types";

// Once Codessa's own review process has succeeded, what the user actually
// cares about is the verdict on the code (passed / issues found / error),
// not the fact that the system itself didn't crash — so the verdict badge
// takes over from the status badge at that point. While still pending,
// running, failed, or skipped, there's no verdict yet, so status stays.
export function ReviewOutcomeBadge({ review }: { review: Review }) {
  if (review.status === "success" && review.verdict) {
    return <ReviewVerdictBadge verdict={review.verdict} />;
  }
  return <ReviewStatusBadge status={review.status} errorMessage={review.errorMessage} />;
}
