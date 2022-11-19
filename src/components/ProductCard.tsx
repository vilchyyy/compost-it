import Image from "next/image"

export default function ProductCard({image, name, price, weight, seller, city}){
    return (
        <div className="flex bg-white rounded-lg border-2 m-2">
            <Image className="rounded-xl" width={150} height={150}  src={image}/>
            <div className="flex flex-col m-2 justify-center">
                <a className="font-bold text-xl py-1">{name}</a>  
                <a className="text-lg text-opacity-90 text-gray-600 ml-2">Cena: {price}</a>
                <a className="text-lg text-opacity-90 text-gray-600 ml-2">Miasto: {city}</a>
                <a className="text-lg text-opacity-90 text-gray-600 ml-2">Sprzedawca: {seller}</a>
            </div>
        </div>
    )
}