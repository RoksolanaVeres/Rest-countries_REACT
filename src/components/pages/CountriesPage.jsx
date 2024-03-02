import Filters from "../Filters";
import { CountriesContext } from "@/contexts/CountriesContext";
import { useContext, useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import CountryCard from "../CountryCard";
import { useInView } from "react-intersection-observer";
import { ArrowBigUp } from "lucide-react";
import { Button } from "../ui/button";

const PER_PAGE = 20;

export default function CountriesPage() {
  const { countries } = useContext(CountriesContext);
  const [url, setUrl] = useSearchParams();
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView(false);

  useEffect(() => {
    if (inView) {
      setPage((page) => page + 1);
    }
  }, [inView]);

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
      filtered = filtered.filter((country) => country.region === filter);
    }

    displayedCountries = filtered.slice(0, page * PER_PAGE);
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
      <div className="h-1 w-full" ref={ref}>
        <ScrollToTopButton />
      </div>
    </main>
  );
}

function ScrollToTopButton() {
  const buttonRef = useRef(null);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const scrollHandler = () => {
    const threshold = 350;
    const button = buttonRef.current;
    if (window.scrollY > threshold) {
      button.classList.remove("hidden");
    } else {
      button.classList.add("hidden");
    }
  };

  useEffect(() => {
    buttonRef.current.classList.add("hidden");
    window.addEventListener("scroll", scrollHandler);
  }, []);

  return (
    <Button
      ref={buttonRef}
      variant="outline"
      className="fixed bottom-3 right-3 shadow-lg"
      onClick={scrollToTop}
    >
      <ArrowBigUp />
    </Button>
  );
}
