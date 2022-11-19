import ProductCard from "../../components/ProductCard"

export default function Market(){
    return (
    <div className="">
        <div className="h-16 bg-yellow-400 flex justify-between">
            <a className="text-xl font-bold p-4 ">Marketplace</a>
            <div className="flex items-center">
                <input className="w-64" placeholder="Search"/>
                <button className="p-4">Sign in</button>
            </div>
        </div>
        <div className="ml-64 p-6 flex flex-col">
            <ProductCard image="/coompost.png" name="Cooompost" price="12.00zl" seller="Radzisklep" city="J-Bie" weight="5kg" />
            <ProductCard image="/coompost.png" name="Kompost" price="12.00zl" seller="Radzisklep" city="J-Bie" weight="5kg" />
            <ProductCard image="/coompost.png" name="aaa" price="12.00zl" seller="Radzisklep" city="J-Bie" weight="5kg" />
            <ProductCard image="/coompost.png" name="aaa" price="12.00zl" seller="Radzisklep" city="J-Bie" weight="5kg" />
            <ProductCard image="/coompost.png" name="aaa" price="12.00zl" seller="Radzisklep" city="J-Bie" weight="5kg" />
            
        </div>
    </div>
    )
}