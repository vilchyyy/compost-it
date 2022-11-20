import { ProductListing } from "../../components/products/ProductListing";
import Navbar from "../../components/Navbar";
import { ProductCard } from "../../components/products/ProductCard";
import { SortBy } from "../../components/marketSettings/SortBy";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Chat from "../../components/Chat"


export default function Market() {
  const [sort, setSort] = useState("newest");
  const { data: sessionData } = useSession();
  useEffect(() => {
    if (sessionData?.user?.name !== null) {
      //  router.push('/home')
    }
  }, []);

  return (
    <>
    <div className="">
      <Navbar />
      <div className="md:flex">
        <div className="min-w-min border-r-2 border-neutral-200 shadow-lg shadow-neutral-200">
          <div className="flex w-full place-content-center md:w-64">
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
    <div className="fixed bottom-0 right-0 w-4/12 float-right"><Chat username={sessionData?.user?.name}/></div>
    </>
    
  );
}
