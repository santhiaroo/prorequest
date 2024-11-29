import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceList } from '@/components/services/service-list';
import { ServiceFilters } from '@/components/services/service-filters';
import { Link } from 'react-router-dom';

export function ServicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Services</h1>
        <Button asChild>
          <Link to="/services/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Link>
        </Button>
      </div>
      <ServiceFilters />
      <ServiceList />
    </div>
  );
}