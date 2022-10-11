import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { categories } from "../../../utils/data/categories";

interface NavProps {
  isMobile: boolean;
  setIsMobile: Function;
}

const NavMenu = ({ isMobile, setIsMobile }: NavProps) => {
  const [sticky, setSticky] = useState(false);
  const navElement = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const navOffsetTop = navElement.current?.offsetTop || 0;

    const handleScroll = () => {
      let currentScrollPos = window.pageYOffset;

      if (currentScrollPos > navOffsetTop) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navElement}
      className={`bg-white border-b border-gray-200 fixed top-0 left-0 bottom-0 lg:sticky z-40 lg:z-0 lg:translate-x-[0] ease-linear duration-200 ${
        !isMobile && "translate-x-[-100%]"
      } ${sticky && "lg:z-40"}`}
    >
      <ul className="lg:flex lg:container w-[320px]">
        <li className="flex justify-between border-b lg:border-0 px-3 py-1 lg:p-0 items-center">
          <Link href="/">
            <a
              className={`mr-4 w-[50px] h-[50px] ${
                sticky ? "lg:block" : "lg:hidden"
              }`}
            >
              <img src="/favicon.webp" alt="logo" />
            </a>
          </Link>
          <MdClose
            size="1.75rem"
            className="lg:hidden cursor-pointer"
            onClick={() => setIsMobile(false)}
          />
        </li>
        {categories.map((category) => (
          <li
            key={category.id}
            className="mr-4 font-bold uppercase text-lg ml-4 lg:ml-0 py-3"
          >
            <a href={`/category/${category.slug}`}>{category.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
