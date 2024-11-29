import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from '@/lib/date';
import type { Activity } from './types';

interface ActivityItemProps {
  activity: Activity;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{activity.action}</Badge>
          <span className="text-sm text-muted-foreground">
            {formatDistanceToNow(activity.timestamp)}
          </span>
        </div>
        <p className="text-sm">{activity.description}</p>
      </div>
    </div>
  );
}