import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WorkspaceList } from '@/components/workspaces/workspace-list';
import { WorkspaceFilters } from '@/components/workspaces/workspace-filters';

export function WorkspacesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Workspaces</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Workspace
        </Button>
      </div>
      <WorkspaceFilters />
      <WorkspaceList />
    </div>
  );
}