import { Ticket } from '@/types';

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'Acme Brand',
    logo: 'https://via.placeholder.com/40',
  },
  {
    id: '2',
    name: 'Tech Solutions',
    logo: 'https://via.placeholder.com/40',
  },
];

export const mockClientTickets: Ticket[] = [
  {
    id: '1',
    serviceId: '1',
    clientId: 'client1',
    workspaceId: 'workspace1',
    status: 'in-progress',
    priority: 'high',
    title: 'Website Redesign Phase 1',
    description: 'Homepage and product catalog redesign',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
    customFields: {},
  },
  {
    id: '2',
    serviceId: '2',
    clientId: 'client1',
    workspaceId: 'workspace1',
    status: 'review',
    priority: 'medium',
    title: 'March SEO Updates',
    description: 'Monthly SEO optimization and reporting',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    customFields: {},
  },
];