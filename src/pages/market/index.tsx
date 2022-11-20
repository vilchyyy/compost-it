import { ProductListing } from "../../components/products/ProductListing";
import Navbar from "../../components/Navbar";
import { ProductCard } from "../../components/products/ProductCard";
import { SortBy } from "../../components/marketSettings/SortBy";
import { useState } from "react";

export default function Market() {
  const [sort, setSort] = useState("newest");
  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <div className="min-w-min border-r-2 border-neutral-200 shadow-lg shadow-neutral-200">
          <div className="flex w-64 place-content-center">
            <SortBy setSort={setSort} />
          </div>
        </div>
        <div className="flex grow flex-wrap place-content-center">
          <ProductCard
            image="/coompost.png"
            name="Kompost świeży świeży 5 świeży 5 świeży 5 5kg"
            price="12.00zl"
            seller="Radzisklep"
            city="J-Bie"
            weight="5kg"
          />
          <ProductCard
            image="/coompost.png"
            name="Kompost"
            price="12.00zl"
            seller="Radzisklep"
            city="J-Bie"
            weight="5kg"
          />
          <ProductCard
            image="/coompost.png"
            name="aaa"
            price="12.00zl"
            seller="Radzisklep"
            city="J-Bie"
            weight="5kg"
          />
          <ProductCard
            image="/coompost.png"
            name="aaa"
            price="12.00zl"
            seller="Radzisklep"
            city="J-Bie"
            weight="5kg"
          />
          <ProductCard
            image="/coompost.png"
            name="aaa"
            price="12.00zl"
            seller="Radzisklep"
            city="J-Bie"
            weight="5kg"
          />
        </div>
      </div>
    </div>
  );
}
