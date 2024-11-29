import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  CircleDollarSign,
  Users,
  TicketCheck,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import { formatCurrency } from '@/lib/format';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { RecentClients } from '@/components/dashboard/recent-clients';
import { RecentTickets } from '@/components/dashboard/recent-tickets';
import { RecentServices } from '@/components/dashboard/recent-services';
import { RecentBrands } from '@/components/dashboard/recent-brands';
import { RecentSubscriptions } from '@/components/dashboard/recent-subscriptions';
import { RecentInvoices } from '@/components/dashboard/recent-invoices';

// Mock data for different time periods
const timePeriodsData = {
  today: {
    totalRevenue: 1234,
    revenueChange: 12,
    mrrRevenue: 799,
    mrrChange: 5,
    activeClients: 12,
    newClients: 2,
    openTickets: 5,
  },
  '7': {
    totalRevenue: 8234,
    revenueChange: 15,
    mrrRevenue: 2499,
    mrrChange: 8,
    activeClients: 15,
    newClients: 3,
    openTickets: 8,
  },
  '30': {
    totalRevenue: 32456,
    revenueChange: 25,
    mrrRevenue: 9999,
    mrrChange: 12,
    activeClients: 25,
    newClients: 8,
    openTickets: 12,
  },
  '90': {
    totalRevenue: 98765,
    revenueChange: 35,
    mrrRevenue: 24999,
    mrrChange: 18,
    activeClients: 45,
    newClients: 15,
    openTickets: 18,
  },
  '365': {
    totalRevenue: 456789,
    revenueChange: 45,
    mrrRevenue: 49999,
    mrrChange: 25,
    activeClients: 85,
    newClients: 35,
    openTickets: 25,
  },
};

export function DashboardPage() {
  const [timePeriod, setTimePeriod] = useState('30');
  const data = timePeriodsData[timePeriod];

  const handleOpenStripe = (path: string) => {
    window.open(`https://dashboard.stripe.com/${path}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Overview of your workspace activity and metrics
          </p>
        </div>
        <Select value={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last quarter</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card 
          className="cursor-pointer transition-colors hover:bg-accent/50"
          onClick={() => handleOpenStripe('payments')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                Total Revenue
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">{formatCurrency(data.totalRevenue)}</div>
              <div className="flex items-center text-sm text-green-500">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                {data.revenueChange}% from last period
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer transition-colors hover:bg-accent/50"
          onClick={() => handleOpenStripe('subscriptions')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                Monthly Recurring Revenue
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">{formatCurrency(data.mrrRevenue)}</div>
              <div className="flex items-center text-sm text-green-500">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                {data.mrrChange}% from last period
              </div>
            </div>
          </CardContent>
        </Card>

        <Link to="/clients" className="block">
          <Card className="transition-colors hover:bg-accent/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <div className="text-sm font-medium">Active Clients</div>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{data.activeClients}</div>
                <div className="flex items-center text-sm text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  {data.newClients} new clients
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/tickets" className="block">
          <Card className="transition-colors hover:bg-accent/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <div className="text-sm font-medium">Open Tickets</div>
                <TicketCheck className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{data.openTickets}</div>
                <div className="text-sm text-muted-foreground">
                  8 require attention
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <RevenueChart period={timePeriod} />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Tabs defaultValue="clients" className="space-y-4">
          <TabsList>
            <TabsTrigger value="clients">Recent Clients</TabsTrigger>
            <TabsTrigger value="tickets">Recent Tickets</TabsTrigger>
            <TabsTrigger value="services">Recent Services</TabsTrigger>
          </TabsList>
          <TabsContent value="clients" className="space-y-4">
            <RecentClients />
          </TabsContent>
          <TabsContent value="tickets" className="space-y-4">
            <RecentTickets />
          </TabsContent>
          <TabsContent value="services" className="space-y-4">
            <RecentServices />
          </TabsContent>
        </Tabs>

        <Tabs defaultValue="brands" className="space-y-4">
          <TabsList>
            <TabsTrigger value="brands">Recent Brands</TabsTrigger>
            <TabsTrigger value="subscriptions">Recent Subscriptions</TabsTrigger>
            <TabsTrigger value="invoices">Recent Invoices</TabsTrigger>
          </TabsList>
          <TabsContent value="brands" className="space-y-4">
            <RecentBrands />
          </TabsContent>
          <TabsContent value="subscriptions" className="space-y-4">
            <RecentSubscriptions />
          </TabsContent>
          <TabsContent value="invoices" className="space-y-4">
            <RecentInvoices />
          </TabsContent>
        </Tabs>
      </div>

      <div className="text-sm text-muted-foreground">
        All times in America / New York timezone. Data from 42 minutes ago.
      </div>
    </div>
  );
}