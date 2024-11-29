import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WorkspaceDetails } from '@/components/settings/workspace-details';
import { PaymentSettings } from '@/components/settings/payment-settings';
import { StoreSettings } from '@/components/settings/store-settings';
import { TeamSettings } from '@/components/settings/team-settings';
import { BrandingSettings } from '@/components/settings/branding-settings';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Workspace Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your workspace preferences and configuration
        </p>
      </div>
      <div className="space-y-6">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none px-0 h-12">
            <TabsTrigger value="details" className="rounded-none data-[state=active]:bg-background">
              Workspace Details
            </TabsTrigger>
            <TabsTrigger value="payment" className="rounded-none data-[state=active]:bg-background">
              Payment
            </TabsTrigger>
            <TabsTrigger value="store" className="rounded-none data-[state=active]:bg-background">
              Store
            </TabsTrigger>
            <TabsTrigger value="team" className="rounded-none data-[state=active]:bg-background">
              Team
            </TabsTrigger>
            <TabsTrigger value="branding" className="rounded-none data-[state=active]:bg-background">
              Branding
            </TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="details" className="mt-0 border-none p-0">
              <WorkspaceDetails />
            </TabsContent>
            <TabsContent value="payment" className="mt-0 border-none p-0">
              <PaymentSettings />
            </TabsContent>
            <TabsContent value="store" className="mt-0 border-none p-0">
              <StoreSettings />
            </TabsContent>
            <TabsContent value="team" className="mt-0 border-none p-0">
              <TeamSettings />
            </TabsContent>
            <TabsContent value="branding" className="mt-0 border-none p-0">
              <BrandingSettings />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}