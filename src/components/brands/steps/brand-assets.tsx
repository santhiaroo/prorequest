import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X, Upload, FileText } from 'lucide-react';

interface AssetCollection {
  id: number;
  name: string;
  description: string;
  files: Array<{
    id: number;
    name: string;
    file: string;
    type: string;
  }>;
}

export function BrandAssets({ data, onChange }) {
  const [collections, setCollections] = useState<AssetCollection[]>(
    data.assets?.collections || []
  );

  const addCollection = () => {
    const newCollection = {
      id: Date.now(),
      name: '',
      description: '',
      files: [],
    };
    const updatedCollections = [...collections, newCollection];
    setCollections(updatedCollections);
    onChange({
      assets: {
        ...data.assets,
        collections: updatedCollections,
      },
    });
  };

  const updateCollection = (id: number, updates: Partial<AssetCollection>) => {
    const updatedCollections = collections.map((collection) =>
      collection.id === id ? { ...collection, ...updates } : collection
    );
    setCollections(updatedCollections);
    onChange({
      assets: {
        ...data.assets,
        collections: updatedCollections,
      },
    });
  };

  const removeCollection = (id: number) => {
    const updatedCollections = collections.filter(
      (collection) => collection.id !== id
    );
    setCollections(updatedCollections);
    onChange({
      assets: {
        ...data.assets,
        collections: updatedCollections,
      },
    });
  };

  const handleFileUpload = (
    collectionId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newFile = {
            id: Date.now(),
            name: file.name,
            file: reader.result as string,
            type: file.type,
          };
          updateCollection(collectionId, {
            files: [
              ...collections.find((c) => c.id === collectionId)!.files,
              newFile,
            ],
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeFile = (collectionId: number, fileId: number) => {
    const collection = collections.find((c) => c.id === collectionId)!;
    updateCollection(collectionId, {
      files: collection.files.filter((f) => f.id !== fileId),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Brand Assets</h3>
          <p className="text-sm text-muted-foreground">
            Organize your brand assets into collections
          </p>
        </div>
        <Button onClick={addCollection}>
          <Plus className="h-4 w-4 mr-2" />
          Add Collection
        </Button>
      </div>

      <div className="space-y-6">
        {collections.map((collection) => (
          <Card key={collection.id}>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="Collection name"
                    value={collection.name}
                    onChange={(e) =>
                      updateCollection(collection.id, { name: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Collection description"
                    value={collection.description}
                    onChange={(e) =>
                      updateCollection(collection.id, {
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCollection(collection.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Input
                    type="file"
                    className="hidden"
                    id={`file-upload-${collection.id}`}
                    multiple
                    onChange={(e) => handleFileUpload(collection.id, e)}
                  />
                  <Button
                    variant="outline"
                    onClick={() =>
                      document
                        .getElementById(`file-upload-${collection.id}`)
                        ?.click()
                    }
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {collection.files.map((file) => (
                    <Card key={file.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {file.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {file.type}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              removeFile(collection.id, file.id)
                            }
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {collections.length === 0 && (
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <Upload className="h-8 w-8 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Collections Added</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create collections to organize your brand assets
                </p>
                <Button onClick={addCollection}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Collection
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}