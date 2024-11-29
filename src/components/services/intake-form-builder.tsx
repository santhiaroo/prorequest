import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Minus, GripVertical } from 'lucide-react';

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
}

interface IntakeFormBuilderProps {
  value: FormField[];
  onChange: (fields: FormField[]) => void;
}

export function IntakeFormBuilder({ value, onChange }: IntakeFormBuilderProps) {
  const [fields, setFields] = useState<FormField[]>(value || []);

  const addField = () => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type: 'text',
      label: '',
      required: false,
    };
    const newFields = [...fields, newField];
    setFields(newFields);
    onChange(newFields);
  };

  const removeField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
    onChange(newFields);
  };

  const updateField = (index: number, updates: Partial<FormField>) => {
    const newFields = fields.map((field, i) => {
      if (i === index) {
        return { ...field, ...updates };
      }
      return field;
    });
    setFields(newFields);
    onChange(newFields);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Intake Form Fields</h3>
          <p className="text-sm text-muted-foreground">
            Build your custom intake form for clients
          </p>
        </div>
        <Button onClick={addField}>
          <Plus className="h-4 w-4 mr-2" />
          Add Field
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="mt-3 cursor-move">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Field Label</label>
                      <Input
                        value={field.label}
                        onChange={(e) => updateField(index, { label: e.target.value })}
                        placeholder="Enter field label"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Field Type</label>
                      <Select
                        value={field.type}
                        onValueChange={(value) => updateField(index, { type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="textarea">Long Text</SelectItem>
                          <SelectItem value="select">Dropdown</SelectItem>
                          <SelectItem value="file">File Upload</SelectItem>
                          <SelectItem value="url">URL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {field.type === 'select' && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Options</label>
                      <Input
                        value={field.options?.join(', ')}
                        onChange={(e) => updateField(index, {
                          options: e.target.value.split(',').map(s => s.trim())
                        })}
                        placeholder="Enter options, separated by commas"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={field.required}
                        onCheckedChange={(checked) => updateField(index, { required: checked })}
                      />
                      <label className="text-sm font-medium">Required field</label>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeField(index)}
                    >
                      <Minus className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}