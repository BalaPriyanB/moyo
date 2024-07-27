import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const navItemsInfo = [
  { name: "CATEGORY", type: "dropdown", items: [] }, // Add items for dropdown as needed
  { name: "GENRES", type: "link", href: "/genres" },
  { name: "LANGUAGE", type: "link", href: "/language" },
  { name: "DMCA", type: "link", href: "/dmca" },
];

const NavItem = ({ item }) => {
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdownHandler = () => {
    setDropdown((curState) => !curState);
  };

  return (
    <li className="relative group">
      {item.type === "link" ? (
        <Link to={item.href} className="px-4 py-2 text-white text-sm">
          {item.name}
        </Link>
      ) : (
        <div className="flex flex-col items-center">
          <button
            className="px-4 py-2 flex gap-x-1 items-center text-white text-sm"
            onClick={toggleDropdownHandler}
          >
            <span>{item.name}</span>
            <MdKeyboardArrowDown />
          </button>
          <div
            className={`${
              dropdown ? "block" : "hidden"
            } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
          >
            <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
              {item.items.map((page, index) => (
                <Link
                  key={index}
                  to={page.href}
                  className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                >
                  {page.title}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};

const Header = () => {
  const navigate = useNavigate();

  const [navIsVisible, setNavIsVisible] = useState(false);
  const userState = useSelector((state) => state.user);

  const navVisibilityHandler = () => {
    setNavIsVisible((curState) => !curState);
  };

  return (
    <section className="sticky top-0 left-0 right-0 z-50 bg-[#0D1017] text-white">
      <header className="container mx-auto px-5 py-4 flex flex-col items-center lg:items-center">
        <div className="w-full flex justify-between items-center mb-4 lg:mb-0">
          <div className="flex-1 lg:hidden"></div>
          <Link to="/" className="flex items-center justify-center flex-1">
            <h1 className="text-white text-2xl font-bold">IXDUB</h1>
          </Link>
          <div className="flex-1 flex justify-end items-center gap-4">
            <AiOutlineBell className="w-6 h-6 cursor-pointer text-white" />
            <AiOutlineSearch className="w-6 h-6 cursor-pointer text-white" />
            <div className="lg:hidden">
              {navIsVisible ? (
                <AiOutlineClose className="w-6 h-6 cursor-pointer text-white" onClick={navVisibilityHandler} />
              ) : (
                <AiOutlineMenu className="w-6 h-6 cursor-pointer text-white" onClick={navVisibilityHandler} />
              )}
            </div>
          </div>
        </div>
        <div
          className={`${
            navIsVisible ? "right-0" : "-right-full"
          } transition-all duration-300 lg:mt-0 bg-[#0D1017] lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-center lg:flex-row fixed top-0 bottom-0 lg:static gap-x-9 items-center`}
        >
          <ul className="text-white items-center gap-y-5 lg:text-white flex flex-col lg:flex-row gap-x-4 font-semibold">
            {navItemsInfo.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </ul>
        </div>
      </header>
      <hr className="w-full border-t border-gray-700 mt-4" />
    </section>
  );
};

export default Header;
