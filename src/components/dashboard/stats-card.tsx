import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: React.ReactNode;
  value: string | number;
  icon: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function StatsCard({
  title,
  value,
  icon,
  description,
  className,
  onClick,
}: StatsCardProps) {
  return (
    <Card 
      className={cn(
        onClick && 'cursor-pointer transition-colors hover:bg-accent/50',
        className
      )}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">{title}</div>
          {icon}
        </div>
        <div className="mt-2 space-y-1">
          <div className="text-2xl font-bold">{value}</div>
          {description && (
            <div className="text-sm text-muted-foreground">
              {description}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}