import { useWorkspace } from '@/providers/workspace-provider';
import { Separator } from '@/components/ui/separator';
import { RefundSeal } from './refund-seal';
import { cn } from '@/lib/utils';

const paymentMethods = [
  'Visa',
  'Mastercard',
  'American Express',
  'PayPal',
  'Apple Pay',
  'Google Pay',
];

const footerLinks = [
  { title: 'About Us', href: '#' },
  { title: 'Contact', href: '#' },
  { title: 'Terms', href: '#' },
  { title: 'Privacy', href: '#' },
  { title: 'Support', href: '#' },
];

export function StoreFooter() {
  const { currentWorkspace } = useWorkspace();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Company Info */}
          <div>
            <h3 className="font-semibold mb-3">{currentWorkspace?.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Professional services to help your business grow and succeed in the digital age.
            </p>
            <RefundSeal daysToRefund={14} />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-semibold mb-3">Accepted Payment Methods</h3>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="text-xs bg-muted px-2 py-1 rounded"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>
            © {year} {currentWorkspace?.name}. All rights reserved.
          </div>
          <div className="text-xs">
            Powered by{' '}
            <a
              href="https://prorequests.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              ProRequests
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}