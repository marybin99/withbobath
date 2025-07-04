import React, { useEffect, useState, useCallback } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // 스크롤이 바닥에 도달했는지 확인 (여유 10px)
    const isBottom = scrollTop + windowHeight >= documentHeight - 10;
    setIsAtBottom(isBottom);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 상태 체크

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <Head>
        <title>더함발달연구센터</title>
        <meta name="description" content="우리 센터의 공식 홈페이지입니다." />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"/>
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main
          className={`flex-grow ${
            isAtBottom
              ? "md:pb-[calc(38px*2+200px)] lg:pb-[calc(38px*2+310px)]"
              : ""
          }`}
        >
          {children}
        </main>
        <Footer isAtBottom={isAtBottom} />
      </div>
    </>
  );
};

export default Layout;
