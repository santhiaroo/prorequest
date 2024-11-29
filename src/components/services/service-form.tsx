import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, Bold, Italic, Link as LinkIcon, Heading1, List } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateSlug } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IntakeFormBuilder } from './intake-form-builder';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  coverImage: z.string().url('Must be a valid URL'),
  included: z.array(z.string()),
  steps: z.array(z.object({
    title: z.string(),
    description: z.string(),
  })),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })),
  price: z.number().min(1, 'Price must be greater than 0'),
  currency: z.string(),
  turnaround: z.string(),
  ticketsIncluded: z.string(),
  concurrentTickets: z.number().min(1).max(99),
  revisions: z.string(),
  refundGuarantee: z.boolean(),
  refundDays: z.number().optional(),
  slug: z.string(),
  isPublic: z.boolean(),
  submitToSearchEngine: z.boolean(),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().url(),
  }),
  intakeForm: z.array(z.object({
    id: z.string(),
    type: z.string(),
    label: z.string(),
    required: z.boolean(),
    options: z.array(z.string()).optional(),
  })),
});

export function ServiceForm() {
  const { toast } = useToast();
  const [includedItems, setIncludedItems] = useState(['']);
  const [steps, setSteps] = useState([{ title: '', description: '' }]);
  const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);
  const [serviceId, setServiceId] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      summary: '',
      description: '',
      coverImage: '',
      included: [''],
      steps: [{ title: '', description: '' }],
      faqs: [{ question: '', answer: '' }],
      price: 0,
      currency: 'USD',
      turnaround: '7 days',
      ticketsIncluded: '1',
      concurrentTickets: 1,
      revisions: 'unlimited',
      refundGuarantee: false,
      refundDays: 14,
      slug: '',
      isPublic: false,
      submitToSearchEngine: false,
      seo: {
        title: '',
        description: '',
        image: '',
      },
      intakeForm: [],
    },
  });

  const handleNameChange = (value: string) => {
    form.setValue('name', value);
    form.setValue('slug', generateSlug(value));
    form.setValue('seo.title', value);
  };

  const addIncludedItem = () => {
    setIncludedItems([...includedItems, '']);
  };

  const removeIncludedItem = (index: number) => {
    setIncludedItems(includedItems.filter((_, i) => i !== index));
  };

  const updateIncludedItem = (index: number, value: string) => {
    const newItems = [...includedItems];
    newItems[index] = value;
    setIncludedItems(newItems);
    form.setValue('included', newItems);
  };

  const addStep = () => {
    setSteps([...steps, { title: '', description: '' }]);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const updateStep = (index: number, field: 'title' | 'description', value: string) => {
    const newSteps = [...steps];
    newSteps[index][field] = value;
    setSteps(newSteps);
    form.setValue('steps', newSteps);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
    form.setValue('faqs', newFaqs);
  };

  const handleSaveAsDraft = () => {
    const values = form.getValues();
    if (!serviceId) {
      setServiceId(`SRV-${Date.now()}`);
    }
    toast({
      title: 'Draft saved',
      description: 'Your service has been saved as a draft.',
    });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!serviceId) {
      setServiceId(`SRV-${Date.now()}`);
    }
    console.log(values);
    toast({
      title: 'Service created',
      description: 'Your service has been created successfully.',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="basic" className="space-y-8">
          <TabsList className="w-full justify-start border-b rounded-none px-0 h-12">
            <TabsTrigger value="basic" className="rounded-none data-[state=active]:bg-background">
              Basic Information
            </TabsTrigger>
            <TabsTrigger value="delivery" className="rounded-none data-[state=active]:bg-background">
              Delivery Settings
            </TabsTrigger>
            <TabsTrigger value="steps" className="rounded-none data-[state=active]:bg-background">
              Steps & FAQs
            </TabsTrigger>
            <TabsTrigger value="intake" className="rounded-none data-[state=active]:bg-background">
              Intake Form
            </TabsTrigger>
            <TabsTrigger value="seo" className="rounded-none data-[state=active]:bg-background">
              SEO Settings
            </TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic">
            <Card>
              <CardContent className="p-6 space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => handleNameChange(e.target.value)}
                        />
                      </FormControl>
                      <FormDescription>
                        The name of your service as it will appear to clients
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Summary</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Brief description of your service"
                        />
                      </FormControl>
                      <FormDescription>
                        A short summary that appears in service listings
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Description</FormLabel>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Button type="button" size="sm" variant="ghost">
                            <Bold className="h-4 w-4" />
                          </Button>
                          <Button type="button" size="sm" variant="ghost">
                            <Italic className="h-4 w-4" />
                          </Button>
                          <Button type="button" size="sm" variant="ghost">
                            <Heading1 className="h-4 w-4" />
                          </Button>
                          <Button type="button" size="sm" variant="ghost">
                            <List className="h-4 w-4" />
                          </Button>
                          <Button type="button" size="sm" variant="ghost">
                            <LinkIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="min-h-[200px]"
                            placeholder="Detailed description of your service"
                          />
                        </FormControl>
                      </div>
                      <FormDescription>
                        Detailed description of your service, features, and benefits
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://..." />
                      </FormControl>
                      <FormDescription>
                        URL to the main image for your service (recommended size: 1200x630px)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">What's Included</h3>
                      <p className="text-sm text-muted-foreground">
                        List the key features included in this service
                      </p>
                    </div>
                    <Button type="button" onClick={addIncludedItem}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {includedItems.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={item}
                          onChange={(e) => updateIncludedItem(index, e.target.value)}
                          placeholder="Enter included feature"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeIncludedItem(index)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Delivery Settings Tab */}
          <TabsContent value="delivery">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="turnaround"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Turnaround Time</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select turnaround time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1 day">1 Day</SelectItem>
                            <SelectItem value="3 days">3 Days</SelectItem>
                            <SelectItem value="7 days">7 Days</SelectItem>
                            <SelectItem value="14 days">14 Days</SelectItem>
                            <SelectItem value="30 days">30 Days</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="revisions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Included Revisions</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of revisions" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 Revision</SelectItem>
                            <SelectItem value="2">2 Revisions</SelectItem>
                            <SelectItem value="3">3 Revisions</SelectItem>
                            <SelectItem value="5">5 Revisions</SelectItem>
                            <SelectItem value="unlimited">Unlimited</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="ticketsIncluded"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Tickets</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of tickets" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 Ticket</SelectItem>
                            <SelectItem value="2">2 Tickets</SelectItem>
                            <SelectItem value="5">5 Tickets</SelectItem>
                            <SelectItem value="10">10 Tickets</SelectItem>
                            <SelectItem value="unlimited">Unlimited</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Total number of tickets included
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="concurrentTickets"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Concurrent Tickets</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            max="99"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          Maximum active tickets at once (1-99, or unlimited)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <FormField
                  control={form.control}
                  name="refundGuarantee"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Refund Guarantee</FormLabel>
                        <FormDescription>
                          Offer a money-back guarantee
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch('refundGuarantee') && (
                  <FormField
                    control={form.control}
                    name="refundDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Refund Period (Days)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          Number of days clients have to request a refund
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <Separator />

                <FormField
                  control={form.control}
                  name="isPublic"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Public Visibility</FormLabel>
                        <FormDescription>
                          Make this service available in your store
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Steps & FAQs Tab */}
          <TabsContent value="steps">
            <div className="space-y-6">
              {/* How It Works Steps */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">How It Works</h3>
                      <p className="text-sm text-muted-foreground">
                        Add steps to explain your service process
                      </p>
                    </div>
                    <Button onClick={addStep} type="button">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Step
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {steps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-1 space-y-4">
                          <Input
                            placeholder="Step Title"
                            value={step.title}
                            onChange={(e) => updateStep(index, 'title', e.target.value)}
                          />
                          <Textarea
                            placeholder="Step Description"
                            value={step.description}
                            onChange={(e) => updateStep(index, 'description', e.target.value)}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeStep(index)}
                          type="button"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* FAQs */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
                      <p className="text-sm text-muted-foreground">
                        Add FAQs to address common questions
                      </p>
                    </div>
                    <Button onClick={addFaq} type="button">
                      <Plus className="h-4 w-4 mr-2" />
                      Add FAQ
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-1 space-y-4">
                          <Input
                            placeholder="Question"
                            value={faq.question}
                            onChange={(e) => updateFaq(index, 'question', e.target.value)}
                          />
                          <Textarea
                            placeholder="Answer"
                            value={faq.answer}
                            onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFaq(index)}
                          type="button"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Intake Form Tab */}
          <TabsContent value="intake">
            <Card>
              <CardContent className="p-6">
                <IntakeFormBuilder
                  value={form.watch('intakeForm')}
                  onChange={(fields) => form.setValue('intakeForm', fields)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Settings Tab */}
          <TabsContent value="seo">
            <Card>
              <CardContent className="p-6 space-y-6">
                <FormField
                  control={form.control}
                  name="seo.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Title that appears in search engine results (50-60 characters)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="seo.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormDescription>
                        Description that appears in search engine results (150-160 characters)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="seo.image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OpenGraph Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Image that appears when sharing on social media (1200x630px)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="submitToSearchEngine"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Submit to Search Engines</FormLabel>
                        <FormDescription>
                          Automatically submit this page to search engines
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={handleSaveAsDraft}>
            Save as Draft
          </Button>
          <Button type="submit">
            Create Service
          </Button>
        </div>
      </form>
    </Form>
  );
}