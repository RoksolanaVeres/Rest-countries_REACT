import Header from "./components/Header";
import Filters from "./components/Filters";
import { CountriesContext } from "./contexts/CountriesContext";
import { useContext } from "react";

export default function App() {
  const { countries } = useContext(CountriesContext);

  return (
    <div
      id="app-layout"
      className="flex justify-center font-nunito dark:bg-slate-900"
    >
      <div
        id="container--main"
        className="min-h-dvh w-full max-w-[1500px] dark:bg-slate-900"
      >
        <Header />
        <main className="px-7 py-12 md:px-20">
          <Filters />
          <div className="grid grid-cols-auto-fill-265 justify-between gap-x-10 gap-y-20 dark:text-white">
            {countries.data.map((country) => {
              return (
                <div
                  key={country.name.common}
                  className="rounded-lg bg-white shadow-lg dark:bg-slate-800"
                >
                  <div className="h-[160px]">
                    <img
                      src={country.flags.svg}
                      alt={country.flags.alt}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                  <div className="grid gap-2 px-7 pb-10 pt-7 text-sm font-semibold text-black dark:text-white">
                    <h2 className="pb-1 text-lg font-bold">
                      {country.name.common}
                    </h2>
                    <h3 className="">
                      Population:{" "}
                      <span className="font-normal">{country.population}</span>
                    </h3>
                    <h3 className="">
                      Region:{" "}
                      <span className="font-normal">{country.region}</span>
                    </h3>
                    <h3 className="">
                      Capital:{" "}
                      <span className="font-normal">{country.capital}</span>
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
