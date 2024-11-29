import { Card, CardContent } from '@/components/ui/card';
import { ClipboardList, MessageSquare, Rocket, CheckCircle2 } from 'lucide-react';

const process = [
  {
    icon: ClipboardList,
    title: 'Submit Requirements',
    description: 'Fill out our comprehensive brief to help us understand your needs and goals.',
  },
  {
    icon: MessageSquare,
    title: 'Project Discussion',
    description: 'Schedule a call with our team to align on expectations and timeline.',
  },
  {
    icon: Rocket,
    title: 'Development & Delivery',
    description: 'We start working on your project with regular updates and milestone reviews.',
  },
  {
    icon: CheckCircle2,
    title: 'Review & Approval',
    description: "Review the deliverables and request revisions until you're completely satisfied.",
  },
];

export function ServiceProcess() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">How It Works</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {process.map((step, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-primary/10 p-2 rounded-lg">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{step.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}