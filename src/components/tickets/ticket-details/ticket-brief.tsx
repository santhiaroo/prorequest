import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Save } from 'lucide-react';
import { mockTicketDetails } from './mock-data';
import { useToast } from '@/hooks/use-toast';

export function TicketBrief() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(mockTicketDetails.description);
  const isAdmin = true; // This would come from your auth context

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Brief Updated",
      description: "The project brief has been updated successfully.",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Project Brief</CardTitle>
        {isAdmin && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save
              </>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </>
            )}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[200px]"
          />
        ) : (
          <div className="prose prose-sm dark:prose-invert">
            <p className="text-muted-foreground whitespace-pre-wrap">
              {description}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}