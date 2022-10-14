import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import { MdNotifications, MdOutlineSearch } from "react-icons/md";
import Main from "./Main";

import Account from "./Header/Account";

export default function Admin({ children }: { children: ReactNode }) {
  const [activeSidebar, setActiveSidebar] = useState(true);

  return (
    <>
      <Sidebar active={activeSidebar} setActive={setActiveSidebar} />
      <section
        className={`z-10 bg-[#e4e9f7] relative top-0 min-h-screen transition-all ease-linear duration-300 ${
          activeSidebar
            ? "left-[250px] w-[calc(100%_-_250px)]"
            : "left-[78px] w-[calc(100%_-_78px)]"
        }`}
      >
        <header className="flex justify-between px-8 py-2 z-30">
          <h2>Dashboard</h2>

          <div className="flex">
            <form className="hidden md:flex flex-wrap relative w-full items-stretch">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search..."
                className="relative text-[#495057] py-[0.4375rem] h-[36px] bg-transparent outline-none border-b border-[#d2d2d2] focus:border-b-2 focus:border-[#9c27b0]"
              />
              <button className="text-[#999] bg-white h-[41px] w-[41px] leading-[41px] overflow-hidden rounded-full flex justify-center items-center">
                <MdOutlineSearch size="1.75rem" />
              </button>
            </form>
            <ul className="flex items-center">
              <li>
                <a
                  className="block relative px-[15px] py-[10px] leading-[20px]"
                  href="#"
                >
                  <MdNotifications size="25px" />

                  <span className="bg-[#f44336] absolute top-0 right-[10px] text-[10px] px-[5px] leading-4 text-white border border-white rounded-full">
                    5
                  </span>
                </a>
              </li>
              <li className="pb-1">
                <Account />
              </li>
            </ul>
          </div>
        </header>

        <Main className="px-4 py-8">{children}</Main>
      </section>
    </>
  );
}
