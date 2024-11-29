import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from '@/lib/date';
import { Link } from 'react-router-dom';

const recentBrands = [
  {
    id: 'BRD-001',
    name: 'Acme Brand',
    type: 'primary',
    client: {
      id: 'CLT-001',
      name: 'Acme Corporation',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
  {
    id: 'BRD-002',
    name: 'TechStart Pro',
    type: 'secondary',
    client: {
      id: 'CLT-002',
      name: 'TechStart Inc',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
  },
];

export function RecentBrands() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Brands</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentBrands.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="space-y-1">
                <Link
                  to={`/brands/${brand.id}`}
                  className="font-medium hover:underline"
                >
                  {brand.name}
                </Link>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/clients/${brand.client.id}`}
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    {brand.client.name}
                  </Link>
                  <Badge
                    variant="secondary"
                    className={
                      brand.type === 'primary'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted'
                    }
                  >
                    {brand.type}
                  </Badge>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Created {formatDistanceToNow(brand.createdAt)} ago
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}