import { Shield } from 'lucide-react';

interface RefundSealProps {
  daysToRefund: number;
}

export function RefundSeal({ daysToRefund }: RefundSealProps) {
  return (
    <div className="flex items-center gap-2 bg-primary/5 rounded-full px-4 py-2">
      <Shield className="h-4 w-4 text-primary" />
      <span className="text-sm">
        {daysToRefund}-Day Money Back Guarantee
      </span>
    </div>
  );
}