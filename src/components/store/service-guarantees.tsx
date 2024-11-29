import { Shield, RotateCcw, Clock, CheckCircle2 } from 'lucide-react';

export function ServiceGuarantees() {
  return (
    <div className="space-y-4 pt-4 border-t">
      <div className="text-sm font-medium">Service Guarantees</div>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4 text-primary" />
          <span>100% Satisfaction Guarantee</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <RotateCcw className="h-4 w-4 text-primary" />
          <span>14-Day Money Back Guarantee</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 text-primary" />
          <span>On-time Delivery Promise</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <span>Quality Assurance</span>
        </div>
      </div>
    </div>
  );
}