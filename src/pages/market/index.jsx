import Link from "next/link"
import ProductCard from "../../components/ProductCard"
import { signIn, signOut, useSession } from "next-auth/react";
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import Navbar from "../../components/Navbar";

export default function Market(){

    return (

    <div className="">
        <Navbar/>
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