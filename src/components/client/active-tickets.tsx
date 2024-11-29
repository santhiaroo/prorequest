import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockClientTickets } from './mock-data';
import { getTicketStatusColor } from '@/lib/tickets';
import { formatDistanceToNow } from '@/lib/date';

export function ActiveTickets() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Tickets</CardTitle>
        <CardDescription>Your ongoing service requests</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {mockClientTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex items-center justify-between space-x-4 border-b pb-4 last:border-0"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{ticket.title}</span>
                    <Badge className={getTicketStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Updated {formatDistanceToNow(ticket.updatedAt)}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}