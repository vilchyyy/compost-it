import { useRouter } from "next/router";
import { array, z, ZodString } from "zod";
import Navbar from "../../components/Navbar";
import { trpc } from "../../utils/trpc";

export default function Index(){

    const router = useRouter()
    const { id } = router.query

    if (id) {
        const { data: listingData } = trpc.listing.getOneById.useQuery({ id: id }) 
    }

    


    return (
        
    <div>
        <Navbar/>
        <div className="ml-64 p-6 flex flex-col">
            {

            }
        </div>
    </div>
    )
}