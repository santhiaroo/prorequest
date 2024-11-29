export interface Subscription {
  id: string;
  clientId: string;
  serviceId: string;
  clientName: string;
  clientEmail: string;
  serviceName: string;
  status: 'active' | 'past_due' | 'canceled';
  amount: number;
  interval: 'month' | 'year';
  paymentsCount: number;
  lastPaymentDate: string;
  nextBillingDate: string;
}

export const mockSubscriptions: Subscription[] = [
  {
    id: 'SUB-2024-001',
    clientId: 'CLT-001',
    serviceId: 'SRV-001',
    clientName: 'Acme Corp',
    clientEmail: 'billing@acmecorp.com',
    serviceName: 'Monthly SEO Service',
    status: 'active',
    amount: 799,
    interval: 'month',
    paymentsCount: 6,
    lastPaymentDate: '2024-03-01',
    nextBillingDate: '2024-04-01',
  },
  {
    id: 'SUB-2024-002',
    clientId: 'CLT-002',
    serviceId: 'SRV-002',
    clientName: 'TechStart',
    clientEmail: 'finance@techstart.io',
    serviceName: 'Social Media Management',
    status: 'past_due',
    amount: 599,
    interval: 'month',
    paymentsCount: 3,
    lastPaymentDate: '2024-02-15',
    nextBillingDate: '2024-03-15',
  },
  {
    id: 'SUB-2024-003',
    clientId: 'CLT-003',
    serviceId: 'SRV-003',
    clientName: 'Design Studio',
    clientEmail: 'accounts@designstudio.com',
    serviceName: 'Website Maintenance',
    status: 'active',
    amount: 1999,
    interval: 'year',
    paymentsCount: 1,
    lastPaymentDate: '2024-01-01',
    nextBillingDate: '2025-01-01',
  },
];