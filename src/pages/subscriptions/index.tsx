import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SubscriptionList } from '@/components/subscriptions/subscription-list';
import { SubscriptionFilters } from '@/components/subscriptions/subscription-filters';
import { NewSubscriptionDialog } from '@/components/subscriptions/new-subscription-dialog';

export function SubscriptionsPage() {
  const [showNewSubscription, setShowNewSubscription] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
        <Button onClick={() => setShowNewSubscription(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Subscription
        </Button>
      </div>
      <SubscriptionFilters />
      <SubscriptionList />

      <NewSubscriptionDialog
        open={showNewSubscription}
        onOpenChange={setShowNewSubscription}
      />
    </div>
  );
}