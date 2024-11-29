import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ArrowLeft,
  Download,
  Pencil,
  Building2,
  Ticket,
  MoreHorizontal,
  Users,
  Trash2,
  FileText,
  ExternalLink,
  Plus,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock clients for the change client dialog
const clients = [
  { id: 'CLT-001', name: 'Acme Corporation' },
  { id: 'CLT-002', name: 'TechStart Inc' },
  { id: 'CLT-003', name: 'Design Studio' },
];

export function BrandDetailsPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const [showChangeClientDialog, setShowChangeClientDialog] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState('');

  // Mock data - in a real app, this would come from an API
  const brand = {
    id: 'BRD-001',
    name: 'Acme Brand',
    summary: 'Modern and professional brand identity for a tech company',
    industry: 'Technology',
    type: 'primary',
    client: {
      id: 'CLT-001',
      name: 'John Smith',
      company: 'Acme Corporation'
    },
    colors: {
      primary: '#2563eb',
      secondary: '#7c3aed',
      additional: [
        { name: 'Accent', value: '#f59e0b' },
        { name: 'Success', value: '#10b981' }
      ]
    },
    logos: [
      {
        id: 1,
        name: 'Primary Logo',
        type: 'primary',
        usage: 'all-purpose',
        url: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        name: 'Monochrome Logo',
        type: 'monochrome',
        usage: 'print',
        url: 'https://via.placeholder.com/150',
      },
      {
        id: 3,
        name: 'Social Media Logo',
        type: 'social',
        usage: 'digital',
        url: 'https://via.placeholder.com/150',
      }
    ],
    assets: {
      brandBook: '/path/to/brand-book.pdf',
      brandGuidelines: '/path/to/guidelines.pdf',
      collections: [
        {
          name: 'Social Media',
          files: [
            { name: 'Facebook Cover', url: '/path/to/fb-cover.jpg' },
            { name: 'Instagram Posts', url: '/path/to/ig-posts.zip' }
          ]
        },
        {
          name: 'Team Photos',
          files: [
            { name: 'Team Group Shot', url: '/path/to/team.jpg' },
            { name: 'Office Photos', url: '/path/to/office.zip' }
          ]
        }
      ]
    },
    tickets: [
      {
        id: 'TKT-001',
        title: 'Website Redesign',
        status: 'in-progress',
        priority: 'high',
        createdAt: '2024-03-15'
      },
      {
        id: 'TKT-002',
        title: 'Social Media Assets',
        status: 'completed',
        priority: 'medium',
        createdAt: '2024-03-10'
      }
    ]
  };

  const handleDownloadAssets = () => {
    toast({
      title: "Download Started",
      description: "Your brand assets are being prepared for download.",
    });
  };

  const handleChangeClient = () => {
    if (!selectedClientId) return;

    toast({
      title: "Client Changed",
      description: "The brand has been reassigned to the new client.",
    });
    setShowChangeClientDialog(false);
    setSelectedClientId('');
  };

  const handleDelete = () => {
    toast({
      title: "Delete Brand",
      description: "This feature will be implemented soon.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/brands">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Brands
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/clients/${brand.client.id}`}>
              <Building2 className="h-4 w-4 mr-2" />
              View Client
            </Link>
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{brand.name}</h1>
              <Badge
                variant="secondary"
                className={
                  brand.type === 'primary'
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted'
                }
              >
                {brand.type}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                to={`/clients/${brand.client.id}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Building2 className="h-4 w-4" />
                <span>{brand.client.company}</span>
              </Link>
              <Badge variant="outline">{brand.industry}</Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleDownloadAssets}>
              <Download className="h-4 w-4 mr-2" />
              Download All Assets
            </Button>
            <Button variant="outline" asChild>
              <Link to={`/brands/${brand.id}/edit`}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Brand
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowChangeClientDialog(true)}>
                  <Users className="h-4 w-4 mr-2" />
                  Change Client
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Brand
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="logos">Logos</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Brand Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Brand Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{brand.summary}</p>
              </CardContent>
            </Card>

            {/* Brand Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Brand Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg border"
                    style={{ backgroundColor: brand.colors.primary }}
                  />
                  <div>
                    <div className="font-medium">Primary Color</div>
                    <code className="text-sm">{brand.colors.primary}</code>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg border"
                    style={{ backgroundColor: brand.colors.secondary }}
                  />
                  <div>
                    <div className="font-medium">Secondary Color</div>
                    <code className="text-sm">{brand.colors.secondary}</code>
                  </div>
                </div>
                {brand.colors.additional.map((color, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-lg border"
                      style={{ backgroundColor: color.value }}
                    />
                    <div>
                      <div className="font-medium">{color.name}</div>
                      <code className="text-sm">{color.value}</code>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logos">
          <div className="grid gap-6 md:grid-cols-3">
            {brand.logos.map((logo) => (
              <Card key={logo.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="aspect-square rounded-lg bg-muted flex items-center justify-center p-4">
                      <img
                        src={logo.url}
                        alt={logo.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{logo.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary">{logo.type}</Badge>
                        <Badge variant="outline">{logo.usage}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={handleDownloadAssets}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assets">
          <div className="space-y-6">
            {/* Core Assets */}
            <Card>
              <CardHeader>
                <CardTitle>Core Assets</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Brand Book</div>
                        <div className="text-sm text-muted-foreground">
                          Complete brand identity guidelines
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleDownloadAssets}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Brand Guidelines</div>
                        <div className="text-sm text-muted-foreground">
                          Usage guidelines and specifications
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleDownloadAssets}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Asset Collections */}
            {brand.assets.collections.map((collection, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{collection.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {collection.files.map((file, fileIndex) => (
                      <div key={fileIndex} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{file.name}</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={handleDownloadAssets}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tickets">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Related Tickets</CardTitle>
              <Button asChild>
                <Link to="/tickets/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Ticket
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {brand.tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0"
                  >
                    <div className="space-y-1">
                      <Link
                        to={`/tickets/${ticket.id}`}
                        className="font-medium hover:underline"
                      >
                        {ticket.title}
                      </Link>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={ticket.status === 'completed' ? 'secondary' : 'default'}
                        >
                          {ticket.status}
                        </Badge>
                        <Badge variant="outline">{ticket.priority}</Badge>
                        <span className="text-sm text-muted-foreground">
                          Created on {ticket.createdAt}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/tickets/${ticket.id}`}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Change Client Dialog */}
      <Dialog open={showChangeClientDialog} onOpenChange={setShowChangeClientDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Client</DialogTitle>
            <DialogDescription>
              Select a new client to reassign this brand to.
            </DialogDescription>
          </DialogHeader>
          <Select value={selectedClientId} onValueChange={setSelectedClientId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a client" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChangeClientDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleChangeClient} disabled={!selectedClientId}>
              Change Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}