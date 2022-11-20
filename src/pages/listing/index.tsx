import {ProductCard} from "../../components/products/ProductCard"
import Navbar from "../../components/Navbar";
import { trpc } from "../../utils/trpc";

export default function Index(){
    const { data: listingsData } = trpc.listing.getSelfListings.useQuery();
    return (
        
    <div>
        <Navbar/>
        <div className="ml-64 p-6 flex flex-col">
            {
                listingsData?.map((listing: any) => (
                    <ProductCard key={listing.id} id={listing.id} image={'/coompost.jpg'} price={listing.price} weight={listing.weight} city={listing.name} seller={listing.userId} name={listing.name} />
                ))
            }
        </div>
    </div>
    )
}