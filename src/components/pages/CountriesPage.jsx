import Filters from "../Filters";
import { CountriesContext } from "@/contexts/CountriesContext";
import { useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function CountriesPage() {
  const { countries } = useContext(CountriesContext);
  const [url, setUrl] = useSearchParams();

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
            return (
              <div
                key={country.name.common}
                className="rounded-lg bg-primary shadow-lg"
              >
                <div className="h-[160px]">
                  <Link to={`/${country.name.common}`}>
                    <img
                      src={country.flags.svg}
                      alt={country.flags.alt}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </Link>
                </div>
                <div className="grid gap-2 px-7 pb-10 pt-7 text-sm font-semibold ">
                  <Link to={`/${country.name.common}`}>
                    <h2 className="pb-1 text-lg font-bold">
                      {country.name.common}
                    </h2>
                  </Link>

                  <h3>
                    Population:
                    <span className="font-normal"> {country.population}</span>
                  </h3>
                  <h3>
                    Region:
                    <span className="font-normal"> {country.region}</span>
                  </h3>
                  <h3>
                    Capital:
                    <span className="font-normal"> {country.capital}</span>
                  </h3>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}
