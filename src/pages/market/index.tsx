import { ProductListing } from "../../components/products/ProductListing";
import Navbar from "../../components/Navbar";
import { ProductCard } from "../../components/products/ProductCard";
import { SortBy } from "../../components/marketSettings/SortBy";
import { useState } from "react";
import { trpc } from "../../utils/trpc";

export default function Market() {
  const [sort, setSort] = useState("newest");
  const { data: listingsData } = trpc.listing.getAllListings.useQuery(undefined)

  return (
    <div className="">
      <Navbar />
      <div className="md:flex">
        <div className="min-w-min border-r-2 border-neutral-200 shadow-lg shadow-neutral-200">
          <div className="flex w-full place-content-center md:w-64">
            <SortBy setSort={setSort} />
          </div>
        </div>
        <div className="flex grow flex-wrap place-content-center">
          {
            listingsData?.map(listing => {
              return (
                <ProductCard key={listing.id} id={listing.id} city={listing.owner.city??""} image="/coompost.png" name={listing.name} price={ String(listing.price) } weight={listing.weight} seller={listing.owner.name??""}/>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}
