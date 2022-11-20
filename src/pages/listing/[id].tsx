import { useRouter } from "next/router";
import { array, z, ZodString } from "zod";
import Navbar from "../../components/Navbar";
import { trpc } from "../../utils/trpc";

export default function Index() {
  const router = useRouter();
  const { id } = router.query;
  const { data: listingData } = trpc.listing.getOneById.useQuery({
    id: String(id),
  });
  console.log(listingData);

  return (
    <div>
      <Navbar />
      {listingData && (
        <div className="flex max-w-full justify-evenly p-12">
          <img
            className="mr-4 max-h-96 w-8/12 object-cover"
            src="/coompost.jpg"
          ></img>
          <div className="w-4/12 rounded-lg border-2 border-gray-400 p-4">
            <h2 className="text-4xl">{listingData?.name}</h2>
            <p className="text-xl text-gray-700">{listingData?.description}</p>
            <p className="text-5xl">{Number(listingData?.price)}zł</p>

            <p>Sprzedawca:</p>
            <div className="w-fit rounded border-2 border-gray-600 p-2">
              <p>{listingData?.owner.name}</p>
              <p>{listingData?.owner.phoneNumber}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
