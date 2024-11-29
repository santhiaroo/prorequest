import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCurrency } from '@/lib/format';

interface ChartData {
  date: string;
  revenue: number;
  orders: number;
}

interface ChartDataMap {
  [key: string]: ChartData[];
}

// Mock data for different time periods
const chartData: ChartDataMap = {
  today: Array.from({ length: 24 }, (_, i) => ({
    date: `${i}:00`,
    revenue: Math.floor(Math.random() * 1000),
    orders: Math.floor(Math.random() * 5),
  })),
  '7': Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
    revenue: Math.floor(Math.random() * 5000),
    orders: Math.floor(Math.random() * 10),
  })),
  '30': Array.from({ length: 30 }, (_, i) => ({
    date: `${i + 1}`,
    revenue: Math.floor(Math.random() * 10000),
    orders: Math.floor(Math.random() * 15),
  })),
  '90': Array.from({ length: 12 }, (_, i) => ({
    date: new Date(Date.now() - (11 - i) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: Math.floor(Math.random() * 20000),
    orders: Math.floor(Math.random() * 20),
  })),
  '365': Array.from({ length: 12 }, (_, i) => ({
    date: new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'short' }),
    revenue: Math.floor(Math.random() * 50000),
    orders: Math.floor(Math.random() * 30),
  })),
};

interface RevenueChartProps {
  period: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
  }>;
}

export function RevenueChart({ period }: RevenueChartProps) {
  const data = chartData[period];

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Revenue
            </span>
            <span className="font-bold text-muted-foreground">
              {formatCurrency(payload[0].value)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Orders
            </span>
            <span className="font-bold text-muted-foreground">
              {payload[1].value}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#16a34a"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}