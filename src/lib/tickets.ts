import { Ticket } from '@/types';

export function getTicketStatusColor(status: Ticket['status']): string {
  switch (status) {
    case 'new':
      return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
    case 'in-progress':
      return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
    case 'review':
      return 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20';
    case 'completed':
      return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
    default:
      return '';
  }
}

export function getTicketPriorityColor(priority: Ticket['priority']): string {
  switch (priority) {
    case 'high':
      return 'border-red-500 text-red-500';
    case 'medium':
      return 'border-yellow-500 text-yellow-500';
    case 'low':
      return 'border-green-500 text-green-500';
    default:
      return '';
  }
}