import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRef } from "react";

import { useSearchParams } from "react-router-dom";

import { Input } from "@/components/ui/input";

export default function Filters({ handleInputChange, handleFilterChange }) {
  // const ref = useRef(null);
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
        <SelectTrigger className="h-[58px] w-[200px] border-none bg-primary shadow-lg">
          <SelectValue placeholder="Filter by Region" />
        </SelectTrigger>
        <SelectContent
          className="select-none bg-primary"
          ref={(ref) => {
            if (!ref) return;
            ref.ontouchstart = (e) => {
              e.preventDefault();
            };
          }}
        >
          <SelectGroup>
            <SelectLabel>Regions</SelectLabel>
            <SelectItem value="Africa">Africa</SelectItem>
            <SelectItem value="Americas">America</SelectItem>
            <SelectItem value="Asia">Asia</SelectItem>
            <SelectItem value="Europe">Europe</SelectItem>
            <SelectItem value="Oceania">Oceania</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
