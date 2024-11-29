import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockBrands } from './mock-data';

export function BrandSelector() {
  return (
    <Select defaultValue={mockBrands[0].id}>
      <SelectTrigger className="w-[200px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {mockBrands.map((brand) => (
          <SelectItem key={brand.id} value={brand.id}>
            <div className="flex items-center space-x-2">
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-4 w-4 rounded"
              />
              <span>{brand.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}