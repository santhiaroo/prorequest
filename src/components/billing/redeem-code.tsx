import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export function RedeemCode() {
  const [code, setCode] = useState('');
  const { toast } = useToast();

  const handleRedeem = () => {
    // Simulate code validation
    if (code.toLowerCase() === 'lifetime2024') {
      toast({
        title: 'Success!',
        description: 'Your account has been upgraded to lifetime access.',
        variant: 'default',
      });
      setCode('');
    } else {
      toast({
        title: 'Invalid Code',
        description: 'Please check your code and try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Redeem Code</CardTitle>
        <CardDescription>
          Have a lifetime access code? Enter it below to upgrade your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Input
            placeholder="Enter your code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button onClick={handleRedeem}>
            Redeem
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}