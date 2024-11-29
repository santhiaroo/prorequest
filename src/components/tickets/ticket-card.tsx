import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Ticket } from '@/types';
import { formatDistanceToNow } from '@/lib/date';
import { getTicketStatusColor, getTicketPriorityColor } from '@/lib/tickets';
import { Eye } from 'lucide-react';

interface TicketCardProps {
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

export function TicketCard({ ticket }: TicketCardProps) {
  return (
    <Card className="hover:bg-accent/50 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between space-y-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">#{ticket.id}</span>
              <Badge variant="outline" className={getTicketPriorityColor(ticket.priority)}>
                {ticket.priority}
              </Badge>
              <Badge className={getTicketStatusColor(ticket.status)}>
                {ticket.status}
              </Badge>
            </div>
            <h3 className="font-semibold">{ticket.title}</h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Client:</span>
            <span className="text-sm">{ticket.clientName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Company:</span>
            <span className="text-sm">{ticket.clientCompany}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Due Date:</span>
            <span className="text-sm">{ticket.dueDate}</span>
          </div>
        </div>
        <div>
          <div className="text-sm font-medium mb-2">Assigned Team:</div>
          <div className="flex -space-x-2">
            {ticket.assignedTeam.map((member) => (
              <Avatar key={member.id} className="border-2 border-background">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}