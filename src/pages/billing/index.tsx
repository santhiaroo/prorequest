import { BillingPlans } from '@/components/billing/billing-plans';
import { CurrentPlan } from '@/components/billing/current-plan';
import { RedeemCode } from '@/components/billing/redeem-code';

export function BillingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Plans</h1>
        <p className="text-muted-foreground mt-2">
          Manage your subscription and billing preferences
        </p>
      </div>
      <CurrentPlan />
      <BillingPlans />
      <RedeemCode />
    </div>
  );
}