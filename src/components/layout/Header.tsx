import React, { useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// 스크롤 상태를 공유하기 위한 Context 생성
export const ScrollContext = createContext<boolean>(false);

// Context를 사용하기 위한 커스텀 훅
export const useScroll = () => useContext(ScrollContext);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "센터소개", href: "/about" },
    { label: "이용안내", href: "/guide" },
    { label: "치료정보실", href: "/therapy" },
    { label: "공지사항", href: "/notice" },
    { label: "질문답변게시판", href: "/qna" },
  ];

  return (
    <ScrollContext.Provider value={isScrolled}>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300 ${
          isScrolled ? "lg:py-4" : "lg:py-[33px]"
        }`}
      >
        <div className="container px-4 mx-auto">
          <div
            className={`flex justify-start lg:justify-center items-center py-5 transition-all duration-300 lg:pt-0 ${
              isScrolled ? "lg:pb-2" : "lg:pb-[33px]"
            }`}
          >
            <Link href="/" className="flex gap-3 items-center lg:gap-5">
              <Image
                src="/images/logo.png"
                alt="더함발달연구센터 로고"
                width={121}
                height={70}
                className={`w-auto h-10 md:h-14 object-contain transition-all duration-300 ${
                  isScrolled ? "lg:h-10" : "lg:w-[121px] lg:h-[70px]"
                }`}
              />
              <h1
                className={`text-[28px] md:text-4xl text-[#1C7F00] font-hana transition-all duration-300 ${
                  isScrolled ? "lg:text-4xl" : "lg:text-[64px]"
                }`}
              >
                더함발달연구센터
              </h1>
            </Link>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="absolute right-4 top-6 p-2 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-gray-600"></div>
          </button>

          {/* 네비게이션 메뉴 */}
          <nav
            className={`
            lg:flex lg:items-center lg:justify-center transition-all duration-300
            ${isMenuOpen ? "block" : "hidden"}
            pb-4 lg:pb-0
          `}
          >
            <ul className="flex flex-col lg:flex-row gap-4 lg:gap-[53px]">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block hover:text-[#1C7F00] transition-all duration-300 py-1 lg:py-0 text-[16px] md:text-lg ${
                      isScrolled ? "lg:text-[16px]" : "lg:text-[20px]"
                    }`}
                    onClick={(e) => {
                      setIsMenuOpen(false);
                      if (router.pathname === item.href) {
                        e.preventDefault();
                        router.replace(item.href);
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </ScrollContext.Provider>
  );
};

export default Header;
