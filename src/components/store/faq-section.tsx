import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. All payments are processed securely through our payment gateway.',
  },
  {
    question: 'How long does it take to complete a project?',
    description: 'Project timelines vary depending on the service and complexity. Each service listing includes an estimated turnaround time. We will provide a detailed timeline during our initial consultation.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a satisfaction guarantee. If you are not satisfied with our service, you can request a refund within 14 days of project completion, subject to our refund policy terms.',
  },
  {
    question: 'Can I upgrade or downgrade my subscription?',
    answer: 'Yes, you can modify your subscription at any time. Changes will take effect in the next billing cycle. There are no penalties for changing your plan.',
  },
  {
    question: 'How do I get support if I need help?',
    answer: 'We provide dedicated support through our ticket system, email, and scheduled calls. Premium plans include priority support with faster response times.',
  },
];

export function FAQSection() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Find answers to common questions about our services and process
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer || faq.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}