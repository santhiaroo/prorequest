import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

interface ServiceFeaturesProps {
  features: string[];
}

export function ServiceFeatures({ features }: ServiceFeaturesProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">What's Included</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">{feature}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Detailed description of this feature and its benefits to the client.
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}