import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  ArrowLeft,
  Building2,
  CreditCard,
  Users,
  Calendar,
  Ticket,
  Clock,
  CheckCircle2,
  History,
  MoreHorizontal,
  PauseCircle,
  PlayCircle,
  XCircle,
  ExternalLink,
  Edit,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/format';
import { formatDistanceToNow } from '@/lib/date';

// Mock data for the subscription details
const mockSubscription = {
  id: 'SUB-2024-001',
  status: 'active',
  client: {
    id: 'CLT-001',
    name: 'John Smith',
    company: 'Acme Corporation',
    email: 'john@acmecorp.com',
  },
  service: {
    id: 'SRV-001',
    name: 'Monthly SEO Package',
    price: 799,
  },
  nextRenewal: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15), // 15 days from now
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
  ticketsUsed: 3,
  ticketsLimit: 'unlimited',
  paymentMethod: 'stripe',
  accountManager: {
    id: 'USR-001',
    name: 'Sarah Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    initials: 'SW',
  },
  collaborators: [
    {
      id: 'USR-002',
      name: 'Mike Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      initials: 'MJ',
    }
  ],
  invoices: [
    {
      id: 'INV-001',
      amount: 799,
      status: 'paid',
      date: '2024-03-01',
    },
    {
      id: 'INV-002',
      amount: 799,
      status: 'paid',
      date: '2024-02-01',
    }
  ],
  tickets: [
    {
      id: 'TKT-001',
      title: 'March SEO Updates',
      status: 'in-progress',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    },
    {
      id: 'TKT-002',
      title: 'Content Optimization',
      status: 'completed',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    }
  ],
  history: [
    {
      id: '1',
      action: 'Subscription Created',
      actor: 'John Smith',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    },
    {
      id: '2',
      action: 'Payment Processed',
      actor: 'System',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    }
  ]
};

const accountManagers = [
  { id: 'USR-001', name: 'Sarah Wilson' },
  { id: 'USR-003', name: 'David Brown' },
  { id: 'USR-004', name: 'Emma Davis' },
];

export function SubscriptionDetailsPage() {
  const { id } = useParams();
  const [showChangeManagerDialog, setShowChangeManagerDialog] = useState(false);
  const [showPauseDialog, setShowPauseDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showChargeDialog, setShowChargeDialog] = useState(false);
  const [selectedManagerId, setSelectedManagerId] = useState('');
  const { toast } = useToast();

  const subscription = mockSubscription;

  const handleChangeManager = () => {
    if (!selectedManagerId) return;
    toast({
      title: "Account Manager Changed",
      description: "The account manager has been updated successfully.",
    });
    setShowChangeManagerDialog(false);
    setSelectedManagerId('');
  };

  const handlePauseSubscription = () => {
    toast({
      title: "Subscription Paused",
      description: "The subscription has been paused successfully.",
    });
    setShowPauseDialog(false);
  };

  const handleCancelSubscription = () => {
    toast({
      title: "Subscription Cancelled",
      description: "The subscription has been cancelled successfully.",
      variant: "destructive",
    });
    setShowCancelDialog(false);
  };

  const handleChargeNow = () => {
    toast({
      title: "Payment Processed",
      description: "The payment has been processed successfully.",
    });
    setShowChargeDialog(false);
  };

  const openStripeSubscription = () => {
    window.open('https://dashboard.stripe.com/subscriptions/' + id, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500';
      case 'paused':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/subscriptions">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Subscriptions
            </Link>
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              {subscription.service.name}
            </h1>
            <div className="flex items-center gap-4">
              <Link
                to={`/clients/${subscription.client.id}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Building2 className="h-4 w-4" />
                <span>{subscription.client.company}</span>
              </Link>
              <Badge className={getStatusColor(subscription.status)}>
                {subscription.status}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link to={`/services/${subscription.service.id}`}>
                View Service
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => setShowChargeDialog(true)}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Charge Now
                </DropdownMenuItem>
                <DropdownMenuItem onClick={openStripeSubscription}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Manage in Stripe
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowPauseDialog(true)}>
                  <PauseCircle className="h-4 w-4 mr-2" />
                  Pause Subscription
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => setShowCancelDialog(true)}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel Subscription
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Subscription Details */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Next Renewal</div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDistanceToNow(subscription.nextRenewal)}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Created</div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDistanceToNow(subscription.createdAt)} ago</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Tickets Used</div>
                  <div className="flex items-center gap-2">
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {subscription.ticketsUsed} ({subscription.ticketsLimit} left)
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Payment Method</div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="capitalize">via {subscription.paymentMethod}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Invoices */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscription.invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <Link
                        to={`/invoices/${invoice.id}`}
                        className="font-medium hover:underline"
                      >
                        {invoice.id}
                      </Link>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-green-500/10 text-green-500"
                        >
                          {invoice.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {invoice.date}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {formatCurrency(invoice.amount)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Associated Tickets */}
          <Card>
            <CardHeader>
              <CardTitle>Associated Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscription.tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <Link
                        to={`/tickets/${ticket.id}`}
                        className="font-medium hover:underline"
                      >
                        {ticket.title}
                      </Link>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={ticket.status === 'completed' ? 'secondary' : 'default'}
                        >
                          {ticket.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Created {formatDistanceToNow(ticket.createdAt)} ago
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/tickets/${ticket.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity History */}
          <Card>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscription.history.map((event) => (
                  <div key={event.id} className="flex items-start gap-4">
                    <div className="mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">{event.action}</p>
                      <div className="text-sm text-muted-foreground">
                        by {event.actor} • {formatDistanceToNow(event.timestamp)} ago
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Info */}
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Link
                  to={`/clients/${subscription.client.id}`}
                  className="font-medium hover:underline"
                >
                  {subscription.client.name}
                </Link>
                <div className="text-sm text-muted-foreground">
                  {subscription.client.email}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Company</div>
                <div className="text-sm text-muted-foreground">
                  {subscription.client.company}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team */}
          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Account Manager</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowChangeManagerDialog(true)}
                  >
                    Change
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {subscription.accountManager.initials}
                  </div>
                  <div>
                    <div className="font-medium">
                      {subscription.accountManager.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Account Manager
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <div className="text-sm font-medium mb-2">Collaborators</div>
                <div className="space-y-3">
                  {subscription.collaborators.map((collaborator) => (
                    <div key={collaborator.id} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {collaborator.initials}
                      </div>
                      <div>
                        <div className="font-medium">{collaborator.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Collaborator
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Change Account Manager Dialog */}
      <Dialog open={showChangeManagerDialog} onOpenChange={setShowChangeManagerDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Account Manager</DialogTitle>
            <DialogDescription>
              Select a new account manager for this subscription.
            </DialogDescription>
          </DialogHeader>
          <Select value={selectedManagerId} onValueChange={setSelectedManagerId}>
            <SelectTrigger>
              <SelectValue placeholder="Select account manager" />
            </SelectTrigger>
            <SelectContent>
              {accountManagers.map((manager) => (
                <SelectItem key={manager.id} value={manager.id}>
                  {manager.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChangeManagerDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleChangeManager} disabled={!selectedManagerId}>
              Change Manager
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pause Dialog */}
      <AlertDialog open={showPauseDialog} onOpenChange={setShowPauseDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Pause Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to pause this subscription? Billing will be paused until you resume it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handlePauseSubscription}>
              Pause Subscription
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cancel Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this subscription? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelSubscription}
              className="bg-red-600 hover:bg-red-700"
            >
              Cancel Subscription
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Charge Now Dialog */}
      <AlertDialog open={showChargeDialog} onOpenChange={setShowChargeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Process Payment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to process a payment of {formatCurrency(subscription.service.price)} now?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleChargeNow}>
              Process Payment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}