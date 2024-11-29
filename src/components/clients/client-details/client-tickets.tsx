import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockClientDetails } from './mock-data';
import { getTicketStatusColor, getTicketPriorityColor } from '@/lib/tickets';
import { formatDistanceToNow } from '@/lib/date';

export function ClientTickets() {
  const { tickets } = mockClientDetails;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button asChild>
          <Link to="/tickets/new">
            <Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </Link>
        </Button>
      </div>

      {tickets.map((ticket) => (
        <Card key={ticket.id} className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Link
                to={`/tickets/${ticket.id}`}
                className="font-medium hover:underline"
              >
                {ticket.title}
              </Link>
              <div className="flex items-center gap-2">
                <Badge className={getTicketStatusColor(ticket.status)}>
                  {ticket.status}
                </Badge>
                <Badge variant="outline" className={getTicketPriorityColor(ticket.priority)}>
                  {ticket.priority}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Created {formatDistanceToNow(ticket.createdAt)}
                </span>
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/tickets/${ticket.id}`}>View Details</Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}