import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from '@/lib/date';
import { mockTicketDetails } from './mock-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export function TicketMeta() {
  const ticket = mockTicketDetails;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ticket Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status and Priority */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Status</h3>
              <Select defaultValue={ticket.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="review">Ready for Review</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Priority</h3>
              <Select defaultValue={ticket.priority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Client Info */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Client</h3>
            <Button variant="ghost" className="w-full justify-start p-0 h-auto hover:bg-transparent">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={ticket.client.avatar} />
                  <AvatarFallback>{ticket.client.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{ticket.client.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {ticket.client.company}
                  </div>
                </div>
              </div>
            </Button>
          </div>

          <Separator />

          {/* Team Members */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Assigned Team</h3>
            <div className="space-y-3">
              {ticket.assignedTeam.map((member) => (
                <Button key={member.id} variant="ghost" className="w-full justify-start p-0 h-auto hover:bg-transparent">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {member.role}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Brand */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Brand</h3>
            <Select defaultValue={ticket.brand.id}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={ticket.brand.logo} />
                    <AvatarFallback>{ticket.brand.initials}</AvatarFallback>
                  </Avatar>
                  <span>{ticket.brand.name}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                {ticket.client.brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={brand.logo} />
                        <AvatarFallback>{brand.initials}</AvatarFallback>
                      </Avatar>
                      <span>{brand.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Complete Button */}
          <Button className="w-full" size="lg">
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark as Completed
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}