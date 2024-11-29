import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Workspace } from '@/types';
import { Globe, Users } from 'lucide-react';

interface WorkspaceCardProps {
  workspace: Workspace;
  onManage: (workspace: Workspace) => void;
}

export function WorkspaceCard({ workspace, onManage }: WorkspaceCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <img
              src={workspace.branding.logo}
              alt={workspace.name}
              className="h-8 w-8 object-contain"
            />
          </div>
          <div>
            <h3 className="font-semibold">{workspace.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Globe className="h-3 w-3 mr-1" />
              {workspace.domain}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Primary Color</div>
              <div className="flex items-center space-x-2">
                <div
                  className="h-5 w-5 rounded"
                  style={{ backgroundColor: workspace.branding.colors.primary }}
                />
                <span className="text-sm">{workspace.branding.colors.primary}</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Secondary Color</div>
              <div className="flex items-center space-x-2">
                <div
                  className="h-5 w-5 rounded"
                  style={{ backgroundColor: workspace.branding.colors.secondary }}
                />
                <span className="text-sm">{workspace.branding.colors.secondary}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => onManage(workspace)}>
          Manage Workspace
        </Button>
      </CardFooter>
    </Card>
  );
}