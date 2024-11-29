import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockClientDetails } from './mock-data';
import { formatCurrency } from '@/lib/format';
import { formatDistanceToNow } from '@/lib/date';

export function ClientSubscriptions() {
  const { subscriptions } = mockClientDetails;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button asChild>
          <Link to="/subscriptions/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Subscription
          </Link>
        </Button>
      </div>

      {subscriptions.map((subscription) => (
        <Card key={subscription.id} className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Link
                to={`/subscriptions/${subscription.id}`}
                className="font-medium hover:underline"
              >
                {subscription.serviceName}
              </Link>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                  {subscription.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Started {formatDistanceToNow(subscription.startDate)} ago
                  • Next billing {formatDistanceToNow(subscription.nextBilling)}
                </span>
              </div>
              <div className="text-sm font-medium">
                {formatCurrency(subscription.amount)}/month
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/subscriptions/${subscription.id}`}>View Details</Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}