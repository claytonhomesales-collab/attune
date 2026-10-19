import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-foam">
      <div className="climate-wave atelier-grid pointer-events-none fixed inset-0 opacity-75" aria-hidden />
      <div className="relative z-10 flex min-h-full flex-1 flex-col">
        <SiteHeader compact />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </div>
    </div>
  );
}
