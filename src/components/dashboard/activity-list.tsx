import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: string;
  type: 'ticket' | 'service' | 'workspace';
  action: string;
  description: string;
  timestamp: Date;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'ticket',
    action: 'New Ticket',
    description: 'Website redesign project submitted',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: '2',
    type: 'service',
    action: 'Service Updated',
    description: 'Monthly SEO package price updated',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  // Add more activities as needed
];

export function ActivityList() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions across your workspaces</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between space-x-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{activity.action}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(activity.timestamp, {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-sm">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}