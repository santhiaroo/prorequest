import { useNavigate } from 'react-router-dom';
import { ServiceCard } from './service-card';
import { mockServices } from '@/lib/mock-data';

export function ServiceList() {
  const navigate = useNavigate();

  const handleEdit = (service: any) => {
    // Navigate to edit page with service data
    navigate(`/services/${service.id}/edit`, { state: { service } });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {mockServices.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
}