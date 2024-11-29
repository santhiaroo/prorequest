import { CircleDollarSign, Clock, TicketCheck } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';

export function ClientStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatsCard
        title="Active Services"
        value="3"
        icon={<CircleDollarSign className="h-4 w-4 text-muted-foreground" />}
        description="2 subscriptions, 1 one-time"
      />
      <StatsCard
        title="Open Tickets"
        value="4"
        icon={<TicketCheck className="h-4 w-4 text-muted-foreground" />}
        description="2 require your attention"
      />
      <StatsCard
        title="Average Response Time"
        value="2h 15m"
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        description="Last 30 days"
      />
    </div>
  );
}