import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { useWorkspace } from '@/providers/workspace-provider';
import { formatDistanceToNow } from '@/lib/date';

export function WorkspaceSwitcher() {
  const { currentWorkspace, workspaces, setCurrentWorkspace } = useWorkspace();

  const getTrialStatus = (workspace: typeof workspaces[0]) => {
    if (!workspace.trialEndsAt) return null;
    
    const now = new Date();
    const isExpired = now > workspace.trialEndsAt;
    
    if (isExpired) {
      return <Badge variant="destructive">Trial Expired</Badge>;
    }
    
    return (
      <Badge variant="secondary">
        <Clock className="h-3 w-3 mr-1" />
        {formatDistanceToNow(workspace.trialEndsAt)} left
      </Badge>
    );
  };

  return (
    <Select
      value={currentWorkspace?.id}
      onValueChange={(value) => {
        const workspace = workspaces.find((w) => w.id === value);
        if (workspace) setCurrentWorkspace(workspace);
      }}
    >
      <SelectTrigger className="w-[280px]">
        <SelectValue>
          <div className="flex items-center space-x-2">
            <div
              className="h-4 w-4 rounded"
              style={{ backgroundColor: currentWorkspace?.branding.colors.primary }}
            />
            <span>{currentWorkspace?.name}</span>
            {currentWorkspace?.trialEndsAt && getTrialStatus(currentWorkspace)}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {workspaces.map((workspace) => (
          <SelectItem key={workspace.id} value={workspace.id}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <div
                  className="h-4 w-4 rounded"
                  style={{ backgroundColor: workspace.branding.colors.primary }}
                />
                <span>{workspace.name}</span>
              </div>
              {workspace.trialEndsAt && getTrialStatus(workspace)}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}