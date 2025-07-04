import React from "react";
import Link from "next/link";
import Image from "next/image";

interface FooterProps {
  isAtBottom: boolean;
}

const Footer: React.FC<FooterProps> = ({ isAtBottom }) => {
  const navItems = [
    { label: "센터소개", href: "/about" },
    { label: "이용안내", href: "/guide" },
    { label: "치료정보실", href: "/therapy" },
    { label: "공지사항", href: "/notice" },
    { label: "질문답변게시판", href: "/qna" },
  ];

  return (
    <footer
      className={`text-white bg-black w-full ${
        isAtBottom ? "md:fixed md:bottom-0 md:left-0 md:right-0" : ""
      }`}
    >
      <div className="flex items-center h-full px-4 py-[38px] mx-auto">
        <div className="max-w-[1024px] mx-auto w-full">
          <div className="relative flex flex-col items-start justify-center gap-10 md:items-center md:flex-row md:gap-20 lg:gap-[101px]">
            {/* 센터 정보 */}
            <div className="space-y-5 md:space-y-10">
              <div className="space-y-3">
                <h2 className="text-4xl lg:text-[54px] font-nanum leading-[1.15]">
                  더함발달연구센터
                </h2>
                <p className="text-base leading-[1.36]">
                  아이의 눈높이에서 시작합니다.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-base leading-[1.36]">
                  부산 남구 분포로 113, 220동 101호
                </p>
                <p className="text-base leading-[1.36]">070-4255-3068</p>
                <p className="text-base leading-[1.36]">평일 09:00 - 18:00</p>
              </div>
            </div>

            {/* 구분선 */}
            <div className="w-[70%] h-px md:w-px md:h-[200px] lg:h-[310px] bg-[#BFBFBF]" />

            {/* 네비게이션 */}
            <nav>
              <ul className="space-y-3 lg:space-y-5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-base leading-[1.36] transition-colors hover:text-gray-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* 소셜 미디어 링크 */}
            <div className="flex gap-[11px] md:absolute md:right-0 md:bottom-0">
              <Link
                href="https://www.instagram.com/plus_developcenter/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[25px] h-[25px] bg-[#D9D9D9] rounded flex items-center justify-center"
              >
                <Image
                  src="/images/instagram-icon.svg"
                  alt="인스타그램"
                  width={17.5}
                  height={17.5}
                />
              </Link>
              <Link
                href="https://cafe.naver.com/withbobath"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[25px] h-[25px] bg-[#D9D9D9] rounded flex items-center justify-center"
              >
                <span className="text-black text-[8px] font-bold">cafe</span>
              </Link>
              <Link
                href="https://open.kakao.com/o/ssFjyIsh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[25px] h-[25px] bg-[#D9D9D9] rounded flex items-center justify-center"
              >
                <Image
                  src="/images/kakao-icon.svg"
                  alt="카카오톡"
                  width={17.5}
                  height={17.5}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
