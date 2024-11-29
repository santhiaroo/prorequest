import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Building2,
  LayoutDashboard,
  Settings,
  ShoppingBag,
  Ticket,
} from 'lucide-react';

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      <Button asChild variant="ghost">
        <Link to="/dashboard">
          <LayoutDashboard className="h-4 w-4 mr-2" />
          Dashboard
        </Link>
      </Button>
      <Button asChild variant="ghost">
        <Link to="/services">
          <ShoppingBag className="h-4 w-4 mr-2" />
          Services
        </Link>
      </Button>
      <Button asChild variant="ghost">
        <Link to="/tickets">
          <Ticket className="h-4 w-4 mr-2" />
          Tickets
        </Link>
      </Button>
      <Button asChild variant="ghost">
        <Link to="/workspaces">
          <Building2 className="h-4 w-4 mr-2" />
          Workspaces
        </Link>
      </Button>
      <Button asChild variant="ghost">
        <Link to="/settings">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Link>
      </Button>
    </nav>
  );
}