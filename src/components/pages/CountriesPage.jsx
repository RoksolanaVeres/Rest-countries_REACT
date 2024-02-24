import Filters from "../Filters";
import { CountriesContext } from "@/contexts/CountriesContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function CountriesPage() {
  const { countries } = useContext(CountriesContext);

  return (
    <main className="px-7 py-12 md:px-20">
      <Filters />
      <div className="grid grid-cols-auto-fill-265 justify-between gap-x-10 gap-y-20 dark:text-white">
        {countries.data &&
          countries.data.map((country) => {
            return (
              <div
                key={country.name.common}
                className="rounded-lg bg-white shadow-lg dark:bg-slate-800"
              >
                <div className="h-[160px]">
                  <Link to={`/${country.name.common}`}>
                    <img
                      src={country.flags.svg}
                      alt={country.flags.alt}
                      className="fit h-full w-full rounded-lg object-cover"
                    />
                  </Link>
                </div>
                <div className="grid gap-2 px-7 pb-10 pt-7 text-sm font-semibold text-black dark:text-white">
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
                    <span className="font-normal"> {country.continents}</span>
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
