import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Grid, List as ListIcon, Search, MoreHorizontal, Download, Pencil, Users, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
import { AddBrandDialog } from '@/components/brands/add-brand-dialog';
import { useToast } from '@/hooks/use-toast';

// Mock data
const brands = [
  {
    id: 'BRD-001',
    name: 'Acme Brand',
    logo: 'https://via.placeholder.com/150',
    type: 'primary',
    client: {
      id: 'CLT-001',
      name: 'Acme Corporation'
    },
    ticketsCount: 5,
    status: 'active',
    assets: {
      logoPackage: '/path/to/logos.zip',
      brandGuidelines: '/path/to/guidelines.pdf'
    }
  },
  {
    id: 'BRD-002',
    name: 'TechStart',
    logo: 'https://via.placeholder.com/150',
    type: 'secondary',
    client: {
      id: 'CLT-002',
      name: 'TechStart Inc'
    },
    ticketsCount: 3,
    status: 'draft',
    assets: {
      logoPackage: '/path/to/logos.zip',
      brandGuidelines: '/path/to/guidelines.pdf'
    }
  }
];

// Mock clients for the change client dialog
const clients = [
  { id: 'CLT-001', name: 'Acme Corporation' },
  { id: 'CLT-002', name: 'TechStart Inc' },
  { id: 'CLT-003', name: 'Design Studio' },
];

export function BrandsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddBrandDialog, setShowAddBrandDialog] = useState(false);
  const [showChangeClientDialog, setShowChangeClientDialog] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string>('');
  const { toast } = useToast();

  const handleDownloadAssets = (brandId: string) => {
    const brand = brands.find(b => b.id === brandId);
    if (!brand) return;

    toast({
      title: "Download Started",
      description: "Your brand assets are being prepared for download.",
    });

    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Brand assets have been downloaded successfully.",
      });
    }, 2000);
  };

  const handleChangeClient = () => {
    if (!selectedBrandId || !selectedClientId) return;

    toast({
      title: "Client Changed",
      description: "The brand has been reassigned to the new client.",
    });

    setShowChangeClientDialog(false);
    setSelectedBrandId(null);
    setSelectedClientId('');
  };

  const handleDeleteBrand = (brandId: string) => {
    toast({
      title: "Brand Deleted",
      description: "The brand has been permanently deleted.",
      variant: "destructive",
    });
  };

  const openChangeClientDialog = (brandId: string) => {
    setSelectedBrandId(brandId);
    setShowChangeClientDialog(true);
  };

  const renderBrandActions = (brand: typeof brands[0]) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link to={`/brands/${brand.id}`}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit Brand
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDownloadAssets(brand.id)}>
          <Download className="h-4 w-4 mr-2" />
          Download Assets
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openChangeClientDialog(brand.id)}>
          <Users className="h-4 w-4 mr-2" />
          Change Client
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Brand
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Brand</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this brand? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteBrand(brand.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Brands</h1>
          <p className="text-muted-foreground mt-2">
            Manage client brands and their assets
          </p>
        </div>
        <Button onClick={() => setShowAddBrandDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Brand
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search brands..." className="pl-8" />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <ListIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <Card key={brand.id}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="aspect-square rounded-lg bg-muted flex items-center justify-center p-4">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/brands/${brand.id}`}
                        className="font-medium hover:underline"
                      >
                        {brand.name}
                      </Link>
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
                    <Link
                      to={`/clients/${brand.client.id}`}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {brand.client.name}
                    </Link>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {brand.ticketsCount} tickets
                    </div>
                    {renderBrandActions(brand)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-between p-4 border-b last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div>
                  <Link
                    to={`/brands/${brand.id}`}
                    className="font-medium hover:underline"
                  >
                    {brand.name}
                  </Link>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/clients/${brand.client.id}`}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {brand.client.name}
                    </Link>
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
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {brand.ticketsCount} tickets
                </span>
                {renderBrandActions(brand)}
              </div>
            </div>
          ))}
        </div>
      )}

      <AddBrandDialog
        open={showAddBrandDialog}
        onOpenChange={setShowAddBrandDialog}
      />

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