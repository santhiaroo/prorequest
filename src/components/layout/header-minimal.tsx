import { Plus } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { UserNav } from '@/components/layout/user-nav';
import { WorkspaceSwitcher } from '@/components/layout/workspace-switcher';
import { Button } from '@/components/ui/button';
import { useWorkspace } from '@/providers/workspace-provider';

export function HeaderMinimal() {
  const { openNewWorkspaceDialog } = useWorkspace();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-[1200px] mx-auto px-4">
        <div className="flex h-14 items-center gap-4">
          <div className="flex items-center gap-2">
            <WorkspaceSwitcher />
            <Button variant="outline" size="sm" onClick={openNewWorkspaceDialog}>
              <Plus className="h-4 w-4 mr-2" />
              New Workspace
            </Button>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  );
}