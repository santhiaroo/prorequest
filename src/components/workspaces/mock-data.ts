import { Workspace } from '@/types';

export const mockWorkspaces: Workspace[] = [
  {
    id: '1',
    name: 'Acme Corp',
    domain: 'acme.prorequests.com',
    branding: {
      logo: 'https://via.placeholder.com/150',
      colors: {
        primary: '#2563eb',
        secondary: '#7c3aed',
      },
    },
  },
  {
    id: '2',
    name: 'TechStart',
    domain: 'techstart.prorequests.com',
    branding: {
      logo: 'https://via.placeholder.com/150',
      colors: {
        primary: '#16a34a',
        secondary: '#0891b2',
      },
    },
  },
  {
    id: '3',
    name: 'Design Studio',
    domain: 'designstudio.prorequests.com',
    branding: {
      logo: 'https://via.placeholder.com/150',
      colors: {
        primary: '#dc2626',
        secondary: '#ea580c',
      },
    },
  },
];