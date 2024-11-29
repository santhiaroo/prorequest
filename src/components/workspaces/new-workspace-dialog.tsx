import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useWorkspace } from '@/providers/workspace-provider';
import { generateId } from '@/lib/utils';

interface NewWorkspaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  name: z.string().min(2, 'Workspace name must be at least 2 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .transform(val => val.toLowerCase()),
  startTrial: z.boolean().default(true),
});

export function NewWorkspaceDialog({ open, onOpenChange }: NewWorkspaceDialogProps) {
  const { toast } = useToast();
  const { currentWorkspace, setCurrentWorkspace } = useWorkspace();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: '',
      startTrial: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Create a new workspace based on the current workspace's settings
      const newWorkspace = {
        id: generateId('WRK'),
        name: values.name,
        domain: values.slug + '.prorequests.io',
        trialEndsAt: values.startTrial 
          ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 14) // 14 days from now
          : null,
        branding: {
          logo: currentWorkspace?.branding.logo || 'https://via.placeholder.com/150',
          colors: {
            primary: currentWorkspace?.branding.colors.primary || '#2563eb',
            secondary: currentWorkspace?.branding.colors.secondary || '#7c3aed',
          },
        },
      };

      // In a real app, this would be an API call
      console.log('Creating workspace:', newWorkspace);

      // Switch to the new workspace
      setCurrentWorkspace(newWorkspace);

      toast({
        title: "Workspace Created",
        description: values.startTrial
          ? "Your 14-day trial workspace has been created. You can upgrade anytime."
          : "Your new workspace has been created successfully.",
      });

      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create workspace. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-generate slug from workspace name
  const handleNameChange = (value: string) => {
    form.setValue('name', value);
    if (!form.getValues('slug')) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      form.setValue('slug', slug);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to manage a different set of clients and services
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="My Agency"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your workspace's visible name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace URL</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Input
                        {...field}
                        placeholder="my-agency"
                        className="rounded-r-none"
                      />
                      <div className="px-3 h-10 flex items-center border border-l-0 bg-muted rounded-r-md text-muted-foreground">
                        .prorequests.io
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    This will be your workspace's unique URL
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startTrial"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Start with a 14-day trial</FormLabel>
                    <FormDescription>
                      Try all features free for 14 days, no credit card required
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Workspace"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}