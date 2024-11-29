import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/format';
import { formatDistanceToNow } from '@/lib/date';
import { Link } from 'react-router-dom';

const recentInvoices = [
  {
    id: 'INV-2024-001',
    client: {
      id: 'CLT-001',
      name: 'Acme Corporation',
    },
    amount: 2499,
    status: 'paid',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
  {
    id: 'INV-2024-002',
    client: {
      id: 'CLT-002',
      name: 'TechStart Inc',
    },
    amount: 799,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  },
];

export function RecentInvoices() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="space-y-1">
                <Link
                  to={`/invoices/${invoice.id}`}
                  className="font-medium hover:underline"
                >
                  {invoice.id}
                </Link>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/clients/${invoice.client.id}`}
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    {invoice.client.name}
                  </Link>
                  <Badge
                    variant="secondary"
                    className={
                      invoice.status === 'paid'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-yellow-500/10 text-yellow-500'
                    }
                  >
                    {invoice.status}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{formatCurrency(invoice.amount)}</div>
                <div className="text-sm text-muted-foreground">
                  Created {formatDistanceToNow(invoice.createdAt)} ago
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}