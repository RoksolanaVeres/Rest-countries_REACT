import { Link, useParams } from "react-router-dom";
import { CountriesContext } from "@/contexts/CountriesContext";
import { useContext } from "react";
import { MoveLeft } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { motion } from "framer-motion";

export default function CountryPage() {
  const { countries } = useContext(CountriesContext);
  const params = useParams();
  const chosenCountry = params.country;

  if (countries.isLoading) {
    return (
      <CountryPageWrapper>
        <BackButton />
        <CountryPageSkeleton />
      </CountryPageWrapper>
    );
  }

  if (countries.isError) {
    return <p>Failed to load the data</p>;
  }

  const countryData = countries.data.find(
    (_country) => _country.name.common === chosenCountry,
  );

  // info derived from countryData
  let nativeName = null;
  const nativeNameKey = Object.keys(countryData.name.nativeName)[0];
  if (nativeNameKey) {
    nativeName = countryData.name.nativeName[nativeNameKey].official;
  }

  let currencies = [];
  for (let key in countryData.currencies) {
    currencies.push(countryData.currencies[key].name);
  }
  currencies = currencies.join(", ");

  const languages =
    Object.values(countryData.languages).length > 0
      ? Object.values(countryData.languages).join(", ")
      : "N/A";
  const tld = countryData.tld.join(", ");
  const countriesSymbols = countryData.borders;

  return (
    <>
      <CountryPageWrapper>
        <BackButton />
        <div id="country-card" className="grid gap-20 pt-24 lg:grid-cols-2">
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.4 },
              type: "spring",
            }}
            id="country-flag"
            className=" relative mx-auto h-fit max-w-[600px] shadow-lg"
          >
            {countryData.name.common === "Russia" && (
              <p className="absolute w-full bg-black p-2 text-xl text-white">
                #russiaIsATerroristState
              </p>
            )}
            <a
              href={
                countryData.name.common === "Russia"
                  ? "https://en.wikipedia.org/wiki/War_crimes_in_the_Russian_invasion_of_Ukraine"
                  : `https://en.wikipedia.org/wiki/${countryData.name.common}`
              }
              target="blank"
            >
              <img
                src={countryData.flags.svg}
                alt={countryData.flags.alt}
                className="w-full md:w-[600px]"
              />
            </a>
          </motion.div>
          <div
            id="country-info"
            className="grid gap-16 text-lg lg:grid-cols-2 lg:gap-10 lg:text-base"
          >
            <h1 className="text-4xl font-bold lg:col-span-2">
              {countryData.name.common}
            </h1>
            <div id="country-info--main" className="">
              <ul className="grid gap-3">
                <li>
                  <span className="font-semibold">Native Name: </span>
                  {nativeName ? nativeName : "N/A"}
                </li>
                <li>
                  <span className="font-semibold"> Population: </span>{" "}
                  {countryData.population !== 0
                    ? new Intl.NumberFormat().format(countryData.population)
                    : "N/A"}
                </li>
                <li>
                  <span className="font-semibold"> Region: </span>
                  {countryData.region}
                </li>
                <li>
                  <span className="font-semibold"> Sub Region: </span>
                  {countryData.subregion.length > 0
                    ? countryData.subregion
                    : "N/A"}
                </li>
                <li>
                  <span className="font-semibold"> Capital: </span>
                  {countryData.capital.length > 0
                    ? countryData.capital.join(", ")
                    : "N/A"}
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
                  {currencies.length > 0 ? currencies : "N/A"}
                </li>
                <li>
                  <span className="font-semibold"> Languages: </span>
                  {languages}
                </li>
              </ul>
            </div>
            <div
              id="country-info--borders"
              className="gap-6 lg:col-span-2 lg:flex lg:items-center"
            >
              <h2 className="pb-8 font-semibold lg:pb-0">Border Countries:</h2>
              {countriesSymbols.length > 0 ? (
                <ul className="grid auto-rows-fr grid-cols-auto-fill-150 justify-between gap-4 lg:flex-1 lg:grid-cols-auto-fill-100">
                  {countriesSymbols.map((symbol) => {
                    let borderCountry = countries.data.find(
                      (_country) => _country.cca3 === symbol,
                    );
                    return (
                      <li key={borderCountry.name.common}>
                        <Link to={`/${borderCountry.name.common}`}>
                          <motion.button
                            whileHover={{
                              scale: 1.1,
                              transition: { duration: 0.4 },
                            }}
                            className="h-full w-full rounded-lg bg-primary p-2 shadow-lg "
                          >
                            {borderCountry.name.common}
                          </motion.button>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                "N/A"
              )}
            </div>
          </div>
        </div>
      </CountryPageWrapper>
    </>
  );
}

function CountryPageWrapper({ children }) {
  return <main className="px-7 py-12 md:px-16 lg:px-20">{children}</main>;
}

function BackButton() {
  return (
    <div id="button-container" className="w-[120px]">
      <Link to="/">
        <motion.button
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.4 },
          }}
          className="flex w-[120px] flex-auto items-center justify-center gap-2 rounded-lg bg-primary p-2 text-xl shadow-lg"
        >
          <MoveLeft />
          <span>Back</span>
        </motion.button>
      </Link>
    </div>
  );
}

function CountryPageSkeleton() {
  return (
    <div className="grid gap-20 pt-24 lg:grid-cols-2">
      <Skeleton className="h-[300px] " />
      <div className="grid gap-16 lg:grid-cols-2">
        <Skeleton className="h-[30px] w-3/4 lg:col-span-2 lg:w-auto" />
        <Skeleton className="h-[20px] w-2/3 lg:h-[200px] lg:w-auto " />
        <Skeleton className="h-[20px] w-2/3 lg:h-[200px] lg:w-auto" />
      </div>
    </div>
  );
}
