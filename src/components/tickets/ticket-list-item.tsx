import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Ticket } from '@/types';
import { formatDistanceToNow } from '@/lib/date';
import { getTicketStatusColor, getTicketPriorityColor } from '@/lib/tickets';
import { Eye } from 'lucide-react';

interface TicketListItemProps {
  ticket: Ticket & {
    clientName: string;
    clientCompany: string;
    dueDate: string;
    assignedTeam: Array<{
      id: string;
      name: string;
      avatar: string;
      initials: string;
      role: string;
    }>;
  };
}

export function TicketListItem({ ticket }: TicketListItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-accent/50 transition-colors">
      <div className="grid grid-cols-[1fr,2fr,2fr,2fr,1fr,1fr] gap-4 flex-1 items-center">
        <div className="text-sm">#{ticket.id}</div>
        <div>
          <div className="font-medium">{ticket.title}</div>
          <div className="text-sm text-muted-foreground">{ticket.clientName}</div>
        </div>
        <div>
          <div className="text-sm">{ticket.clientCompany}</div>
          <div className="flex -space-x-2 mt-1">
            {ticket.assignedTeam.map((member) => (
              <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
        <div className="text-sm">{ticket.dueDate}</div>
        <div>
          <Badge variant="outline" className={getTicketPriorityColor(ticket.priority)}>
            {ticket.priority}
          </Badge>
        </div>
        <div>
          <Badge className={getTicketStatusColor(ticket.status)}>
            {ticket.status}
          </Badge>
        </div>
      </div>
      <Button variant="ghost">
        <Eye className="h-4 w-4 mr-2" />
        View Details
      </Button>
    </div>
  );
}