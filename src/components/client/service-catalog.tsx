import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockServices } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/format';

export function ServiceCatalog() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Services</CardTitle>
        <CardDescription>Services you can request</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {mockServices.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between space-x-4 border-b pb-4 last:border-0"
              >
                <div className="space-y-1">
                  <span className="font-medium">{service.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">
                      {formatCurrency(service.price)}
                    </span>
                    {service.isSubscription && (
                      <span className="text-sm text-muted-foreground">
                        /{service.interval}
                      </span>
                    )}
                  </div>
                </div>
                <Button size="sm">Request</Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}