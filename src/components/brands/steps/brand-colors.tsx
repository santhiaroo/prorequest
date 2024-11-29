import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';

export function BrandColors({ data, onChange }) {
  const [colors, setColors] = useState(data.colors || {
    primary: '#000000',
    secondary: '#000000',
    additional: [],
  });

  const addColor = () => {
    const newColors = {
      ...colors,
      additional: [...colors.additional, { name: '', value: '#000000' }],
    };
    setColors(newColors);
    onChange({ colors: newColors });
  };

  const updateColor = (type: string, value: string) => {
    const newColors = { ...colors, [type]: value };
    setColors(newColors);
    onChange({ colors: newColors });
  };

  const updateAdditionalColor = (index: number, updates: any) => {
    const newAdditional = colors.additional.map((color, i) =>
      i === index ? { ...color, ...updates } : color
    );
    const newColors = { ...colors, additional: newAdditional };
    setColors(newColors);
    onChange({ colors: newColors });
  };

  const removeAdditionalColor = (index: number) => {
    const newAdditional = colors.additional.filter((_, i) => i !== index);
    const newColors = { ...colors, additional: newAdditional };
    setColors(newColors);
    onChange({ colors: newColors });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Brand Colors</h3>
        <p className="text-sm text-muted-foreground">
          Define your brand's color palette
        </p>
      </div>

      <div className="grid gap-6">
        {/* Primary Color */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex items-center gap-4 mt-2">
                  <div
                    className="w-16 h-16 rounded-lg border"
                    style={{ backgroundColor: colors.primary }}
                  />
                  <Input
                    id="primary-color"
                    type="color"
                    value={colors.primary}
                    onChange={(e) => updateColor('primary', e.target.value)}
                  />
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {colors.primary}
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Secondary Color */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <div className="flex items-center gap-4 mt-2">
                  <div
                    className="w-16 h-16 rounded-lg border"
                    style={{ backgroundColor: colors.secondary }}
                  />
                  <Input
                    id="secondary-color"
                    type="color"
                    value={colors.secondary}
                    onChange={(e) => updateColor('secondary', e.target.value)}
                  />
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {colors.secondary}
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Colors */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Additional Colors</Label>
            <Button variant="outline" size="sm" onClick={addColor}>
              <Plus className="h-4 w-4 mr-2" />
              Add Color
            </Button>
          </div>

          <div className="grid gap-4">
            {colors.additional.map((color, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Color name"
                        value={color.name}
                        onChange={(e) =>
                          updateAdditionalColor(index, { name: e.target.value })
                        }
                        className="mb-2"
                      />
                      <div className="flex items-center gap-4">
                        <div
                          className="w-16 h-16 rounded-lg border"
                          style={{ backgroundColor: color.value }}
                        />
                        <Input
                          type="color"
                          value={color.value}
                          onChange={(e) =>
                            updateAdditionalColor(index, { value: e.target.value })
                          }
                        />
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {color.value}
                        </code>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAdditionalColor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}