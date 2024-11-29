import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Building2,
  LayoutDashboard,
  Settings,
  ShoppingBag,
  Ticket,
  Receipt,
  CreditCard,
  Users,
  CreditCard as BillingIcon,
  Palette,
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    title: 'Clients',
    icon: Users,
    href: '/clients',
  },
  {
    title: 'Brands',
    icon: Palette,
    href: '/brands',
  },
  {
    title: 'Services',
    icon: ShoppingBag,
    href: '/services',
  },
  {
    title: 'Tickets',
    icon: Ticket,
    href: '/tickets',
  },
  {
    title: 'Subscriptions',
    icon: CreditCard,
    href: '/subscriptions',
  },
  {
    title: 'Invoices',
    icon: Receipt,
    href: '/invoices',
  },
  {
    title: 'Billing',
    icon: BillingIcon,
    href: '/billing',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const location = useLocation();

  return (
    <div className={cn('flex flex-col bg-background', className)} {...props}>
      <div className="px-6 py-4 border-b">
        <Link to="/" className="flex items-center space-x-2">
          <Building2 className="h-6 w-6" />
          <span className="font-bold text-lg">ProRequests</span>
        </Link>
      </div>
      <div className="flex-1 flex flex-col min-h-0 p-4">
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={location.pathname.startsWith(item.href) ? 'secondary' : 'ghost'}
              className="w-full justify-start"
            >
              <Link to={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
}