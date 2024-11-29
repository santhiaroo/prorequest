import { Button } from '@/components/ui/button';
import { useWorkspace } from '@/providers/workspace-provider';
import { Globe } from 'lucide-react';

export function StoreBanner() {
  const { currentWorkspace } = useWorkspace();

  return (
    <header className="border-b bg-background">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={currentWorkspace?.branding.logo}
              alt={currentWorkspace?.name}
              className="h-8 w-8 object-contain"
            />
            <span className="font-semibold text-lg">
              {currentWorkspace?.name}
            </span>
          </div>
          <Button variant="outline" size="sm">
            <Globe className="h-4 w-4 mr-2" />
            Visit Website
          </Button>
        </div>
      </div>
    </header>
  );
}