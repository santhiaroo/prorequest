import { Building2, ShoppingBag, Ticket, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrandSelector } from '@/components/client/brand-selector';
import { UserNav } from '@/components/layout/user-nav';
import { ModeToggle } from '@/components/mode-toggle';

export function ClientHeader() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <BrandSelector />
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Button asChild variant="ghost">
            <a href="/client/services">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Services
            </a>
          </Button>
          <Button asChild variant="ghost">
            <a href="/client/tickets">
              <Ticket className="h-4 w-4 mr-2" />
              Tickets
            </a>
          </Button>
          <Button asChild variant="ghost">
            <a href="/client/brands">
              <Building2 className="h-4 w-4 mr-2" />
              Brands
            </a>
          </Button>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}