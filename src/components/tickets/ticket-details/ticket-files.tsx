import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Download, Upload } from 'lucide-react';

const mockFiles = [
  {
    id: '1',
    name: 'brand-guidelines.pdf',
    size: '2.4 MB',
    uploadedBy: 'John Smith',
    uploadedAt: '2 days ago',
  },
  {
    id: '2',
    name: 'website-mockup.fig',
    size: '8.1 MB',
    uploadedBy: 'Mike Johnson',
    uploadedAt: '1 day ago',
  },
];

export function TicketFiles() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Input
              type="file"
              className="hidden"
              id="file-upload"
              multiple
            />
            <Button
              onClick={() => document.getElementById('file-upload')?.click()}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {mockFiles.map((file) => (
          <Card key={file.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{file.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {file.size} • Uploaded by {file.uploadedBy} • {file.uploadedAt}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}