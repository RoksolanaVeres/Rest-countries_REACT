import Filters from "../Filters";
import { CountriesContext } from "@/contexts/CountriesContext";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import CountryCard from "../CountryCard";

export default function CountriesPage() {
  const { countries } = useContext(CountriesContext);
  const [url, setUrl] = useSearchParams();
  const PER_PAGE = 20;

  if (countries.isLoading)
    return (
      <main className="px-7 py-12 md:px-20">
        <Filters
          handleInputChange={handleInputChange}
          handleFilterChange={handleFilterChange}
        />
        <div className="grid grid-cols-auto-fill-265 justify-between gap-x-10 gap-y-20">
          {[...Array(PER_PAGE)].map((_, idx) => (
            <CountryCard.Skeleton key={idx} />
          ))}
        </div>
      </main>
    );

  function handleInputChange(event) {
    setUrl((prev) => ({
      filter: prev.get("filter") || "",
      search: event.target.value,
    }));
  }

  function handleFilterChange(val) {
    setUrl((prev) => ({ search: prev.get("search") || "", filter: val }));
  }

  let displayedCountries = [];

  if (countries.data) {
    let filtered = [...countries.data];

    const search = url.get("search");
    const filter = url.get("filter");

    if (search) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (filter) {
      filtered = filtered.filter(
        (country) => country.region.toLowerCase() === filter.toLowerCase(),
      );
    }

    displayedCountries = [...filtered];
  }

  return (
    <main className="px-7 py-12 md:px-20">
      <Filters
        handleInputChange={handleInputChange}
        handleFilterChange={handleFilterChange}
      />
      <div className="grid grid-cols-auto-fill-265 justify-between gap-x-10 gap-y-20">
        {countries.data &&
          displayedCountries.map((country) => {
            return <CountryCard country={country} key={country.name.common} />;
          })}
      </div>
    </main>
  );
}
