import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/format';
import { formatDistanceToNow } from '@/lib/date';
import { Link } from 'react-router-dom';

const recentServices = [
  {
    id: 'SRV-001',
    name: 'Website Design Package',
    client: {
      id: 'CLT-001',
      name: 'Acme Corporation',
    },
    amount: 2499,
    status: 'completed',
    purchasedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  },
  {
    id: 'SRV-002',
    name: 'Monthly SEO Service',
    client: {
      id: 'CLT-002',
      name: 'TechStart Inc',
    },
    amount: 799,
    status: 'active',
    purchasedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
  },
];

export function RecentServices() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recently Purchased Services</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentServices.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="space-y-1">
                <Link
                  to={`/services/${service.id}`}
                  className="font-medium hover:underline"
                >
                  {service.name}
                </Link>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/clients/${service.client.id}`}
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    {service.client.name}
                  </Link>
                  <Badge
                    variant="secondary"
                    className={
                      service.status === 'active'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-blue-500/10 text-blue-500'
                    }
                  >
                    {service.status}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{formatCurrency(service.amount)}</div>
                <div className="text-sm text-muted-foreground">
                  {formatDistanceToNow(service.purchasedAt)} ago
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}