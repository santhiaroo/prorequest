import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { mockClientDetails } from './mock-data';

export function ClientHeader() {
  const client = mockClientDetails;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/clients">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Link>
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">
            {client.name}
          </h2>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>{client.company}</span>
            <Badge variant="secondary" className={
              client.status === 'client'
                ? 'bg-green-500/10 text-green-500'
                : 'bg-yellow-500/10 text-yellow-500'
            }>
              {client.status}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}