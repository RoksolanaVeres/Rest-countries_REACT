import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { motion } from "framer-motion";

export default function CountryCard({ country }) {
  return (
    <Link to={`/${country.name.common}`}>
      <motion.div
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.4 },
          type: "spring",
        }}
        id="country-card"
        className="cursor-pointer rounded-lg bg-primary shadow-lg"
      >
        <div className="relative h-[160px]">
          <img
            src={country.flags.svg}
            alt={country.flags.alt}
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
        <div className="grid gap-2 px-7 pb-10 pt-7 text-sm font-semibold ">
          <h2 className="pb-1 text-lg font-bold">{country.name.common}</h2>

          <h3>
            Population:
            <span className="font-normal">
              {" "}
              {country.population !== 0
                ? Intl.NumberFormat().format(country.population)
                : "N/A"}
            </span>
          </h3>
          <h3>
            Region:
            <span className="font-normal"> {country.region}</span>
          </h3>
          <h3>
            Capital:
            <span className="font-normal">
              {" "}
              {country.capital.length > 0 ? country.capital.join(", ") : "N/A"}
            </span>
          </h3>
        </div>
      </motion.div>
    </Link>
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
