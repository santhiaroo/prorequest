import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from '@/lib/date';
import { Link } from 'react-router-dom';

const recentClients = [
  {
    id: 'CLT-001',
    name: 'John Smith',
    company: 'Acme Corporation',
    email: 'john@acmecorp.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    initials: 'JS',
    status: 'active',
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
  {
    id: 'CLT-002',
    name: 'Emma Davis',
    company: 'TechStart Inc',
    email: 'emma@techstart.io',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    initials: 'ED',
    status: 'active',
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
  },
];

export function RecentClients() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Clients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentClients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={client.avatar} />
                  <AvatarFallback>{client.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <Link
                    to={`/clients/${client.id}`}
                    className="font-medium hover:underline"
                  >
                    {client.name}
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {client.company}
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-green-500/10 text-green-500"
                    >
                      {client.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Joined {formatDistanceToNow(client.joinedAt)} ago
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}