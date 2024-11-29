import { StoreBanner } from '@/components/store/store-banner';
import { ServiceGrid } from '@/components/store/service-grid';
import { HowItWorks } from '@/components/store/how-it-works';
import { FAQSection } from '@/components/store/faq-section';
import { StoreFooter } from '@/components/store/store-footer';

export function StorePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StoreBanner />
      <main className="flex-1">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="space-y-24 py-12">
            <ServiceGrid />
            <HowItWorks />
            <FAQSection />
          </div>
        </div>
      </main>
      <StoreFooter />
    </div>
  );
}