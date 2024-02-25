import { Link, useParams } from "react-router-dom";
import { CountriesContext } from "@/contexts/CountriesContext";
import { useContext } from "react";
import { MoveLeft } from "lucide-react";

export default function CountryPage() {
  const { countries } = useContext(CountriesContext);
  const params = useParams();
  const chosenCountry = params.country;

  let countryData = null;

  if (countries.data) {
    countryData = countries.data.find(
      (_country) => _country.name.common === chosenCountry,
    );
  }

  console.log(countryData);

  // info derived from countryData
  const { capital, subregion, continents: region, population } = countryData;
  const flagSvg = countryData.flags.svg;
  const flagAlt = countryData.flags.alt;
  const commonName = countryData.name.common;
  // native name
  const nativeNameKey = Object.keys(countryData.name.nativeName)[0];
  const nativeName = countryData.name.nativeName[nativeNameKey].official;
  // currencies
  let currencies = [];
  for (let key in countryData.currencies) {
    currencies.push(countryData.currencies[key].name);
  }
  currencies = currencies.join(", ");
  //languages
  const languages = Object.values(countryData.languages).join(", ");
  // top level domain
  const tld = countryData.tld.join(", ");
  // border countries
  let countriesSymbols = countryData.borders;

  return (
    <>
      <main className="lg:px-20 px-7 py-12 md:px-16">
        <Link to="/">
          <button className="flex items-center gap-4 rounded-lg px-10 py-3 text-2xl shadow-2xl dark:bg-slate-800 dark:text-white">
            <MoveLeft />
            <span>Back</span>
          </button>
        </Link>
        <div id="country-card" className="lg:grid-cols-2 grid gap-20 pt-24">
          <div id="country-flag" className="mx-auto max-w-[600px]">
            <img src={flagSvg} alt={flagAlt} />
          </div>
          <div
            id="country-info"
            className="lg:grid-cols-2 lg:text-base lg:gap-10 grid gap-16 text-lg"
          >
            <h1 className="lg:col-span-2 text-4xl font-bold">{commonName}</h1>
            <div id="country-info--main" className="">
              <ul className="grid gap-3">
                <li>
                  <span className="font-semibold">Native Name: </span>
                  {nativeName}
                </li>
                <li>
                  <span className="font-semibold"> Population: </span>
                  {population}
                </li>
                <li>
                  <span className="font-semibold"> Region: </span>
                  {region}
                </li>
                <li>
                  <span className="font-semibold"> Sub Region: </span>
                  {subregion}
                </li>
                <li>
                  <span className="font-semibold"> Capital: </span>
                  {capital}
                </li>
              </ul>
            </div>
            <div id="country-info--additional" className="">
              <ul className="grid gap-3">
                <li>
                  <span className="font-semibold"> Top Level Domain: </span>
                  {tld}
                </li>
                <li>
                  <span className="font-semibold"> Currencies: </span>
                  {currencies}
                </li>
                <li>
                  <span className="font-semibold"> Languages: </span>
                  {languages}
                </li>
              </ul>
            </div>
            <div
              id="country-info--borders"
              className="lg:col-span-2 lg:flex lg:items-center gap-6"
            >
              <h2 className="lg:pb-0 pb-8 font-semibold">Border Countries:</h2>
              <ul className="grid-cols-auto-fill-150 lg:grid-cols-auto-fill-100 lg:flex-1 grid justify-between gap-4">
                {countriesSymbols.map((symbol) => {
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
