import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/format';
import { StoreService } from './types';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  service: StoreService;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <div className="aspect-[16/9] relative">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover rounded-t-lg"
          />
          {service.isPopular && (
            <Badge
              className="absolute top-4 right-4 bg-primary text-primary-foreground"
            >
              Popular
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-xl mb-2">{service.name}</h3>
            <p className="text-muted-foreground">{service.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">
              {formatCurrency(service.price)}
              {service.isSubscription && (
                <span className="text-sm text-muted-foreground ml-1">
                  /{service.interval}
                </span>
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {service.turnaround}
            </div>
          </div>
          <div className="space-y-2">
            {service.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full" size="lg" asChild>
          <Link to={`/store/${service.id}/checkout`}>Get Started Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}