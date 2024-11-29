import { useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { StoreBanner } from '@/components/store/store-banner';
import { StoreFooter } from '@/components/store/store-footer';
import { ServiceFeatures } from '@/components/store/service-features';
import { ServiceProcess } from '@/components/store/service-process';
import { ServiceFAQ } from '@/components/store/service-faq';
import { ServiceGuarantees } from '@/components/store/service-guarantees';
import { Clock, CheckCircle2, Ticket } from 'lucide-react';
import { mockStoreServices } from '@/components/store/mock-data';
import { formatCurrency } from '@/lib/format';

export function ServiceDetailsPage() {
  const { id } = useParams();
  const service = mockStoreServices.find(s => s.id === id);

  if (!service) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StoreBanner minimal />
      <main className="flex-1">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 py-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Section */}
              <div className="space-y-6">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h1 className="text-3xl font-bold tracking-tight">{service.name}</h1>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Verified Service
                    </Badge>
                  </div>
                  <p className="text-lg text-muted-foreground">{service.description}</p>
                </div>
              </div>

              <Separator />

              {/* Service Features */}
              <ServiceFeatures features={service.features} />

              {/* Service Process */}
              <ServiceProcess />

              {/* FAQ */}
              <ServiceFAQ />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing Card */}
              <div className="sticky top-6">
                <div className="rounded-lg border bg-card p-6 space-y-6">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {formatCurrency(service.price)}
                      {service.isSubscription && (
                        <span className="text-base font-normal text-muted-foreground ml-1">
                          /{service.interval}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      Turnaround: {service.turnaround}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Ticket className="h-4 w-4 mr-2" />
                      Unlimited revisions included
                    </div>
                  </div>

                  <Button size="lg" className="w-full" asChild>
                    <Link to={`/store/${service.id}/checkout`}>
                      Get Started Now
                    </Link>
                  </Button>

                  <ServiceGuarantees />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <StoreFooter />
    </div>
  );
}