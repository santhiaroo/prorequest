import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { StoreService } from '@/components/store/types';
import { formatCurrency } from '@/lib/format';
import { useState } from 'react';

interface OrderSummaryProps {
  service: StoreService;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export function OrderSummary({ service, quantity, onQuantityChange }: OrderSummaryProps) {
  const [promoCode, setPromoCode] = useState('');
  const subtotal = service.price * quantity;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium">{service.name}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
            <div className="text-right">
              <div className="font-medium">{formatCurrency(service.price)}</div>
              {service.isSubscription && (
                <div className="text-sm text-muted-foreground">
                  per {service.interval}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm font-medium">Quantity:</div>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => onQuantityChange(parseInt(e.target.value) || 1)}
              className="w-20"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <Button variant="outline">Apply</Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}