import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock } from 'lucide-react';
import type { Workspace } from '@/types';

interface TrialExpiredDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspace: Workspace;
}

const features = [
  'Unlimited Clients',
  'Unlimited Team Members',
  'Custom Branding',
  'Priority Support',
  'API Access',
  'Advanced Analytics',
];

export function TrialExpiredDialog({ open, onOpenChange, workspace }: TrialExpiredDialogProps) {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate('/billing');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Trial Period Expired</DialogTitle>
          <DialogDescription>
            Your trial period for {workspace.name} has ended. Upgrade now to continue using all features.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Pro Plan</h3>
                <div className="text-3xl font-bold mt-2">
                  $79<span className="text-base font-normal text-muted-foreground">/month</span>
                </div>
              </div>

              <div className="space-y-2">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <div className="space-y-2">
              <Badge variant="destructive" className="w-full justify-center py-1">
                <Clock className="h-4 w-4 mr-2" />
                Trial Expired
              </Badge>
              <p className="text-sm text-muted-foreground">
                Your trial period has ended. Upgrade now to maintain access to all features
                and continue managing your clients seamlessly.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">What happens next?</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Choose a plan that fits your needs</li>
                <li>• Keep all your existing data and settings</li>
                <li>• No interruption in service</li>
                <li>• Cancel or change plans anytime</li>
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Switch Workspace
          </Button>
          <Button onClick={handleUpgrade} className="px-8">
            Upgrade Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}