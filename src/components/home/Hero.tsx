import React, { useRef } from "react";
import Image from "next/image";
import { useScroll } from "../layout/Header";

const Hero: React.FC = () => {
  const isScrolled = useScroll();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeDialog = () => dialogRef.current?.close();

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
            <button
              ref={triggerRef}
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              className="flex items-center justify-center w-full min-h-[45px] px-5 mx-auto rounded-lg bg-[#E4EDDC] transition-colors hover:bg-[#D2E5CC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:mx-0 lg:min-h-[50px] lg:w-auto"
            >
              <span className="text-xl lg:text-[28px] font-hana">
                상담 문의하기
              </span>
            </button>
          </div>
        </div>
      </div>
      <dialog
        ref={dialogRef}
        aria-labelledby="consultation-dialog-title"
        aria-describedby="consultation-dialog-description"
        onClose={() => triggerRef.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
        className="w-[calc(100%-2rem)] max-w-md p-0 mx-auto my-auto rounded-2xl border border-[#D2E5CC] bg-white shadow-2xl backdrop:bg-black/50"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="consultation-dialog-title" className="text-2xl font-semibold text-gray-900">
                상담 방법 선택
              </h2>
              <p id="consultation-dialog-description" className="mt-2 text-sm leading-6 text-gray-600">
                편한 방법으로 상담을 문의해 주세요.
              </p>
            </div>
            <button
              type="button"
              onClick={closeDialog}
              aria-label="상담 방법 선택 닫기"
              className="flex items-center justify-center w-9 h-9 text-gray-500 rounded-lg shrink-0 hover:bg-[#F5F9F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>
          <div className="grid gap-3 mt-6">
            <a
              href="tel:070-4255-3068"
              onClick={closeDialog}
              className="flex items-center gap-4 p-4 rounded-xl border border-[#D2E5CC] bg-[#F5F9F2] transition-colors hover:bg-[#E4EDDC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#E4EDDC] text-primary shrink-0">
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.7L7.2 10a16 16 0 0 0 6.8 6.8l1.6-1.8a2 2 0 0 1 1.7-.6l3 .5a2 2 0 0 1 1.7 2Z" />
                </svg>
              </span>
              <span>
                <span className="block font-semibold text-gray-900">전화 상담</span>
                <span className="block mt-1 text-sm text-gray-600">070-4255-3068</span>
              </span>
            </a>
            <a
              href="https://open.kakao.com/o/ssFjyIsh"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeDialog}
              className="flex items-center gap-4 p-4 rounded-xl border border-[#D2E5CC] bg-[#F5F9F2] transition-colors hover:bg-[#E4EDDC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#FEE500] shrink-0">
                <Image src="/images/kakao-icon.svg" alt="" width={22} height={22} />
              </span>
              <span>
                <span className="block font-semibold text-gray-900">카카오톡 상담</span>
                <span className="block mt-1 text-sm text-gray-600">채팅으로 문의하기</span>
              </span>
            </a>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default Hero;
