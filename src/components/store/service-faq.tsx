import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is your revision policy?',
    answer: 'We offer unlimited revisions until you are completely satisfied with the final deliverable. Our goal is to ensure you get exactly what you need.',
  },
  {
    question: 'How do you handle project communication?',
    answer: 'We maintain clear communication through our project management system. You will receive regular updates and can request changes or clarifications at any time.',
  },
  {
    question: 'What happens if I need support after delivery?',
    answer: 'We provide 30 days of post-delivery support for all projects. Extended support plans are available for ongoing assistance.',
  },
  {
    question: 'Can I upgrade or modify the service later?',
    answer: 'Yes, you can upgrade or modify your service package at any time. Our team will help you transition smoothly to the new service level.',
  },
];

export function ServiceFAQ() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}