import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { HeaderMinimal } from './header-minimal';
import { DashboardPage } from '@/pages/dashboard';
import { ServicesPage } from '@/pages/services';
import { ServiceDetailsPage } from '@/pages/services/[id]';
import { NewServicePage } from '@/pages/services/new';
import { TicketsPage } from '@/pages/tickets';
import { TicketDetailsPage } from '@/pages/tickets/[id]';
import { SettingsPage } from '@/pages/settings';
import { ClientPortalPage } from '@/pages/client';
import { SubscriptionsPage } from '@/pages/subscriptions';
import { SubscriptionDetailsPage } from '@/pages/subscriptions/[id]';
import { InvoicesPage } from '@/pages/invoices';
import { InvoiceDetailsPage } from '@/pages/invoices/[id]';
import { NewInvoicePage } from '@/pages/invoices/new';
import { ClientsPage } from '@/pages/clients';
import { ClientDetailsPage } from '@/pages/clients/[id]';
import { BrandsPage } from '@/pages/brands';
import { BrandDetailsPage } from '@/pages/brands/[id]';
import { BillingPage } from '@/pages/billing';
import { StorePage } from '@/pages/store';
import { ServiceDetailsPage as PublicServiceDetailsPage } from '@/pages/store/[id]';
import { CheckoutPage } from '@/pages/store/checkout';
import { ThankYouPage } from '@/pages/store/thank-you';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/client/*" element={<ClientPortalPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/store/:id" element={<PublicServiceDetailsPage />} />
        <Route path="/store/:id/checkout" element={<CheckoutPage />} />
        <Route path="/store/thank-you" element={<ThankYouPage />} />
        <Route
          path="*"
          element={
            <div className="flex h-screen overflow-hidden">
              <Sidebar className="w-64 shrink-0 border-r" />
              <div className="flex-1 flex flex-col">
                <HeaderMinimal />
                <main className="flex-1 overflow-y-auto">
                  <div className="container max-w-[1200px] mx-auto py-6 px-4">
                    <Routes>
                      <Route path="/" element={<DashboardPage />} />
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/clients" element={<ClientsPage />} />
                      <Route path="/clients/:id" element={<ClientDetailsPage />} />
                      <Route path="/brands" element={<BrandsPage />} />
                      <Route path="/brands/:id" element={<BrandDetailsPage />} />
                      <Route path="/services" element={<ServicesPage />} />
                      <Route path="/services/new" element={<NewServicePage />} />
                      <Route path="/services/:id" element={<ServiceDetailsPage />} />
                      <Route path="/tickets" element={<TicketsPage />} />
                      <Route path="/tickets/:id" element={<TicketDetailsPage />} />
                      <Route path="/subscriptions" element={<SubscriptionsPage />} />
                      <Route path="/subscriptions/:id" element={<SubscriptionDetailsPage />} />
                      <Route path="/invoices" element={<InvoicesPage />} />
                      <Route path="/invoices/new" element={<NewInvoicePage />} />
                      <Route path="/invoices/:id" element={<InvoiceDetailsPage />} />
                      <Route path="/billing" element={<BillingPage />} />
                      <Route path="/settings/*" element={<SettingsPage />} />
                    </Routes>
                  </div>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}