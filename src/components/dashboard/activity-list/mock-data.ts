import { Activity } from './types';

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'ticket',
    action: 'New Ticket',
    description: 'Website redesign project submitted',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: '2',
    type: 'service',
    action: 'Service Updated',
    description: 'Monthly SEO package price updated',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
];