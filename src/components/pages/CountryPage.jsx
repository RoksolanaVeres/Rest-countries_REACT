import { Link, useParams } from "react-router-dom";
import { CountriesContext } from "@/contexts/CountriesContext";
import { useContext } from "react";
import { MoveLeft } from "lucide-react";

export default function CountryPage() {
  const { countries } = useContext(CountriesContext);
  const params = useParams();
  const chosenCountry = params.country;

  const COUNTRY = {
    capital: undefined,
    region: undefined,
    subregion: undefined,
    population: undefined,
    flagSvg: undefined,
    flagAlt: undefined,
    commonName: undefined,
    nativeName: undefined,
    tld: undefined,
    languages: undefined,
    currencies: [],
    countriesSymbols: [],
  };

  console.log("COUNTRY", COUNTRY);
  console.log("countries.data", countries.data);

  if (countries.data) {
    const countryData = countries.data.find(
      (_country) => _country.name.common === chosenCountry,
    );
    COUNTRY.capital = countryData.capital;
    COUNTRY.subregion = countryData.capital;
    COUNTRY.region = countryData.region;
    COUNTRY.population = countryData.population;
    COUNTRY.flagSvg = countryData.flags.svg;
    COUNTRY.flagAlt = countryData.flags.alt;
    COUNTRY.commonName = countryData.name.common;
    let nativeNameKey = Object.keys(countryData.name.nativeName)[0];
    COUNTRY.nativeName = countryData.name.nativeName[nativeNameKey].official;
    for (let key in countryData.currencies) {
      COUNTRY.currencies.push(countryData.currencies[key].name);
    }
    COUNTRY.currencies = COUNTRY.currencies.join(", ");
    COUNTRY.languages = Object.values(countryData.languages).join(", ");
    COUNTRY.tld = countryData.tld.join(", ");
    COUNTRY.countriesSymbols = countryData.borders;
  }

  return (
    <>
      <main className="px-7 py-12 md:px-16 lg:px-20">
        <Link to="/">
          <button className="flex items-center gap-4 rounded-lg px-10 py-3 text-2xl shadow-2xl dark:bg-slate-800 dark:text-white">
            <MoveLeft />
            <span>Back</span>
          </button>
        </Link>
        <div id="country-card" className="grid gap-20 pt-24 lg:grid-cols-2">
          <div
            id="country-flag"
            className="mx-auto h-fit max-w-[600px] shadow-2xl"
          >
            <img src={COUNTRY.flagSvg} alt={COUNTRY.flagAlt} className="" />
          </div>
          <div
            id="country-info"
            className="grid gap-16 text-lg lg:grid-cols-2 lg:gap-10 lg:text-base"
          >
            <h1 className="text-4xl font-bold lg:col-span-2">
              {COUNTRY.commonName}
            </h1>
            <div id="country-info--main" className="">
              <ul className="grid gap-3">
                <li>
                  <span className="font-semibold">Native Name: </span>
                  {COUNTRY.nativeName}
                </li>
                <li>
                  <span className="font-semibold"> Population: </span>
                  {COUNTRY.population}
                </li>
                <li>
                  <span className="font-semibold"> Region: </span>
                  {COUNTRY.region}
                </li>
                <li>
                  <span className="font-semibold"> Sub Region: </span>
                  {COUNTRY.subregion}
                </li>
                <li>
                  <span className="font-semibold"> Capital: </span>
                  {COUNTRY.capital}
                </li>
              </ul>
            </div>
            <div id="country-info--additional" className="">
              <ul className="grid gap-3">
                <li>
                  <span className="font-semibold"> Top Level Domain: </span>
                  {COUNTRY.tld}
                </li>
                <li>
                  <span className="font-semibold"> Currencies: </span>
                  {COUNTRY.currencies}
                </li>
                <li>
                  <span className="font-semibold"> Languages: </span>
                  {COUNTRY.languages}
                </li>
              </ul>
            </div>
            <div
              id="country-info--borders"
              className="gap-6 lg:col-span-2 lg:flex lg:items-center"
            >
              <h2 className="pb-8 font-semibold lg:pb-0">Border Countries:</h2>
              <ul className="grid auto-rows-fr grid-cols-auto-fill-150 justify-between gap-4 lg:flex-1 lg:grid-cols-auto-fill-100">
                {COUNTRY.countriesSymbols.map((symbol) => {
                  let borderCountry = countries.data.find(
                    (_country) => _country.cca3 === symbol,
                  );
                  return (
                    <li key={borderCountry.name.common}>
                      <Link to={`/${borderCountry.name.common}`}>
                        <button className="h-full w-full rounded-lg p-2 shadow-2xl dark:bg-slate-800 dark:text-white">
                          {borderCountry.name.common}
                        </button>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
