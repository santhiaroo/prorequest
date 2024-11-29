import { Shield, Lock, CreditCard } from 'lucide-react';

export function SecurityBadges() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card">
        <Lock className="h-6 w-6 mb-2 text-primary" />
        <div className="text-sm font-medium">Secure Checkout</div>
        <div className="text-xs text-muted-foreground">256-bit SSL encryption</div>
      </div>
      <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card">
        <Shield className="h-6 w-6 mb-2 text-primary" />
        <div className="text-sm font-medium">Money-Back Guarantee</div>
        <div className="text-xs text-muted-foreground">14-day refund policy</div>
      </div>
      <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card">
        <CreditCard className="h-6 w-6 mb-2 text-primary" />
        <div className="text-sm font-medium">Secure Payments</div>
        <div className="text-xs text-muted-foreground">PCI DSS compliant</div>
      </div>
    </div>
  );
}