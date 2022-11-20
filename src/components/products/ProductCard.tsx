import { Decimal } from "@prisma/client/runtime";
import Image from "next/image";
import Link from "next/link";
interface productProps {
  image: string;
  name: string;
  price: string;
  weight: string;
  seller: string;
  city: string;
  id: string;
}
export function ProductCard({
  image,
  name,
  price,
  weight,
  seller,
  city,
  id,
}: productProps) {
  return (
    <div className=" m-2  flex w-64 flex-col items-center rounded-lg border-2 bg-neutral-100 shadow-md">
      <Image
        className="rounded-xl object-contain transition-transform duration-300 ease-in-out hover:scale-105"
        width={200}
        height={200}
        src={image}
        alt="product image"
      />
      <div className="flex h-full w-full flex-col justify-between p-2.5">
        <div>
          <h3 className="w-full text-xl font-semibold tracking-tight text-gray-900">
            {name}
          </h3>
          <p className="w-full text-base font-semibold tracking-tight text-gray-600">
            {city}
          </p>
          <p className="w-full text-sm font-semibold tracking-tight text-gray-600">
            {seller}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">{price} zł</span>
          <Link
            href={`/listing/${id}`}
            className="rounded-lg bg-blue-700 px-5 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sprawdź
          </Link>
        </div>
      </div>
    </div>
  );
}
