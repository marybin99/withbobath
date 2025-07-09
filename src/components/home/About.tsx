import React from "react";
import Image from "next/image";

const About: React.FC = () => {
  return (
    <section className="pt-12 pb-5 lg:pt-20 lg:pb-5">
      <div className="container px-4 mx-auto">
        <div className="max-w-[640px] mx-auto space-y-8 lg:space-y-10">
          <div className="space-y-5 lg:space-y-7">
            <h2 className="text-2xl lg:text-[36px] font-hana text-center lg:text-left">
              더함발달연구센터는...
            </h2>
            <div className="flex flex-col gap-4 items-center lg:flex-row lg:items-start lg:gap-6">
              <div className="w-[25px] h-[25px] lg:w-[30px] lg:h-[30px] relative flex-shrink-0">
                <Image
                  src="/images/brain-icon.svg"
                  alt="뇌 아이콘"
                  width={30}
                  height={30}
                />
              </div>
              <p className="text-sm lg:text-base leading-[1.5] lg:leading-[1.36] whitespace-pre-line text-center lg:text-left">
                {
                  "뇌병변 장애 및 신경학적 손상을 가진 영유아, 아동 및 청소년들이\n발달기에 나타날 수 있는 신체, 정서, 인지, 행동, 사회적 대인관계 등의 문제 양상들을\n'정상운동발달'에 근거하여 접근합니다."
                }
              </p>
            </div>
            <div className="flex flex-col gap-4 items-center lg:flex-row lg:items-start lg:gap-6">
              <div className="w-[25px] h-[25px] lg:w-[30px] lg:h-[30px] relative flex-shrink-0">
                <Image
                  src="/images/person-icon.svg"
                  alt="사람 아이콘"
                  width={30}
                  height={30}
                />
              </div>
              <div className="flex-1">
                <div className="relative">
                  <div className="hidden lg:block absolute left-11 top-8 w-[270px] h-[11px] bg-[#ff3c3c4d]" />
                  <p className="text-sm lg:text-base leading-[1.5] lg:leading-[1.36] whitespace-pre-line relative z-10 text-center lg:text-left">
                    {
                      "적절한 시기에 치료 • 교육적 도움을 제공하여 아동에게 균형 있는 발달을 돕고자\n설립한 '아동 발달치료교육 및 부모상담 전문 센터' 입니다."
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
