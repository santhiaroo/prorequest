import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Pencil,
  Copy,
  Archive,
  Trash2,
  CheckCircle2,
  Clock,
  Repeat,
  Globe,
  FileText,
  Users,
  Link as LinkIcon,
} from 'lucide-react';
import { mockServices } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/format';
import { useToast } from '@/hooks/use-toast';

export function ServiceDetailsPage() {
  const { id } = useParams();
  const service = mockServices.find(s => s.id === id);
  const { toast } = useToast();

  if (!service) return null;

  const handleDuplicate = () => {
    toast({
      title: "Service duplicated",
      description: "A new copy of this service has been created.",
    });
  };

  const handleArchive = () => {
    toast({
      title: "Service archived",
      description: "The service has been archived and is no longer visible to clients.",
    });
  };

  const handleDelete = () => {
    toast({
      title: "Service deleted",
      description: "The service has been permanently deleted.",
    });
  };

  const handleCopyStoreLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/store/${service.id}`);
    toast({
      description: "Store link copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{service.name}</h1>
          <div className="flex items-center gap-2 mt-2 text-muted-foreground">
            <span>Service ID: {service.id}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0"
              onClick={handleCopyStoreLink}
            >
              <LinkIcon className="h-4 w-4 mr-1" />
              Copy Store Link
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleDuplicate}>
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </Button>
          <Button variant="outline" asChild>
            <Link to={`/services/${service.id}/edit`}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Service
            </Link>
          </Button>
          <Button variant="outline" onClick={handleArchive}>
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  service and all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                  Delete Service
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              <Badge variant={service.isPublic ? "default" : "secondary"}>
                {service.isPublic ? "Published" : "Draft"}
              </Badge>
            </div>
            <div>
              <span className="text-sm font-medium">Summary</span>
              <p className="text-sm text-muted-foreground mt-1">{service.summary}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Description</span>
              <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                {service.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium">Price</span>
                <div className="text-2xl font-bold mt-1">
                  {formatCurrency(service.price)}
                  {service.isSubscription && (
                    <span className="text-sm font-normal text-muted-foreground">
                      /{service.interval}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium">Turnaround Time</span>
                <div className="flex items-center mt-1 text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  {service.turnaround}
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Revisions</span>
                <div className="flex items-center text-muted-foreground">
                  <Repeat className="h-4 w-4 mr-2" />
                  {service.revisions}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Tickets Included</span>
                <div className="flex items-center text-muted-foreground">
                  <FileText className="h-4 w-4 mr-2" />
                  {service.ticketsIncluded}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Concurrent Tickets</span>
                <div className="flex items-center text-muted-foreground">
                  <Users className="h-4 w-4 mr-2" />
                  {service.concurrentTickets}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Features Included</CardTitle>
            <CardDescription>Key features and deliverables</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SEO & Visibility */}
        <Card>
          <CardHeader>
            <CardTitle>SEO & Visibility</CardTitle>
            <CardDescription>Search engine optimization settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm font-medium">Store URL</span>
              <div className="flex items-center gap-2 mt-1">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  /store/{service.id}
                </code>
              </div>
            </div>
            <div>
              <span className="text-sm font-medium">Meta Title</span>
              <p className="text-sm text-muted-foreground mt-1">
                {service.seo.title}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium">Meta Description</span>
              <p className="text-sm text-muted-foreground mt-1">
                {service.seo.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>Service delivery process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {service.steps.map((step, index) => (
                <div key={index} className="space-y-1">
                  <h3 className="text-sm font-medium">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Common questions and answers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {service.faqs.map((faq, index) => (
                <div key={index} className="space-y-1">
                  <h3 className="text-sm font-medium">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}