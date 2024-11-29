import { Ticket } from '@/types';

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  role: string;
}

export const mockTickets: (Ticket & {
  clientName: string;
  clientCompany: string;
  dueDate: string;
  assignedTeam: TeamMember[];
})[] = [
  {
    id: 'TKT-001',
    serviceId: '1',
    clientId: 'client1',
    workspaceId: 'workspace1',
    status: 'new',
    priority: 'high',
    title: 'Website Redesign Project',
    description: 'Complete redesign of the main website with modern UI/UX principles',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    clientName: 'John Smith',
    clientCompany: 'Acme Corp',
    dueDate: '2024-03-15',
    assignedTeam: [
      {
        id: '1',
        name: 'Sarah Wilson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        initials: 'SW',
        role: 'Project Manager'
      },
      {
        id: '2',
        name: 'Mike Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        initials: 'MJ',
        role: 'Designer'
      }
    ],
    customFields: {}
  },
  {
    id: 'TKT-002',
    serviceId: '2',
    clientId: 'client2',
    workspaceId: 'workspace1',
    status: 'in-progress',
    priority: 'medium',
    title: 'SEO Optimization',
    description: 'Monthly SEO optimization and content updates',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    clientName: 'Emma Davis',
    clientCompany: 'TechStart',
    dueDate: '2024-03-20',
    assignedTeam: [
      {
        id: '3',
        name: 'Tom Brown',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom',
        initials: 'TB',
        role: 'SEO Specialist'
      }
    ],
    customFields: {}
  }
];