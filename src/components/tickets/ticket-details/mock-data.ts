import { Ticket } from '@/types';

export const mockTicketDetails = {
  id: 'TKT-001',
  title: 'Website Redesign Project',
  description: 'Complete redesign of our company website to improve user experience and conversion rates. The new design should reflect our updated brand guidelines and incorporate modern design trends.\n\nKey Requirements:\n- Mobile-first responsive design\n- Improved navigation structure\n- Integration with our CMS\n- Performance optimization\n- SEO-friendly architecture',
  status: 'in-progress' as const,
  priority: 'high' as const,
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
  client: {
    id: '1',
    name: 'John Smith',
    company: 'Acme Corp',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    initials: 'JS',
    brands: [
      {
        id: '1',
        name: 'Acme Brand',
        logo: 'https://via.placeholder.com/40',
        initials: 'AB',
      },
      {
        id: '2',
        name: 'Acme Pro',
        logo: 'https://via.placeholder.com/40',
        initials: 'AP',
      }
    ]
  },
  assignedTeam: [
    {
      id: '1',
      name: 'Sarah Wilson',
      role: 'Project Manager',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      initials: 'SW',
    },
    {
      id: '2',
      name: 'Mike Johnson',
      role: 'Designer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      initials: 'MJ',
    }
  ],
  service: {
    name: 'Website Design Package',
    isSubscription: false,
  },
  brand: {
    id: '1',
    name: 'Acme Brand',
    logo: 'https://via.placeholder.com/40',
    initials: 'AB',
  },
  intakeForm: {
    businessGoals: 'Increase online presence and generate more leads',
    targetAudience: 'Small to medium-sized businesses',
    competitors: 'Company A, Company B',
    brandGuidelines: 'https://example.com/brand-guidelines.pdf',
    colorPreferences: 'Blue and white',
  },
};

export const mockTicketMessages = [
  {
    id: '1',
    author: {
      name: 'John Smith',
      role: 'Client',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      initials: 'JS',
    },
    content: 'Hi team, looking forward to starting the website redesign project!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isPrivate: false,
  },
  {
    id: '2',
    author: {
      name: 'Sarah Wilson',
      role: 'Project Manager',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      initials: 'SW',
    },
    content: "Team, let's review the requirements before our kick-off call.\n\n@Mike please prepare the initial mockups.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    isPrivate: true,
    files: [
      { name: 'requirements.pdf', url: '#' }
    ]
  },
];

export const mockTicketHistory = [
  {
    id: '1',
    action: 'Ticket Created',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    actor: 'John Smith',
  },
  {
    id: '2',
    action: 'Status Changed to In Progress',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    actor: 'Sarah Wilson',
  },
  {
    id: '3',
    action: 'Team Member Added: Mike Johnson',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    actor: 'Sarah Wilson',
  },
];