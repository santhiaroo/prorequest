import { ServiceCard } from './service-card';
import { mockStoreServices } from './mock-data';

export function ServiceGrid() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Our Services</h2>
        <div className="flex items-center gap-4">
          {/* Add filters here if needed */}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {mockStoreServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}