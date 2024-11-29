import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InvoiceList } from '@/components/invoices/invoice-list';
import { InvoiceFilters } from '@/components/invoices/invoice-filters';
import { AddInvoiceDialog } from '@/components/invoices/add-invoice-dialog';

export function InvoicesPage() {
  const [showAddInvoice, setShowAddInvoice] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <Button onClick={() => setShowAddInvoice(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Invoice
        </Button>
      </div>
      <InvoiceFilters />
      <InvoiceList />

      <AddInvoiceDialog
        open={showAddInvoice}
        onOpenChange={setShowAddInvoice}
      />
    </div>
  );
}