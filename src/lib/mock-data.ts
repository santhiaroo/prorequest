import { Service } from '@/types';

export const mockServices: Service[] = [
  {
    id: 'SRV-001',
    name: 'Website Design Package',
    description: 'Professional website design with modern UI/UX principles',
    summary: 'Complete website design solution for businesses',
    price: 2499,
    isSubscription: false,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    features: [
      'Custom Design',
      'Mobile Responsive',
      'SEO Optimization',
      '5 Pages',
      'Contact Form',
    ],
    turnaround: '14 days',
    revisions: 'unlimited',
    ticketsIncluded: '2',
    concurrentTickets: 1,
    refundGuarantee: true,
    refundDays: 14,
    currency: 'USD',
    isPublic: true,
    customFields: [
      {
        id: 'brand-guidelines',
        label: 'Brand Guidelines',
        type: 'file',
        required: true,
      },
      {
        id: 'website-type',
        label: 'Website Type',
        type: 'select',
        required: true,
        options: ['Business', 'E-commerce', 'Portfolio', 'Blog'],
      },
    ],
    seo: {
      title: 'Professional Website Design Services',
      description: 'Custom website design services for modern businesses. Mobile-responsive, SEO-optimized, and conversion-focused designs.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&q=80',
    },
    steps: [
      {
        title: 'Discovery',
        description: 'We analyze your requirements and business goals',
      },
      {
        title: 'Design',
        description: 'Create mockups and get your approval',
      },
      {
        title: 'Development',
        description: 'Build your website with modern technologies',
      },
    ],
    faqs: [
      {
        question: 'How long does it take?',
        answer: 'Typically 14 days from start to finish',
      },
      {
        question: 'Do you offer hosting?',
        answer: 'Yes, we can recommend and set up hosting for you',
      },
    ],
  },
  {
    id: 'SRV-002',
    name: 'Monthly SEO Service',
    description: 'Comprehensive SEO optimization and maintenance',
    summary: 'Boost your search engine rankings with our monthly SEO service',
    price: 799,
    isSubscription: true,
    interval: 'month',
    coverImage: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&q=80',
    features: [
      'Keyword Research',
      'Content Optimization',
      'Monthly Reports',
      'Competitor Analysis',
      'Link Building',
    ],
    turnaround: '30 days',
    revisions: '3',
    ticketsIncluded: '1',
    concurrentTickets: 1,
    refundGuarantee: true,
    refundDays: 30,
    currency: 'USD',
    isPublic: true,
    customFields: [
      {
        id: 'website-url',
        label: 'Website URL',
        type: 'url',
        required: true,
      },
      {
        id: 'target-keywords',
        label: 'Target Keywords',
        type: 'textarea',
        required: true,
      },
    ],
    seo: {
      title: 'Professional SEO Services Monthly Package',
      description: 'Boost your website rankings with our comprehensive monthly SEO service package. Expert optimization and regular reporting.',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=1200&h=630&q=80',
    },
    steps: [
      {
        title: 'Audit',
        description: 'Complete SEO audit of your website',
      },
      {
        title: 'Strategy',
        description: 'Develop custom SEO strategy',
      },
      {
        title: 'Implementation',
        description: 'Apply optimizations and track results',
      },
    ],
    faqs: [
      {
        question: 'What results can I expect?',
        answer: 'Results vary, but most clients see improvement within 3-6 months',
      },
      {
        question: 'Do you guarantee rankings?',
        answer: 'We don\'t guarantee specific rankings as search algorithms change frequently',
      },
    ],
  },
];