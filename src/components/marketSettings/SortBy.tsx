import { Dispatch, SetStateAction, useRef } from "react";

interface sortByProps {
  setSort: Dispatch<SetStateAction<string>>;
}

export const SortBy = ({ setSort }: sortByProps) => {
  const ref = useRef<any>();
  return (
    <>
      <div className="relative my-10 w-40 rounded border border-gray-300 py-1 px-4 md:mt-20">
        <input
          type="checkbox"
          id="sortbox"
          ref={ref}
          className="absolute hidden"
        />
        <label
          htmlFor="sortbox"
          className="flex cursor-pointer items-center justify-between space-x-1"
        >
          <span className="text-lg">Sortuj po</span>
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </label>

        <div
          id="sortboxmenu"
          className=" absolute right-0 top-full z-10 mt-1 w-40 min-w-max rounded-md border border-gray-300 bg-gray-100 opacity-0 shadow transition delay-75 ease-in-out"
        >
          <ul className="block text-right text-gray-900">
            <li>
              <p
                onClick={() => {
                  if(ref){ref.current.checked = false}
                  setSort("newest");
                }}
                className="block cursor-pointer px-3 py-2 hover:bg-gray-200"
              >
                Najnowsze
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  ref.current.checked = false;
                  setSort("priceTop");
                }}
                className="block cursor-pointer px-3 py-2 hover:bg-gray-200"
              >
                Cena: Rosnąco
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  ref.current.checked = false;
                  setSort("priceBot");
                }}
                className="block cursor-pointer px-3 py-2 hover:bg-gray-200"
              >
                Cena: Malejąco
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
