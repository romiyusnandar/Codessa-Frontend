// Decorative page backdrop: soft color blobs. The hero grid is handled by
// InteractiveGrid so the two grids don't overlap at different cell sizes.
export function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/4 top-0 h-[500px] w-[500px] animate-pulse rounded-full bg-secondary-container/30 mix-blend-multiply blur-[100px]" />
      <div className="absolute bottom-1/4 right-0 h-[600px] w-[600px] rounded-full bg-primary-container/10 opacity-50 mix-blend-multiply blur-[120px]" />
    </div>
  );
}
