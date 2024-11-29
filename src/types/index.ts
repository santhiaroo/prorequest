export interface Service {
  id: string;
  name: string;
  description: string;
  summary: string;
  price: number;
  isSubscription: boolean;
  interval?: 'month' | 'year';
  coverImage: string;
  features: string[];
  turnaround: string;
  revisions: string;
  ticketsIncluded: string;
  concurrentTickets: number;
  refundGuarantee: boolean;
  refundDays?: number;
  currency: string;
  isPublic: boolean;
  customFields: Array<{
    id: string;
    label: string;
    type: string;
    required: boolean;
    options?: string[];
  }>;
  seo: {
    title: string;
    description: string;
    image: string;
  };
  steps: Array<{
    title: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export interface Workspace {
  id: string;
  name: string;
  domain: string;
  trialEndsAt: Date | null;
  branding: {
    logo: string;
    colors: {
      primary: string;
      secondary: string;
    };
  };
}

export interface Ticket {
  id: string;
  serviceId: string;
  clientId: string;
  workspaceId: string;
  status: 'new' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  customFields: Record<string, any>;
}