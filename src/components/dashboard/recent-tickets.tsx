import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from '@/lib/date';
import { Link } from 'react-router-dom';
import { getTicketStatusColor, getTicketPriorityColor } from '@/lib/tickets';

const recentTickets = [
  {
    id: 'TKT-001',
    title: 'Website Redesign Project',
    status: 'in-progress',
    priority: 'high',
    client: {
      id: 'CLT-001',
      name: 'Acme Corporation',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: 'TKT-002',
    title: 'SEO Optimization',
    status: 'new',
    priority: 'medium',
    client: {
      id: 'CLT-002',
      name: 'TechStart Inc',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
  },
];

export function RecentTickets() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="space-y-1">
                <Link
                  to={`/tickets/${ticket.id}`}
                  className="font-medium hover:underline"
                >
                  {ticket.title}
                </Link>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/clients/${ticket.client.id}`}
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    {ticket.client.name}
                  </Link>
                  <Badge className={getTicketStatusColor(ticket.status)}>
                    {ticket.status}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={getTicketPriorityColor(ticket.priority)}
                  >
                    {ticket.priority}
                  </Badge>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Created {formatDistanceToNow(ticket.createdAt)} ago
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}