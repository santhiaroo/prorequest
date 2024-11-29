import { useState } from 'react';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { BrandBasicInfo } from './steps/brand-basic-info';
import { BrandLogos } from './steps/brand-logos';
import { BrandColors } from './steps/brand-colors';
import { BrandAssets } from './steps/brand-assets';
import { BrandReview } from './steps/brand-review';

interface AddBrandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId?: string;
}

type Step = {
  title: string;
  description: string;
  component: React.ComponentType<any>;
};

const steps: Step[] = [
  { 
    title: 'Basic Information',
    description: 'Enter the brand details and basic information',
    component: BrandBasicInfo 
  },
  { 
    title: 'Logos',
    description: 'Upload and organize brand logos',
    component: BrandLogos 
  },
  { 
    title: 'Colors',
    description: 'Define the brand color palette',
    component: BrandColors 
  },
  { 
    title: 'Assets',
    description: 'Upload brand assets and create collections',
    component: BrandAssets 
  },
  { 
    title: 'Review',
    description: 'Review all brand information before creating',
    component: BrandReview 
  },
];

export function AddBrandDialog({ open, onOpenChange, clientId }: AddBrandDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    id: `BRD-${Date.now()}`,
    name: '',
    summary: '',
    industry: '',
    type: 'primary',
    clientId: clientId || '',
    status: 'draft',
    logos: [],
    colors: {
      primary: '#000000',
      secondary: '#000000',
      additional: []
    },
    assets: {
      brandBook: null,
      brandGuidelines: null,
      collections: []
    }
  });

  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveAsDraft = () => {
    // Here you would typically save to your API
    console.log('Saving draft:', formData);
    toast({
      title: "Draft Saved",
      description: "Your brand has been saved as a draft.",
    });
    onOpenChange(false);
    setCurrentStep(0);
  };

  const handleSubmit = () => {
    const finalData = {
      ...formData,
      status: 'active',
    };
    // Here you would typically send the data to your API
    console.log('Form submitted:', finalData);
    toast({
      title: "Brand Created",
      description: "The brand has been successfully created.",
    });
    onOpenChange(false);
    setCurrentStep(0);
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{steps[currentStep].title}</DialogTitle>
          <DialogDescription>{steps[currentStep].description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {/* Progress Steps */}
          <div className="relative">
            <div className="absolute top-4 w-full h-0.5 bg-muted">
              <div
                className="absolute h-full bg-primary transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
            <div className="relative flex justify-between">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      index <= currentStep
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="mt-8">
            <CurrentStepComponent
              data={formData}
              onChange={(newData: any) => setFormData({ ...formData, ...newData })}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleSaveAsDraft}
              >
                Save as Draft
              </Button>
              {currentStep === steps.length - 1 ? (
                <Button onClick={handleSubmit}>
                  Create Brand
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  Continue
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}