import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

export default function Filters() {
  return (
    <div
      id="filters-container"
      className="mb-11 flex flex-col justify-between gap-6 md:flex-row"
    >
      <Input
        type="text"
        placeholder="Search for a country..."
        className="h-[58px] max-w-[480px] border-none text-white/90 shadow-lg dark:bg-slate-800 dark:placeholder:text-white/90 "
      />

      <Select>
        <SelectTrigger className="h-auto w-[200px] border-none shadow-lg dark:bg-slate-800 dark:text-white/90">
          <SelectValue placeholder="Filter by Region" />
        </SelectTrigger>
        <SelectContent className="dark:bg-slate-800 dark:text-white">
          <SelectGroup>
            <SelectLabel>Regions</SelectLabel>
            <SelectItem value="africa">Africa</SelectItem>
            <SelectItem value="america">America</SelectItem>
            <SelectItem value="asia">Asia</SelectItem>
            <SelectItem value="europe">Europe</SelectItem>
            <SelectItem value="oceania">Oceania</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}