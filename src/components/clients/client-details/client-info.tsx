import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from '@/lib/date';
import { formatCurrency } from '@/lib/format';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockClientDetails } from './mock-data';

export function ClientInfo() {
  const client = mockClientDetails;
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Info */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={client.avatar} />
            <AvatarFallback>{client.initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{client.name}</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-muted-foreground hover:text-foreground"
              onClick={() => copyToClipboard(client.email, 'Email')}
            >
              {client.email}
              <Copy className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Account Details */}
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium">Created</div>
            <div className="text-sm text-muted-foreground">
              {formatDistanceToNow(client.createdAt)} ago
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Last Login</div>
            <div className="text-sm text-muted-foreground">
              {formatDistanceToNow(client.lastLogin)} ago from {client.ipAddress}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Company</div>
            <div className="text-sm text-muted-foreground">{client.company}</div>
          </div>
          <div>
            <div className="text-sm font-medium">Address</div>
            <div className="text-sm text-muted-foreground">{client.address}</div>
          </div>
        </div>

        <Separator />

        {/* Purchase Stats */}
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium">Total Purchases</div>
            <div className="text-sm text-muted-foreground">
              {client.totalPurchases} purchases
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Total Spent</div>
            <div className="text-sm text-muted-foreground">
              {formatCurrency(client.totalSpent)}
            </div>
          </div>
        </div>

        <Separator />

        {/* IDs */}
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium">Stripe Customer ID</div>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-muted-foreground hover:text-foreground"
              onClick={() => copyToClipboard(client.stripeCustomerId, 'Stripe ID')}
            >
              {client.stripeCustomerId}
              <Copy className="h-3 w-3 ml-1" />
            </Button>
          </div>
          <div>
            <div className="text-sm font-medium">Click ID</div>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-muted-foreground hover:text-foreground"
              onClick={() => copyToClipboard(client.clickId, 'Click ID')}
            >
              {client.clickId}
              <Copy className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Team */}
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium mb-2">Account Managers</div>
            {client.accountManagers.map((manager) => (
              <Button
                key={manager.id}
                variant="ghost"
                className="w-full justify-start p-2 h-auto"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={manager.avatar} />
                    <AvatarFallback>{manager.initials}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="font-medium">{manager.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {manager.role}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Collaborators</div>
            {client.collaborators.map((collaborator) => (
              <Button
                key={collaborator.id}
                variant="ghost"
                className="w-full justify-start p-2 h-auto"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={collaborator.avatar} />
                    <AvatarFallback>{collaborator.initials}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="font-medium">{collaborator.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {collaborator.role}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}