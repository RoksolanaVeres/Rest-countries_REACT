import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSearchParams } from "react-router-dom";

import { Input } from "@/components/ui/input";

export default function Filters({ handleInputChange, handleFilterChange }) {
  const [url] = useSearchParams();
  return (
    <div
      id="filters-container"
      className="mb-11 flex flex-col justify-between gap-6 md:flex-row"
    >
      <Input
        type="text"
        placeholder="Search for a country..."
        className="h-[58px] max-w-[480px] border-none bg-primary shadow-lg"
        onChange={handleInputChange}
        value={url.get("search") || ""}
      />

      <Select
        onValueChange={handleFilterChange}
        value={url.get("filter") || ""}
      >
        <SelectTrigger className="h-auto w-[200px] border-none bg-primary shadow-lg">
          <SelectValue placeholder="Filter by Region" />
        </SelectTrigger>
        <SelectContent className="bg-primary">
          <SelectGroup>
            <SelectLabel>Regions</SelectLabel>
            <SelectItem value="africa">Africa</SelectItem>
            <SelectItem value="americas">America</SelectItem>
            <SelectItem value="asia">Asia</SelectItem>
            <SelectItem value="europe">Europe</SelectItem>
            <SelectItem value="oceania">Oceania</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
