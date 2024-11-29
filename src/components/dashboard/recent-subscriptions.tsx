import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/format';
import { formatDistanceToNow } from '@/lib/date';
import { Link } from 'react-router-dom';

const recentSubscriptions = [
  {
    id: 'SUB-2024-001',
    serviceName: 'Monthly SEO Package',
    client: {
      id: 'CLT-001',
      name: 'Acme Corporation',
    },
    amount: 799,
    status: 'active',
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  },
  {
    id: 'SUB-2024-002',
    serviceName: 'Social Media Management',
    client: {
      id: 'CLT-002',
      name: 'TechStart Inc',
    },
    amount: 599,
    status: 'active',
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
  },
];

export function RecentSubscriptions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Subscriptions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentSubscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="space-y-1">
                <Link
                  to={`/subscriptions/${subscription.id}`}
                  className="font-medium hover:underline"
                >
                  {subscription.serviceName}
                </Link>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/clients/${subscription.client.id}`}
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    {subscription.client.name}
                  </Link>
                  <Badge
                    variant="secondary"
                    className="bg-green-500/10 text-green-500"
                  >
                    {subscription.status}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {formatCurrency(subscription.amount)}/month
                </div>
                <div className="text-sm text-muted-foreground">
                  Started {formatDistanceToNow(subscription.startedAt)} ago
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}