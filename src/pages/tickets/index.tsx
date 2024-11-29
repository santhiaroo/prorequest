import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TicketList } from '@/components/tickets/ticket-list';
import { TicketFilters } from '@/components/tickets/ticket-filters';
import { CreateTicketDialog } from '@/components/tickets/create-ticket-dialog';

export function TicketsPage() {
  const [showCreateTicket, setShowCreateTicket] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
        <Button onClick={() => setShowCreateTicket(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Ticket
        </Button>
      </div>
      <TicketFilters />
      <TicketList />

      <CreateTicketDialog
        open={showCreateTicket}
        onOpenChange={setShowCreateTicket}
      />
    </div>
  );
}