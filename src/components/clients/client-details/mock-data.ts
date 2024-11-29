export const mockClientDetails = {
  id: 'CLT-001',
  name: 'John Smith',
  email: 'john@acmecorp.com',
  status: 'client',
  company: 'Acme Corporation',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  initials: 'JS',
  createdAt: new Date(2023, 0, 15),
  lastLogin: new Date(2024, 2, 10),
  ipAddress: '192.168.1.1',
  address: '123 Business Ave, Tech City, TC 12345',
  totalPurchases: 12,
  totalSpent: 15799,
  stripeCustomerId: 'cus_xyz123',
  clickId: 'click_abc456',
  accountManagers: [
    {
      id: '1',
      name: 'Sarah Wilson',
      role: 'Account Manager',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      initials: 'SW',
    }
  ],
  collaborators: [
    {
      id: '2',
      name: 'Mike Johnson',
      role: 'Project Manager',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      initials: 'MJ',
    }
  ],
  brands: [
    {
      id: 'BRD-001',
      name: 'Acme Brand',
      logo: 'https://via.placeholder.com/150',
      type: 'primary',
      ticketsCount: 5,
      assets: {
        logoPackage: 'https://example.com/assets/logo-package.zip',
        brandGuidelines: 'https://example.com/assets/brand-guidelines.pdf'
      }
    },
    {
      id: 'BRD-002',
      name: 'Acme Pro',
      logo: 'https://via.placeholder.com/150',
      type: 'secondary',
      ticketsCount: 3,
      assets: {
        logoPackage: 'https://example.com/assets/logo-package.zip',
        brandGuidelines: 'https://example.com/assets/brand-guidelines.pdf'
      }
    }
  ],
  tickets: [
    {
      id: 'TKT-001',
      title: 'Website Redesign Project',
      status: 'in-progress' as const,
      priority: 'high' as const,
      createdAt: new Date(2024, 1, 15),
      dueDate: new Date(2024, 3, 15),
    }
  ],
  subscriptions: [
    {
      id: 'SUB-001',
      serviceName: 'Monthly SEO Package',
      status: 'active',
      amount: 799,
      startDate: new Date(2024, 0, 1),
      nextBilling: new Date(2024, 3, 1),
    }
  ],
  invoices: [
    {
      id: 'INV-001',
      amount: 2499,
      status: 'paid',
      createdAt: new Date(2024, 1, 1),
      paidAt: new Date(2024, 1, 2),
    }
  ],
  files: [
    {
      id: '1',
      name: 'brand-guidelines.pdf',
      size: '2.4 MB',
      uploadedAt: new Date(2024, 1, 15),
      type: 'application/pdf',
    }
  ]
};