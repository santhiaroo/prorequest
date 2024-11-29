import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Service } from '@/types';
import { formatCurrency } from '@/lib/format';
import {
  CheckCircle2,
  Clock,
  MoreHorizontal,
  Eye,
  Pencil,
  Link as LinkIcon,
  Copy,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { toast } = useToast();

  const handleCopyLink = () => {
    const url = `${window.location.origin}/store/${service.id}`;
    navigator.clipboard.writeText(url);
    toast({
      description: "Service link copied to clipboard",
    });
  };

  return (
    <Card>
      <CardHeader className="p-0">
        <Link to={`/services/${service.id}`}>
          <div className="aspect-video relative">
            <img
              src={service.coverImage}
              alt={service.name}
              className="w-full h-full object-cover rounded-t-lg"
            />
            {service.isPublic && (
              <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Published
              </Badge>
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <Link to={`/services/${service.id}`} className="hover:underline">
              <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
            </Link>
            <p className="text-sm text-muted-foreground">{service.summary}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="font-medium">
              {formatCurrency(service.price)}
              {service.isSubscription && (
                <span className="text-sm text-muted-foreground ml-1">
                  /{service.interval}
                </span>
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {service.turnaround}
            </div>
          </div>
          <div className="space-y-2">
            {service.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          asChild
        >
          <Link to={`/services/${service.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to={`/services/${service.id}/edit`}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Service
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/store/${service.id}`} target="_blank">
                <LinkIcon className="h-4 w-4 mr-2" />
                View Public Page
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopyLink}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Public Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}