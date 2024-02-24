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
  const {
    capital,
    subregion,
    continents: region,
    population,
    tld,
  } = countryData;
  const flagSvg = countryData.flags.svg;
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
  // border countries
  let countriesSymbols = countryData.borders;

  return (
    <>
      <main className="px-7 py-12 md:px-20">
        <Link to="/">
          <button className="flex items-center gap-4 rounded-lg px-10 py-3 text-2xl shadow-2xl dark:bg-slate-800 dark:text-white">
            <MoveLeft />
            <span>Back</span>
          </button>
        </Link>
        <div id="country-card" className="grid gap-20 py-24 md:grid-cols-2">
          <div id="country-flag" className="">
            <img src={flagSvg} alt="" />
          </div>
          <div id="country-info" className="grid gap-16 md:grid-cols-2">
            <h1 className="text-4xl font-bold md:col-span-2">{commonName}</h1>
            <div id="country-info--main" className="">
              <ul>
                <li>Native Name: {nativeName}</li>
                <li>Population: {population}</li>
                <li>Region: {region}</li>
                <li>Sub Region: {subregion}</li>
                <li>Capital: {capital}</li>
              </ul>
            </div>
            <div id="country-info--additional" className="">
              <ul className="*:flex *:gap-2">
                <li>Top Level Domain: {tld}</li>
                <li>Currencies: {currencies}</li>
                <li>Languages: {languages}</li>
              </ul>
            </div>
            <div id="country-info--borders" className="md:col-span-2">
              <h2>Border Countries:</h2>
              <ul>
                {countriesSymbols.map((symbol) => {
                  let borderCountry = countries.data.find(
                    (_country) => _country.cca3 === symbol,
                  );
                  return (
                    <li key={borderCountry.name.common}>
                      <Link to={`/${borderCountry.name.common}`}>
                        <button>{borderCountry.name.common}</button>
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
