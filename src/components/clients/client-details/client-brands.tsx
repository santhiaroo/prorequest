import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Pencil, ExternalLink, Plus, Grid, List as ListIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockClientDetails } from './mock-data';
import { AddBrandDialog } from '@/components/brands/add-brand-dialog';

export function ClientBrands() {
  const { brands } = mockClientDetails;
  const [showAddBrandDialog, setShowAddBrandDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleDownloadAssets = (brandId: string) => {
    // In a real app, this would trigger a download
    console.log('Downloading assets for brand:', brandId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
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
        <Button onClick={() => setShowAddBrandDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Brand
        </Button>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <Card key={brand.id} className="p-6">
              <div className="space-y-4">
                <div className="aspect-square rounded-lg bg-muted flex items-center justify-center p-4">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
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
                  <div className="text-sm text-muted-foreground">
                    {brand.ticketsCount} tickets
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link to={`/brands/${brand.id}`}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Details
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadAssets(brand.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border divide-y">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
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
                  <div className="text-sm text-muted-foreground">
                    {brand.ticketsCount} tickets
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/brands/${brand.id}`}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadAssets(brand.id)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddBrandDialog 
        open={showAddBrandDialog} 
        onOpenChange={setShowAddBrandDialog}
        clientId={mockClientDetails.id}
      />
    </div>
  );
}