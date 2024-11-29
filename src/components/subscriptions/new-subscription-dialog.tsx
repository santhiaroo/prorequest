import { useState } from 'react';
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
import { CreditCard, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface NewSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewSubscriptionDialog({ open, onOpenChange }: NewSubscriptionDialogProps) {
  const navigate = useNavigate();

  const handleCreateInvoice = () => {
    onOpenChange(false);
    navigate('/invoices/new');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Subscription</DialogTitle>
          <DialogDescription>
            Follow these steps to set up a new subscription
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              To create a subscription, you'll need to start by creating an invoice with a recurring service.
              Once the invoice is paid, the subscription will be automatically created.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">How it works:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>Create an invoice with your recurring service</li>
                <li>Send the invoice to your client</li>
                <li>Once paid, the subscription will be automatically activated</li>
                <li>Future invoices will be generated automatically</li>
              </ul>
            </div>

            <div className="rounded-lg border p-4 space-y-2">
              <div className="font-medium">Requirements:</div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Select a recurring service</li>
                <li>• Client must have a valid payment method</li>
                <li>• Subscription terms must be agreed upon</li>
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateInvoice}>
            <CreditCard className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}