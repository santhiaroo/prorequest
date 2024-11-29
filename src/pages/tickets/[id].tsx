import { useParams } from 'react-router-dom';
import { TicketHeader } from '@/components/tickets/ticket-details/ticket-header';
import { TicketMeta } from '@/components/tickets/ticket-details/ticket-meta';
import { TicketBrief } from '@/components/tickets/ticket-details/ticket-brief';
import { TicketBilling } from '@/components/tickets/ticket-details/ticket-billing';
import { TicketChat } from '@/components/tickets/ticket-details/ticket-chat';
import { TicketFiles } from '@/components/tickets/ticket-details/ticket-files';
import { TicketIntakeForm } from '@/components/tickets/ticket-details/ticket-intake-form';
import { TicketHistory } from '@/components/tickets/ticket-details/ticket-history';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function TicketDetailsPage() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <TicketHeader />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TicketBrief />
          <TicketBilling />
          <Tabs defaultValue="discussion" className="w-full">
            <TabsList>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="intake">Intake Form</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="discussion" className="space-y-4">
              <TicketChat />
            </TabsContent>
            <TabsContent value="files">
              <TicketFiles />
            </TabsContent>
            <TabsContent value="intake">
              <TicketIntakeForm />
            </TabsContent>
            <TabsContent value="history">
              <TicketHistory />
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <TicketMeta />
        </div>
      </div>
    </div>
  );
}