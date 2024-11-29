import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { StoreBanner } from '@/components/store/store-banner';
import { CheckoutForm } from '@/components/checkout/checkout-form';
import { OrderSummary } from '@/components/checkout/order-summary';
import { SecurityBadges } from '@/components/checkout/security-badges';
import { mockStoreServices } from '@/components/store/mock-data';

export function CheckoutPage() {
  const { id } = useParams();
  const service = mockStoreServices.find(s => s.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!service) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StoreBanner minimal />
      <main className="flex-1 py-8">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <CheckoutForm />
              <SecurityBadges />
            </div>
            <div>
              <OrderSummary 
                service={service}
                quantity={quantity}
                onQuantityChange={setQuantity}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}