import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockTicketDetails } from './mock-data';

export function TicketIntakeForm() {
  const { intakeForm } = mockTicketDetails;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Requirements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Business Goals</h3>
          <p className="text-sm text-muted-foreground">{intakeForm.businessGoals}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Target Audience</h3>
          <p className="text-sm text-muted-foreground">{intakeForm.targetAudience}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Competitors</h3>
          <p className="text-sm text-muted-foreground">{intakeForm.competitors}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Brand Guidelines</h3>
          <p className="text-sm text-muted-foreground">
            <a href={intakeForm.brandGuidelines} className="text-primary hover:underline">
              Download Brand Guidelines
            </a>
          </p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Color Preferences</h3>
          <p className="text-sm text-muted-foreground">{intakeForm.colorPreferences}</p>
        </div>
      </CardContent>
    </Card>
  );
}