import { DashboardSidebarContent } from "@/components/dashboard/DashboardSidebarContent";
import { MobileDrawer, type useMobileDrawer } from "@/components/MobileDrawer";

export function DashboardSidebar({ drawer }: { drawer: ReturnType<typeof useMobileDrawer> }) {
  return (
    <>
      <aside className="fixed left-0 top-0 z-40 hidden h-full w-72 flex-col border-r border-outline-variant/30 bg-surface-container-lowest md:flex">
        <DashboardSidebarContent />
      </aside>

      <MobileDrawer
        mounted={drawer.mounted}
        open={drawer.open}
        onClose={drawer.closeDrawer}
        title="Codessa"
      >
        <DashboardSidebarContent onNavigate={drawer.closeDrawer} />
      </MobileDrawer>
    </>
  );
}
