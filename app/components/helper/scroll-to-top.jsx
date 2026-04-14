"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowUp, FaBriefcase, FaCode, FaGraduationCap, FaLaptopCode, FaUser } from "react-icons/fa6";

const DEFAULT_BTN_BASE_CLS =
  "fixed bottom-24 md:bottom-8 right-6 z-50 flex items-center rounded-full bg-gradient-to-r from-pink-500 to-violet-600 p-4 hover:text-xl transition-all duration-500 ease-out transform";

const SCROLL_THRESHOLD = 50;

const ScrollToTop = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onClickBtn = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const btnClasses = `${DEFAULT_BTN_BASE_CLS} ${
    isScrolled
      ? "opacity-100 scale-100 pointer-events-auto"
      : "opacity-0 scale-90 pointer-events-none"
  }`;

  return (
    <>
      {/* Scroll to Top button */}
      <button className={btnClasses} onClick={onClickBtn}>
        <FaArrowUp />
      </button>

      {/* Bottom Navigation Bar (shown only on small screens) */}
      <div className="fixed bottom-4 left-1/2 z-50 h-16 w-[95%] max-w-lg -translate-x-1/2 rounded-full border border-[#1b2c68a0] bg-[#0d1224]/80 backdrop-blur-md md:hidden">
        <div className="mx-auto grid h-full grid-cols-5">
          {/* About */}
          <Link
            href="/#about"
            className="group inline-flex flex-col items-center justify-center px-2 hover:text-[#16f2b3]"
          >
            <FaUser className="mb-1 text-xl text-gray-400 group-hover:text-[#16f2b3]" />
            <span className="text-[10px] text-gray-400 group-hover:text-[#16f2b3]">About</span>
          </Link>

          {/* Experience */}
          <Link
            href="/#experience"
            className="group inline-flex flex-col items-center justify-center px-2 hover:text-[#16f2b3]"
          >
            <FaBriefcase className="mb-1 text-xl text-gray-400 group-hover:text-[#16f2b3]" />
            <span className="text-[10px] text-gray-400 group-hover:text-[#16f2b3]">Exp.</span>
          </Link>

          {/* Skills */}
          <Link
            href="/#skills"
            className="group inline-flex flex-col items-center justify-center px-2 hover:text-[#16f2b3]"
          >
            <FaCode className="mb-1 text-xl text-gray-400 group-hover:text-[#16f2b3]" />
            <span className="text-[10px] text-gray-400 group-hover:text-[#16f2b3]">Skills</span>
          </Link>

          {/* Education */}
          <Link
            href="/#education"
            className="group inline-flex flex-col items-center justify-center px-2 hover:text-[#16f2b3]"
          >
            <FaGraduationCap className="mb-1 text-xl text-gray-400 group-hover:text-[#16f2b3]" />
            <span className="text-[10px] text-gray-400 group-hover:text-[#16f2b3]">Edu.</span>
          </Link>

          {/* Projects */}
          <Link
            href="/#projects"
            className="group inline-flex flex-col items-center justify-center px-2 hover:text-[#16f2b3]"
          >
            <FaLaptopCode className="mb-1 text-xl text-gray-400 group-hover:text-[#16f2b3]" />
            <span className="text-[10px] text-gray-400 group-hover:text-[#16f2b3]">Work</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ScrollToTop;
