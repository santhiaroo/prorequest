import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ClientList } from '@/components/clients/client-list';
import { ClientFilters } from '@/components/clients/client-filters';
import { AddClientDialog } from '@/components/clients/add-client-dialog';

export function ClientsPage() {
  const [showAddClient, setShowAddClient] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground mt-2">
            Manage your client relationships and projects
          </p>
        </div>
        <Button onClick={() => setShowAddClient(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>
      <ClientFilters />
      <ClientList />

      <AddClientDialog
        open={showAddClient}
        onOpenChange={setShowAddClient}
      />
    </div>
  );
}