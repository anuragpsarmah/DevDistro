import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface YearSelectorProps {
  selectedYear: string;
  years: number[];
  onYearChange: (value: string) => void;
}

export const YearSelector: React.FC<YearSelectorProps> = ({
  selectedYear,
  years,
  onYearChange,
}) => (
  <Select value={selectedYear} onValueChange={onYearChange}>
    <SelectTrigger className="w-[100px] bg-gray-700 text-gray-300 border-gray-600">
      <SelectValue placeholder="Year" />
    </SelectTrigger>
    <SelectContent className="bg-gray-700 text-gray-300 border-gray-600">
      {years.map((year) => (
        <SelectItem key={year} value={year.toString()}>
          {year}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
