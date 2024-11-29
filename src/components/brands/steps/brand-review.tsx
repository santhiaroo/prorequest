import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function BrandReview({ data }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Review Brand Details</h3>
        <p className="text-sm text-muted-foreground">
          Review all information before creating the brand
        </p>
      </div>

      <div className="grid gap-6">
        {/* Basic Information */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Basic Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Name</span>
                  <span className="text-sm font-medium">{data.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Industry</span>
                  <span className="text-sm font-medium">{data.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Type</span>
                  <Badge variant="secondary">{data.type}</Badge>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Summary</h4>
              <p className="text-sm text-muted-foreground">{data.summary}</p>
            </div>
          </CardContent>
        </Card>

        {/* Logos */}
        <Card>
          <CardContent className="p-6">
            <h4 className="text-sm font-medium mb-4">Brand Logos</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.logos?.map((logo: any) => (
                <div
                  key={logo.id}
                  className="rounded-lg border p-4 space-y-2"
                >
                  <div className="aspect-square rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                    <img
                      src={logo.file}
                      alt={logo.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {logo.type && (
                      <Badge variant="secondary">{logo.type}</Badge>
                    )}
                    {logo.usage && (
                      <Badge variant="outline">{logo.usage}</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Colors */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h4 className="text-sm font-medium">Brand Colors</h4>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg border"
                  style={{ backgroundColor: data.colors?.primary }}
                />
                <div>
                  <div className="text-sm font-medium">Primary Color</div>
                  <code className="text-sm">{data.colors?.primary}</code>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg border"
                  style={{ backgroundColor: data.colors?.secondary }}
                />
                <div>
                  <div className="text-sm font-medium">Secondary Color</div>
                  <code className="text-sm">{data.colors?.secondary}</code>
                </div>
              </div>
              {data.colors?.additional?.map((color: any, index: number) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg border"
                    style={{ backgroundColor: color.value }}
                  />
                  <div>
                    <div className="text-sm font-medium">{color.name}</div>
                    <code className="text-sm">{color.value}</code>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Asset Collections */}
        <Card>
          <CardContent className="p-6">
            <h4 className="text-sm font-medium mb-4">Asset Collections</h4>
            <div className="space-y-4">
              {data.assets?.collections?.map((collection: any) => (
                <div
                  key={collection.id}
                  className="rounded-lg border p-4 space-y-2"
                >
                  <div className="font-medium">{collection.name}</div>
                  <p className="text-sm text-muted-foreground">
                    {collection.description}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    {collection.files.length} files
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}