import { AddInvoiceDialog } from '@/components/invoices/add-invoice-dialog';

export function NewInvoicePage() {
  return (
    <div>
      <AddInvoiceDialog open={true} onOpenChange={() => window.history.back()} />
    </div>
  );
}