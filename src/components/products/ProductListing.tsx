import Image from "next/image";
interface productProps {
  image: string;
  name: string;
  price: string;
  weight: string;
  seller: string;
  city: string;
}
export function ProductListing({
  image,
  name,
  price,
  weight,
  seller,
  city,
}: productProps) {
  return (
    <div className="m-2 flex rounded-lg border-2 bg-white">
      <Image
        className="rounded-xl object-contain "
        width={200}
        height={200}
        src={image}
        alt="product image"
      />
      <div className="m-2 flex flex-col justify-center">
        <a className="py-1 text-xl font-bold">{name}</a>
        <a className="ml-2 text-lg text-gray-600 text-opacity-90">
          Cena: {price}
        </a>
        <a className="ml-2 text-lg text-gray-600 text-opacity-90">
          Miasto: {city}
        </a>
        <a className="ml-2 text-lg text-gray-600 text-opacity-90">
          Sprzedawca: {seller}
        </a>
      </div>
    </div>
  );
}
