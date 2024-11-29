import { useParams } from 'react-router-dom';
import { ClientHeader } from '@/components/clients/client-details/client-header';
import { ClientInfo } from '@/components/clients/client-details/client-info';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClientTickets } from '@/components/clients/client-details/client-tickets';
import { ClientBrands } from '@/components/clients/client-details/client-brands';
import { ClientSubscriptions } from '@/components/clients/client-details/client-subscriptions';
import { ClientInvoices } from '@/components/clients/client-details/client-invoices';
import { ClientFiles } from '@/components/clients/client-details/client-files';

export function ClientDetailsPage() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <ClientHeader />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ClientInfo />
        </div>
        <div className="lg:col-span-2">
          <Tabs defaultValue="tickets" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
              <TabsTrigger value="brands">Brands</TabsTrigger>
              <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
            </TabsList>
            <TabsContent value="tickets" className="mt-6">
              <ClientTickets />
            </TabsContent>
            <TabsContent value="brands" className="mt-6">
              <ClientBrands />
            </TabsContent>
            <TabsContent value="subscriptions" className="mt-6">
              <ClientSubscriptions />
            </TabsContent>
            <TabsContent value="invoices" className="mt-6">
              <ClientInvoices />
            </TabsContent>
            <TabsContent value="files" className="mt-6">
              <ClientFiles />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}