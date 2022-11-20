import { ProductListing } from "../../components/products/ProductListing";
import Navbar from "../../components/Navbar";
import { ProductCard } from "../../components/products/ProductCard";
import { SortBy } from "../../components/marketSettings/SortBy";
import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";

export default function Market() {
  const [sort, setSort] = useState("priceBot");
  const [sortedProducts, setSortedProducts] = useState<any>([]);
  const { data: listingsData } =
    trpc.listing.getAllListings.useQuery(undefined);
  useEffect(() => {
    console.log(listingsData);
    if (listingsData) {
      if (sort === "newest") {
        const newArray = [...listingsData];
        setSortedProducts(() => {
          return newArray.sort((a, b) => {
            return a.creationDate > b.creationDate ? -1 : 1;
          });
        });
      } else if (sort === "priceTop") {
        const newArray = [...listingsData];
        setSortedProducts(() => {
          return newArray.sort((a, b) => {
            return Number(a.price) > Number(b.price) ? -1 : 1;
          });
        });
      } else if (sort === "priceBot") {
        const newArray = [...listingsData];
        setSortedProducts(() => {
          return newArray.sort((a, b) => {
            return Number(a.price) < Number(b.price) ? -1 : 1;
          });
        });
      }
    }
  }, [sort, listingsData]);

  console.log(sortedProducts, listingsData);

  return (
    <div className="h-full">
      <Navbar />
      <div className="md:flex">
        <div className="min-h-full min-w-min border-r-2 border-neutral-200 shadow-lg shadow-neutral-200">
          <div className="flex w-full place-content-center md:w-64">
            <SortBy setSort={setSort} />
          </div>
        </div>
        <div className="flex grow flex-wrap place-content-center">
          {sortedProducts?.map((listing) => {
            return (
              <ProductCard
                key={listing.id}
                id={listing.id}
                city={listing.owner.city ?? ""}
                image="/coompost.png"
                name={listing.name}
                price={String(listing.price)}
                weight={listing.weight}
                seller={listing.owner.name ?? ""}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
