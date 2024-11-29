import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Pencil, XCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatCurrency } from '@/lib/format';
import { mockSubscriptions } from './mock-data';

export function SubscriptionList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Subscription ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Payments</TableHead>
            <TableHead>Last Payment</TableHead>
            <TableHead>Next Payment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockSubscriptions.map((subscription) => (
            <TableRow key={subscription.id}>
              <TableCell className="font-medium">
                <Link 
                  to={`/subscriptions/${subscription.id}`}
                  className="hover:underline"
                >
                  {subscription.id}
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <Link 
                    to={`/clients/${subscription.clientId}`}
                    className="hover:underline"
                  >
                    {subscription.clientName}
                  </Link>
                  <span className="text-sm text-muted-foreground">{subscription.clientEmail}</span>
                </div>
              </TableCell>
              <TableCell>
                <Link 
                  to={`/services/${subscription.serviceId}`}
                  className="hover:underline"
                >
                  {subscription.serviceName}
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{subscription.paymentsCount} payments</span>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(subscription.amount)}/{subscription.interval}
                  </span>
                </div>
              </TableCell>
              <TableCell>{subscription.lastPaymentDate}</TableCell>
              <TableCell>{subscription.nextBillingDate}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={
                    subscription.status === 'active'
                      ? 'bg-green-500/10 text-green-500'
                      : subscription.status === 'past_due'
                      ? 'bg-yellow-500/10 text-yellow-500'
                      : 'bg-red-500/10 text-red-500'
                  }
                >
                  {subscription.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={`/subscriptions/${subscription.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={`/subscriptions/${subscription.id}/edit`}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Subscription
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel Subscription
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}