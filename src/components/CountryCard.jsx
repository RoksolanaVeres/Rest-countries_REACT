import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";

export default function CountryCard({ country }) {
  return (
    <div id="country-card" className="rounded-lg bg-primary shadow-lg">
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
        <Link
          to={`/${country.name.common}`}
          className="w-fit hover:underline hover:underline-offset-8"
        >
          <h2 className="pb-1 text-lg font-bold">{country.name.common}</h2>
        </Link>
        <h3>
          Population:
          <span className="font-normal">
            {Intl.NumberFormat().format(country.population)}
          </span>
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
}

function CountryCardSkeleton() {
  return (
    <div id="country-card" className="rounded-lg bg-primary shadow-lg">
      <Skeleton className="h-[160px]" />
      <div className="grid gap-2 px-7 pb-10 pt-7">
        <Skeleton className="h-[30px] pb-1" />
        <Skeleton className="h-[20px]" />
        <Skeleton className="h-[20px]" />
        <Skeleton className="h-[20px]" />
      </div>
    </div>
  );
}

CountryCard.Skeleton = CountryCardSkeleton;
