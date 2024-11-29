import { ServiceForm } from '@/components/services/service-form';

export function NewServicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Service</h1>
        <p className="text-muted-foreground mt-2">
          Create a new service to offer to your clients
        </p>
      </div>
      <ServiceForm />
    </div>
  );
}