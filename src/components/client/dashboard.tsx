import { ClientStats } from './stats';
import { ActiveTickets } from './active-tickets';
import { ServiceCatalog } from './service-catalog';

export function ClientDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Client Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage your services and track your requests
        </p>
      </div>
      <ClientStats />
      <div className="grid gap-6 md:grid-cols-2">
        <ActiveTickets />
        <ServiceCatalog />
      </div>
    </div>
  );
}