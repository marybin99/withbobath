import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useScroll } from "../layout/Header";

const Hero: React.FC = () => {
  const isScrolled = useScroll();

  return (
    <section
      className={`relative min-h-[300px] lg:h-[410px] bg-[rgba(28,127,0,0.2)] mt-[82px] transition-all duration-300 ${
        isScrolled ? "lg:mt-[108px]" : "lg:mt-[197px]"
      }`}
    >
      <div className="container px-4 mx-auto h-full">
        <div className="flex flex-col lg:flex-row items-center justify-center h-full py-8 lg:py-[80px] gap-8 lg:gap-[71px]">
          <div className="w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] relative">
            <Image
              src="/images/hero-image.jpg"
              alt="더함발달연구센터 대표 이미지"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-4 text-center lg:gap-5 lg:text-left">
            <h2 className="text-3xl lg:text-[60px] font-hana tracking-[0.05em] leading-[1.2em] lg:leading-[1em] whitespace-pre-line">
              <span className="text-[#1C7F00]">더함발달연구센터</span>
              {"는\n아이의 눈높이에서\n시작합니다"}
            </h2>
            <Link
              href="/contact"
              className="w-full lg:w-[161px] h-[45px] lg:h-[50px] bg-[#E4EDDC] rounded-lg flex items-center justify-center mx-auto lg:mx-0"
            >
              <span className="text-xl lg:text-[28px] font-hana">
                상담 문의하기
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
