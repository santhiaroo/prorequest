export interface TeamMember {
  name: string;
  avatar: string;
  initials: string;
  role: 'account_manager' | 'project_manager';
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  avatar: string;
  initials: string;
  status: 'active' | 'inactive';
  teamMembers: TeamMember[];
  activeProjects: number;
}

export const mockClients: Client[] = [
  {
    id: 'CLT-001',
    name: 'John Smith',
    email: 'john@acmecorp.com',
    company: 'Acme Corporation',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    initials: 'JS',
    status: 'active',
    teamMembers: [
      {
        name: 'Sarah Wilson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        initials: 'SW',
        role: 'account_manager'
      },
      {
        name: 'Mike Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        initials: 'MJ',
        role: 'project_manager'
      }
    ],
    activeProjects: 3
  },
  {
    id: 'CLT-002',
    name: 'Emma Davis',
    email: 'emma@techstart.io',
    company: 'TechStart',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    initials: 'ED',
    status: 'active',
    teamMembers: [
      {
        name: 'Tom Brown',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom',
        initials: 'TB',
        role: 'account_manager'
      }
    ],
    activeProjects: 2
  },
  {
    id: 'CLT-003',
    name: 'Michael Chen',
    email: 'michael@designstudio.com',
    company: 'Design Studio',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    initials: 'MC',
    status: 'inactive',
    teamMembers: [
      {
        name: 'Lisa Park',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
        initials: 'LP',
        role: 'project_manager'
      }
    ],
    activeProjects: 1
  }
];