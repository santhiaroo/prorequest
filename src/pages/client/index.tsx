import { ClientDashboard } from '@/components/client/dashboard';
import { ClientHeader } from '@/components/client/header';

export function ClientPortalPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ClientHeader />
      <main className="flex-1">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <ClientDashboard />
        </div>
      </main>
    </div>
  );
}