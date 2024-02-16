import { createContext, useState, useEffect } from "react";

export const CountriesContext = createContext(null);

export function CountriesContextProvider({
  children,
  storageKey = "app-countries",
}) {
  // data fetching function
  const fields =
    "name,flags,capital,continents,population,nativeName,subregion,topLevelDomain,currencies,languages,borders";
  const url = `https://restcountries.com/v3.1/all?fields=${fields}`;

  async function getCountries() {
    const response = await fetch(url);
    const countriesData = await response.json();
    return countriesData;
  }

  //initialize countries data
  const [countries, setCountries] = useState({
    data: localStorage.getItem(storageKey)
      ? JSON.parse(localStorage.getItem(storageKey))
      : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
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
        try {
          const data = await getCountries();
          setCountries((prev) => ({
            ...prev,
            data,
            isSuccess: true,
            isError: false,
          }));
          localStorage.setItem(storageKey, JSON.stringify(data));
        } catch (error) {
          setCountries((prev) => ({
            ...prev,
            isError: true,
            isSuccess: false,
          }));
          // make loading status false in any case
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
