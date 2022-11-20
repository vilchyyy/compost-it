import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react";
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import React from "react";


export default function Navbar() {
    const { data: sessionData } = useSession();
    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
      }
    return (

     <div  className="h-16 bg-green-800 flex justify-between">
            <a className="text-xl font-bold p-4 ">Marketplace</a>
            <div className="flex items-center">
                <input className="w-64  bg-green-300 rounded-md m-2 p-2" placeholder="Search"/>
                <Menu as="div" className="relative inline-block text-left">
      <div>
        {sessionData ? <Menu.Button className="inline-flex w-full justify-center  rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          Options
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>: <Link href={'/api/auth/signin'}>Sign In</Link>}
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Ustawienia Konta
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Dodaj Ogłoszenie
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Edytuj Ogłoszenia
                </Link>
              )}
            </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => signOut()}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    Wyloguj
                  </button>
                )}
              </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
            
            </div>
            
        </div>

    )
}