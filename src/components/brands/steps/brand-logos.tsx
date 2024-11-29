import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, X, Upload } from 'lucide-react';

const logoTypes = [
  'Primary',
  'Secondary',
  'Monochrome',
  'Reversed',
  'Icon',
  'Favicon',
  'Square',
  'Social Media',
];

const logoUsages = [
  'Digital',
  'Print',
  'All Purpose',
];

export function BrandLogos({ data, onChange }) {
  const [logos, setLogos] = useState(data.logos || []);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newLogo = {
          id: Date.now(),
          file: reader.result,
          type: '',
          usage: '',
          name: file.name,
        };
        const updatedLogos = [...logos, newLogo];
        setLogos(updatedLogos);
        onChange({ logos: updatedLogos });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateLogo = (id: number, updates: any) => {
    const updatedLogos = logos.map((logo) =>
      logo.id === id ? { ...logo, ...updates } : logo
    );
    setLogos(updatedLogos);
    onChange({ logos: updatedLogos });
  };

  const removeLogo = (id: number) => {
    const updatedLogos = logos.filter((logo) => logo.id !== id);
    setLogos(updatedLogos);
    onChange({ logos: updatedLogos });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Brand Logos</h3>
          <p className="text-sm text-muted-foreground">
            Upload and organize your brand logos
          </p>
        </div>
        <div>
          <Input
            type="file"
            className="hidden"
            id="logo-upload"
            accept="image/*"
            onChange={handleLogoUpload}
          />
          <Button onClick={() => document.getElementById('logo-upload')?.click()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Logo
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {logos.map((logo) => (
          <Card key={logo.id}>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="aspect-square rounded-lg border bg-muted flex items-center justify-center relative overflow-hidden">
                  <img
                    src={logo.file as string}
                    alt={logo.name}
                    className="max-w-full max-h-full object-contain"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeLogo(logo.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Select
                    value={logo.type}
                    onValueChange={(value) =>
                      updateLogo(logo.id, { type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select logo type" />
                    </SelectTrigger>
                    <SelectContent>
                      {logoTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={logo.usage}
                    onValueChange={(value) =>
                      updateLogo(logo.id, { usage: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select usage type" />
                    </SelectTrigger>
                    <SelectContent>
                      {logoUsages.map((usage) => (
                        <SelectItem key={usage} value={usage.toLowerCase()}>
                          {usage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-wrap gap-2">
                  {logo.type && (
                    <Badge variant="secondary">
                      {logo.type}
                    </Badge>
                  )}
                  {logo.usage && (
                    <Badge variant="outline">
                      {logo.usage}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {logos.length === 0 && (
          <Card className="col-span-2">
            <CardContent className="p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <Upload className="h-8 w-8 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Logos Added</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your brand logos to get started
                </p>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('logo-upload')?.click()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Logo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}