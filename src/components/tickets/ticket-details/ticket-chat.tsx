import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from '@/lib/date';
import { mockTicketMessages } from './mock-data';
import {
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  Upload,
  Send,
  MessageSquare,
  Users,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function TicketChat() {
  const [message, setMessage] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [showMentions, setShowMentions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message submission
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === '@') {
      setShowMentions(true);
    }
  };

  const insertMention = (name: string) => {
    setMessage((prev) => prev + `@${name} `);
    setShowMentions(false);
  };

  const handleFileUpload = (asDeliverable: boolean = false) => {
    // Handle file upload
    if (asDeliverable) {
      // Change ticket status to delivered
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {mockTicketMessages.map((msg) => (
          <Card key={msg.id}>
            <CardHeader className="flex flex-row items-start space-x-4 space-y-0 p-4">
              <Avatar>
                <AvatarImage src={msg.author.avatar} />
                <AvatarFallback>{msg.author.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{msg.author.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(msg.timestamp)}
                  </span>
                  {msg.isPrivate && (
                    <Badge variant="secondary">Team Only</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {msg.author.role}
                </p>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              {msg.files && (
                <div className="mt-4 flex gap-2">
                  {msg.files.map((file) => (
                    <Badge key={file.name} variant="secondary">
                      {file.name}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="public">
            <TabsList className="m-4">
              <TabsTrigger value="public">
                <MessageSquare className="h-4 w-4 mr-2" />
                Public Reply
              </TabsTrigger>
              <TabsTrigger value="private">
                <Users className="h-4 w-4 mr-2" />
                Team Message
              </TabsTrigger>
            </TabsList>
            <CardContent className="p-4 pt-0">
              <div className="space-y-4">
                <div className="border rounded-md p-2">
                  <div className="flex gap-2 mb-2">
                    <Button type="button" size="sm" variant="ghost">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button type="button" size="sm" variant="ghost">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button type="button" size="sm" variant="ghost">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button type="button" size="sm" variant="ghost">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-h-[100px]"
                  />
                </div>

                {showMentions && (
                  <Popover open={showMentions} onOpenChange={setShowMentions}>
                    <PopoverContent className="w-[200px] p-0" align="start">
                      <Command>
                        <CommandGroup heading="Team Members">
                          <CommandItem onSelect={() => insertMention('Sarah')}>
                            Sarah Wilson
                          </CommandItem>
                          <CommandItem onSelect={() => insertMention('Mike')}>
                            Mike Johnson
                          </CommandItem>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => handleFileUpload(false)}>
                      <Upload className="h-4 w-4 mr-2" />
                      Attach Files
                    </Button>
                    <Button type="button" variant="outline" onClick={() => handleFileUpload(true)}>
                      <Upload className="h-4 w-4 mr-2" />
                      Send as Deliverable
                    </Button>
                  </div>
                  <Button type="submit">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Tabs>
        </form>
      </Card>
    </div>
  );
}