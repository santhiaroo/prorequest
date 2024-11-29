import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { getTicketStatusColor } from '@/lib/tickets';
import { mockTicketDetails } from './mock-data';

export function TicketHeader() {
  const { toast } = useToast();
  const ticket = mockTicketDetails;

  const copyTicketId = () => {
    navigator.clipboard.writeText(ticket.id);
    toast({
      description: 'Ticket ID copied to clipboard',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/tickets">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tickets
          </Link>
        </Button>
      </div>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold tracking-tight">
              {ticket.title}
            </h2>
            <Badge className={getTicketStatusColor(ticket.status)}>
              {ticket.status}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Ticket #{ticket.id}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4"
              onClick={copyTicketId}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}