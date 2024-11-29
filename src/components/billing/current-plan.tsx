import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function CurrentPlan() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your current subscription details</CardDescription>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Pro Plan
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Workspace Usage</span>
            <span className="font-medium">8/10 workspaces</span>
          </div>
          <Progress value={80} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Storage Usage</span>
            <span className="font-medium">45.5GB/50GB</span>
          </div>
          <Progress value={91} />
        </div>
        <div className="pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Next billing date: April 1, 2024
          </div>
        </div>
      </CardContent>
    </Card>
  );
}