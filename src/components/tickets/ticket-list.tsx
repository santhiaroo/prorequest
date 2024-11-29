import { TicketCard } from './ticket-card';
import { TicketListItem } from './ticket-list-item';
import { mockTickets } from './mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

export function TicketList() {
  return (
    <Tabs defaultValue="grid" className="space-y-4">
      <TabsList>
        <TabsTrigger value="grid">Grid</TabsTrigger>
        <TabsTrigger value="list">List</TabsTrigger>
      </TabsList>
      <TabsContent value="grid" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockTickets.map((ticket) => (
            <Link key={ticket.id} to={`/tickets/${ticket.id}`} className="block">
              <TicketCard ticket={ticket} />
            </Link>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="list">
        <div className="rounded-md border">
          {mockTickets.map((ticket) => (
            <Link key={ticket.id} to={`/tickets/${ticket.id}`} className="block">
              <TicketListItem ticket={ticket} />
            </Link>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}