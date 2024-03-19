"use client";
import { FaRegUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { LiaTvSolid } from "react-icons/lia";
import { MdOutlineLocalMovies } from "react-icons/md";
import { HiOutlineBars2 } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

import Link from "next/link";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navData = [
    {
      title: "My Space",
      path: "/myspace",
      icon: <FaRegUserCircle />,
    },
    {
      title: "Home",
      path: "/",
      icon: <IoHomeOutline />,
    },
    {
      title: "Movies",
      path: "/movies",
      icon: <MdOutlineLocalMovies />,
    },
    {
      title: "Tv",
      path: "/tv",
      icon: <LiaTvSolid />,
    },
    {
      title: "Search",
      path: "/search",
      icon: <CiSearch />,
    },
  ];

  return (
    <div className="fixed top-0 w-full z-20">
      <div className="text-[#fff] text-3xl   md:hidden absolute right-10 top-5 cursor-pointer">
        {isOpen ? (
          <IoMdClose onClick={toggleMenu} />
        ) : (
          <HiOutlineBars2 onClick={toggleMenu} />
        )}
      </div>
      <div className="bg-black flex items-center justify-between px-5 md:px-6">
        <div className="p-5">
          <Link href="/">
            <h1 className="text-2xl font-bold">MegaTech.</h1>
          </Link>
        </div>
        <div
          className={`nav-section text-white bg-[#000] text-lg z-10  absolute top-[70px] w-full  flex flex-col items-center   justify-center py-10 gap-10  md:bg-opacity-0 md:py-0 md:static
            md:flex-row md:justify-end    md:gap-0 md:items-center ${
              isOpen ? "left-0" : "left-[-100%]"
            } `}
        >
          {navData.map((item) => {
            return (
              <div
                className="flex items-center mr-5 xl:mr-10"
                onClick={closeMenu}
              >
                <div className="pr-3  text-[25px] md:text-[20px] lg:text-[30px] xl:text-[32px] 2xl:text-[30px]  ">
                  {item.icon}
                </div>
                <div className=" text-[25px] md:text-[18px] lg:text-[20px] xl:text-[25px]  font-bold title-name">
                  <Link href={item.path} key={item.title}>
                    {item.title}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
