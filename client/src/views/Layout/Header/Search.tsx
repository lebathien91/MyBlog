import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import WrapperTippy from "../../../components/WrapperTippy";

const results = [
  {
    id: 1,
    title: "Tiêu đề 1",
    slug: "tieu-de-1",
  },
  {
    id: 2,
    title: "Tiêu đề 2",
    slug: "tieu-de-2",
  },
  {
    id: 3,
    title: "Tiêu đề 3",
    slug: "tieu-de-3",
  },
  {
    id: 4,
    title: "Tiêu đề 4",
    slug: "tieu-de-4",
  },
  {
    id: 5,
    title: "Tiêu đề 5",
    slug: "tieu-de-5",
  },
  {
    id: 6,
    title: "Tiêu đề 6",
    slug: "tieu-de-6",
  },
];

const Search = () => {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const handleOnclick = () => {
    setIsSearch(!isSearch);
  };
  return (
    <form action="#" className="relative">
      <Tippy
        interactive
        visible={visible && results.length > 0}
        onClickOutside={() => setVisible(false)}
        render={(attrs) =>
          visible &&
          results.length > 0 && (
            <WrapperTippy {...attrs}>
              <ul className="min-w-[350px]">
                {results.map((result) => (
                  <li key={result.slug}>
                    <Link href="/detail">
                      <a>{result.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </WrapperTippy>
          )
        }
      >
        <input
          type="text"
          placeholder="Tìm kiếm"
          className={`transition-all ease-linear duration-200 h-8 border-[#e6e6e6] focus:border-[#bdbdbd] outline-none rounded-full leading-8 ${
            isSearch
              ? "w-[200px] pl-4 pr-8"
              : "w-0 border-0 lg:border lg:w-[200px] pl-0 pr-0 lg:pl-4 md:pr-8 lg:inline-block"
          }`}
          onFocus={() => setVisible(true)}
        />
      </Tippy>
      <button
        className={`h-full absolute right-2 ${
          isSearch ? "" : "hidden"
        } lg:inline-block`}
      >
        <BsSearch size="1rem" />
      </button>
      <BsSearch
        size="1rem"
        onClick={handleOnclick}
        className="h-full absolute right-2 inline-block lg:hidden"
      />
    </form>
  );
};

export default Search;
