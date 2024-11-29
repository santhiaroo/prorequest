import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, CreditCard } from 'lucide-react';
import { formatCurrency } from '@/lib/format';
import { Link } from 'react-router-dom';

interface BillingInfo {
  serviceId: string;
  serviceName: string;
  amount: number;
  invoiceId: string;
  status: 'paid' | 'pending' | 'refunded';
  isSubscription: boolean;
  subscriptionId?: string;
}

const mockBillingInfo: BillingInfo = {
  serviceId: 'SRV-001',
  serviceName: 'Website Design Package',
  amount: 2499,
  invoiceId: 'INV-2024-001',
  status: 'paid',
  isSubscription: false,
};

export function TicketBilling() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">Service</h3>
              <Button
                variant="link"
                className="p-0 h-auto"
                asChild
              >
                <Link to={`/services/${mockBillingInfo.serviceId}`}>
                  {mockBillingInfo.serviceName}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="text-right">
              <div className="font-medium">{formatCurrency(mockBillingInfo.amount)}</div>
              {mockBillingInfo.isSubscription && (
                <div className="text-sm text-muted-foreground">Monthly</div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Invoice</h3>
              <Button
                variant="link"
                className="p-0 h-auto"
                asChild
              >
                <Link to={`/invoices/${mockBillingInfo.invoiceId}`}>
                  {mockBillingInfo.invoiceId}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
            <Badge
              variant="secondary"
              className={
                mockBillingInfo.status === 'paid'
                  ? 'bg-green-500/10 text-green-500'
                  : mockBillingInfo.status === 'refunded'
                  ? 'bg-blue-500/10 text-blue-500'
                  : 'bg-yellow-500/10 text-yellow-500'
              }
            >
              {mockBillingInfo.status}
            </Badge>
          </div>

          {mockBillingInfo.isSubscription && mockBillingInfo.subscriptionId && (
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Subscription</h3>
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  asChild
                >
                  <Link to={`/subscriptions/${mockBillingInfo.subscriptionId}`}>
                    {mockBillingInfo.subscriptionId}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <CreditCard className="h-4 w-4 mr-2" />
                Manage
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}