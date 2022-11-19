import Image from "next/image"

export default function ProductCard({image, name, price, weight, seller, city}){
    return (
        <div className=" bg-white rounded-lg">
            <Image className="rounded-xl" width={150} height={150}  src={image}/>
            <div className="flex flex-col p-2">
                <h2 className="font-bold">{name} - {price}</h2>
                
                <h2 className="text-sm text-opacity-90 text-gray-600 ml-1">Waga: {weight}</h2>
                <h2 className="text-sm text-opacity-90 text-gray-600 ml-1">Miasto: {city}</h2>
                <h2 className="text-sm text-opacity-90 text-gray-600 ml-1">Sprzedawca: {seller}</h2>
            </div>
        </div>
    )
}