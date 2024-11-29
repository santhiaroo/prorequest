export interface Invoice {
  id: string;
  number: string;
  clientName: string;
  clientEmail: string;
  clientId: string;
  serviceId: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'refunded';
  createdDate: string;
  paidDate?: string;
}

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    number: 'INV-2024-001',
    clientName: 'Acme Corp',
    clientEmail: 'billing@acmecorp.com',
    clientId: 'CLT-001',
    serviceId: 'SRV-001',
    amount: 799,
    status: 'paid',
    createdDate: '2024-03-01',
    paidDate: '2024-03-02',
  },
  {
    id: '2',
    number: 'INV-2024-002',
    clientName: 'TechStart',
    clientEmail: 'finance@techstart.io',
    clientId: 'CLT-002',
    serviceId: 'SRV-002',
    amount: 599,
    status: 'pending',
    createdDate: '2024-03-05',
  },
  {
    id: '3',
    number: 'INV-2024-003',
    clientName: 'Design Studio',
    clientEmail: 'accounts@designstudio.com',
    clientId: 'CLT-003',
    serviceId: 'SRV-003',
    amount: 1999,
    status: 'refunded',
    createdDate: '2024-02-15',
    paidDate: '2024-02-16',
  },
  {
    id: '4',
    number: 'INV-2024-004',
    clientName: 'Global Solutions',
    clientEmail: 'ap@globalsolutions.com',
    clientId: 'CLT-004',
    serviceId: 'SRV-004',
    amount: 2499,
    status: 'overdue',
    createdDate: '2024-02-01',
  },
];