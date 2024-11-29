import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const data = [
  { name: 'New', value: 12, color: 'hsl(var(--chart-1))' },
  { name: 'In Progress', value: 8, color: 'hsl(var(--chart-2))' },
  { name: 'Review', value: 5, color: 'hsl(var(--chart-3))' },
  { name: 'Completed', value: 15, color: 'hsl(var(--chart-4))' },
];

export function TicketsChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Tickets Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}