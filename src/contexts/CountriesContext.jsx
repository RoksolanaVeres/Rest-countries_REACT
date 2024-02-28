import { createContext, useState, useEffect } from "react";

export const CountriesContext = createContext(null);

const fields =
  "name,flags,capital,region,population,nativeName,subregion,topLevelDomain,tld,currencies,languages,borders,alpha3Code,cca3";
const url = `https://restcountries.com/v3.1/all?fields=${fields}`;

// data fetching function
async function getCountries() {
  const response = await fetch(url);
  const countriesData = await response.json();
  return countriesData;
}

export function CountriesContextProvider({
  children,
  storageKey = "app-countries",
}) {
  //initialize countries data

  const [countries, setCountries] = useState({
    data: localStorage.getItem(storageKey)
      ? JSON.parse(localStorage.getItem(storageKey))
      : null,
    isLoading: localStorage.getItem(storageKey) ? false : true,
  });

  useEffect(() => {
    // check if we have the data in localStorage
    const data = JSON.parse(localStorage.getItem(storageKey));
    if (data) {
      setCountries((prev) => ({
        ...prev,
        data,
        isSuccess: true,
        isError: false,
      }));
    } else {
      // if we don't have the data in localStorage, we get it from API

      setCountries((prev) => ({ ...prev, isLoading: true }));
      (async () => {
        // if success
        try {
          const data = await getCountries();
          setCountries((prev) => ({
            ...prev,
            data,
            isSuccess: true,
            isError: false,
          }));
          localStorage.setItem(storageKey, JSON.stringify(data));

          // if error
        } catch (error) {
          setCountries((prev) => ({
            ...prev,
            isError: true,
            isSuccess: false,
          }));

          // in any case make loading status false
        } finally {
          setCountries((prev) => ({ ...prev, isLoading: false }));
        }
      })();
    }
  }, []);

  const value = { countries };

  return (
    <CountriesContext.Provider value={value}>
      {children}
    </CountriesContext.Provider>
  );
}
