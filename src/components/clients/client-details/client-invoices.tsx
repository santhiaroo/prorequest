import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockClientDetails } from './mock-data';
import { formatCurrency } from '@/lib/format';
import { formatDistanceToNow } from '@/lib/date';

export function ClientInvoices() {
  const { invoices } = mockClientDetails;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button asChild>
          <Link to="/invoices/new">
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Link>
        </Button>
      </div>

      {invoices.map((invoice) => (
        <Card key={invoice.id} className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Link
                  to={`/invoices/${invoice.id}`}
                  className="font-medium hover:underline"
                >
                  {invoice.id}
                </Link>
                <Badge
                  variant="secondary"
                  className={
                    invoice.status === 'paid'
                      ? 'bg-green-500/10 text-green-500'
                      : invoice.status === 'refunded'
                      ? 'bg-blue-500/10 text-blue-500'
                      : 'bg-yellow-500/10 text-yellow-500'
                  }
                >
                  {invoice.status}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Created {formatDistanceToNow(invoice.createdAt)} ago
                {invoice.paidAt && ` • Paid ${formatDistanceToNow(invoice.paidAt)} ago`}
              </div>
              <div className="text-sm font-medium">
                {formatCurrency(invoice.amount)}
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/invoices/${invoice.id}`}>View Details</Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}