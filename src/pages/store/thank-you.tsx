import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowRight, Ticket } from 'lucide-react';
import { StoreBanner } from '@/components/store/store-banner';
import { formatCurrency } from '@/lib/format';

export function ThankYouPage() {
  // Mock data - in real app, this would come from the order/subscription details
  const orderDetails = {
    type: 'subscription', // or 'order'
    id: 'SUB-2024-001',
    invoiceId: 'INV-2024-001',
    serviceName: 'Monthly SEO Service',
    amount: 799,
    interval: 'month',
    date: new Date().toLocaleDateString(),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StoreBanner minimal />
      <main className="flex-1 py-12">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Thank You for Your Purchase!
            </h1>
            <p className="text-muted-foreground">
              Your {orderDetails.type === 'subscription' ? 'subscription' : 'order'} has been confirmed
            </p>
          </div>

          <div className="space-y-6">
            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {orderDetails.type === 'subscription' ? 'Subscription' : 'Order'} ID
                    </span>
                    <span className="font-medium">{orderDetails.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Invoice ID</span>
                    <span className="font-medium">{orderDetails.invoiceId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service</span>
                    <span className="font-medium">{orderDetails.serviceName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium">
                      {formatCurrency(orderDetails.amount)}
                      {orderDetails.interval && `/${orderDetails.interval}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">{orderDetails.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Button size="lg" className="w-full" asChild>
                    <Link to="/client/dashboard">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full" asChild>
                    <Link to="/client/tickets/new">
                      <Ticket className="mr-2 h-4 w-4" />
                      Submit Ticket
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Status Badge */}
            <div className="flex justify-center">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Payment Successful
              </Badge>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}