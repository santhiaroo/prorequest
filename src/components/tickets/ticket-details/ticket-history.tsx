import { Card, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from '@/lib/date';
import { mockTicketHistory } from './mock-data';

export function TicketHistory() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {mockTicketHistory.map((event) => (
            <div key={event.id} className="flex items-start gap-4">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div className="flex-1 space-y-1">
                <p className="text-sm">{event.action}</p>
                <div className="text-sm text-muted-foreground">
                  by {event.actor} • {formatDistanceToNow(event.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}