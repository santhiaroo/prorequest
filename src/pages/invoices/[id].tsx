import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Building2,
  Download,
  ExternalLink,
  Clock,
  Calendar,
  CreditCard,
  Receipt,
  CheckCircle2,
  History,
  Copy,
  Globe,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { formatCurrency } from '@/lib/format';
import { formatDistanceToNow } from '@/lib/date';
import { useToast } from '@/hooks/use-toast';

// Mock data for the invoice details
const mockInvoice = {
  id: 'INV-2024-001',
  status: 'paid',
  amount: 2499,
  currency: 'USD',
  dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15), // 15 days from now
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  paidAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  agency: {
    name: 'ProRequests Agency',
    legalName: 'ProRequests LLC',
    taxId: 'TAX-123456789',
    email: 'billing@prorequests.com',
    phone: '+1 (555) 123-4567',
    website: 'https://prorequests.com',
    address: '123 Agency Street, Tech City, TC 12345',
  },
  client: {
    id: 'CLT-001',
    name: 'John Smith',
    company: 'Acme Corporation',
    email: 'john@acmecorp.com',
    phone: '+1 (555) 987-6543',
    address: '456 Client Avenue, Business City, BC 67890',
    taxId: 'TAX-987654321',
  },
  service: {
    id: 'SRV-001',
    name: 'Website Design Package',
    description: 'Complete website design and development package',
  },
  subscription: {
    id: 'SUB-2024-001',
    name: 'Monthly SEO Package',
  },
  items: [
    {
      id: 1,
      name: 'Website Design Package',
      description: 'Custom design with modern UI/UX',
      quantity: 1,
      price: 2499,
      discount: 0,
    }
  ],
  subtotal: 2499,
  discount: 0,
  tax: 0,
  total: 2499,
  notes: 'Thank you for your business!',
  paymentMethod: {
    type: 'credit_card',
    brand: 'visa',
    last4: '4242',
  },
  stripePaymentId: 'pi_1234567890',
  createdBy: {
    id: 'USR-001',
    name: 'Sarah Wilson',
    role: 'Account Manager',
  },
  history: [
    {
      id: '1',
      action: 'Invoice Created',
      actor: 'Sarah Wilson',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    },
    {
      id: '2',
      action: 'Payment Received',
      actor: 'System',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    }
  ]
};

export function InvoiceDetailsPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const invoice = mockInvoice; // In a real app, fetch based on id

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: `${label} copied to clipboard`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/10 text-green-500';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'overdue':
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
            <Link to="/invoices">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Invoices
            </Link>
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Invoice {invoice.id}</h1>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => copyToClipboard(invoice.id, 'Invoice ID')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to={`/clients/${invoice.client.id}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Building2 className="h-4 w-4" />
                <span>{invoice.client.company}</span>
              </Link>
              <Badge className={getStatusColor(invoice.status)}>
                {invoice.status}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" onClick={() => window.open(`https://dashboard.stripe.com/payments/${invoice.stripePaymentId}`, '_blank')}>
              <ExternalLink className="h-4 w-4 mr-2" />
              View in Stripe
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Business & Client Details */}
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Agency Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{invoice.agency.name}</h3>
                    <p className="text-sm text-muted-foreground">{invoice.agency.legalName}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{invoice.agency.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{invoice.agency.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span>{invoice.agency.website}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span>{invoice.agency.address}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Tax ID: </span>
                      {invoice.agency.taxId}
                    </div>
                  </div>
                </div>

                {/* Client Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">Bill To</h3>
                    <div className="space-y-1">
                      <p className="font-medium">{invoice.client.company}</p>
                      <p className="text-sm">{invoice.client.name}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{invoice.client.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{invoice.client.phone}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span>{invoice.client.address}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Tax ID: </span>
                      {invoice.client.taxId}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Details */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Due Date</div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDistanceToNow(invoice.dueDate)}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Created</div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(invoice.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Payment Method</div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="capitalize">
                      {invoice.paymentMethod.brand} •••• {invoice.paymentMethod.last4}
                    </span>
                  </div>
                </div>
                {invoice.paidAt && (
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Paid</div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDistanceToNow(invoice.paidAt)} ago</span>
                    </div>
                  </div>
                )}
              </div>

              {invoice.subscription && (
                <>
                  <Separator />
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Associated Subscription</div>
                    <Button variant="outline" className="h-auto" asChild>
                      <Link to={`/subscriptions/${invoice.subscription.id}`}>
                        <Receipt className="h-4 w-4 mr-2" />
                        {invoice.subscription.name}
                      </Link>
                    </Button>
                  </div>
                </>
              )}

              <Separator />

              {/* Invoice Items */}
              <div>
                <h3 className="font-medium mb-4">Items</h3>
                <div className="space-y-4">
                  {invoice.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="space-y-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.description}
                        </div>
                        <div className="text-sm">
                          {formatCurrency(item.price)} × {item.quantity}
                          {item.discount > 0 && ` (-${item.discount}% off)`}
                        </div>
                      </div>
                      <div className="text-right font-medium">
                        {formatCurrency(item.price * item.quantity * (1 - item.discount / 100))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatCurrency(invoice.subtotal)}</span>
                </div>
                {invoice.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Discount</span>
                    <span>-{formatCurrency(invoice.discount)}</span>
                  </div>
                )}
                {invoice.tax > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>{formatCurrency(invoice.tax)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(invoice.total)}</span>
                </div>
              </div>

              {invoice.notes && (
                <>
                  <Separator />
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Notes</div>
                    <p className="text-sm text-muted-foreground">{invoice.notes}</p>
                  </div>
                </>
              )}

              {invoice.createdBy && (
                <>
                  <Separator />
                  <div className="text-sm text-muted-foreground">
                    Invoice created by {invoice.createdBy.name} ({invoice.createdBy.role})
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Activity History */}
          <Card>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoice.history.map((event) => (
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
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to={`/clients/${invoice.client.id}`}>
                    <Building2 className="h-4 w-4 mr-2" />
                    View Client
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to={`/services/${invoice.service.id}`}>
                    <Receipt className="h-4 w-4 mr-2" />
                    View Service
                  </Link>
                </Button>
                {invoice.subscription && (
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link to={`/subscriptions/${invoice.subscription.id}`}>
                      <Clock className="h-4 w-4 mr-2" />
                      View Subscription
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment Transaction */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Transaction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium">Transaction ID</div>
                <Button
                  variant="link"
                  className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => copyToClipboard(invoice.stripePaymentId, 'Transaction ID')}
                >
                  {invoice.stripePaymentId}
                  <Copy className="h-3 w-3 ml-1" />
                </Button>
              </div>
              <div>
                <div className="text-sm font-medium">Payment Method</div>
                <div className="text-sm text-muted-foreground capitalize">
                  {invoice.paymentMethod.brand} ending in {invoice.paymentMethod.last4}
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(`https://dashboard.stripe.com/payments/${invoice.stripePaymentId}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View in Stripe
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}