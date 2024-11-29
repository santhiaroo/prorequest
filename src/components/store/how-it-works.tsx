import { Card, CardContent } from '@/components/ui/card';
import { ClipboardList, MessageSquare, Rocket } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    title: '1. Submit Your Request',
    description: 'Choose a service and fill out our detailed brief form to help us understand your needs.',
  },
  {
    icon: MessageSquare,
    title: '2. Discuss Requirements',
    description: 'Our team will review your request and schedule a call to align on expectations and timeline.',
  },
  {
    icon: Rocket,
    title: '3. Get Results',
    description: 'We deliver your project with regular updates and revisions until you are completely satisfied.',
  },
];

export function HowItWorks() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Our streamlined process ensures clear communication and exceptional results
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <Card key={step.title} className="relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}