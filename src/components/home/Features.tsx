import React from "react";
import Image from "next/image";

const features = [
  {
    icon: "/images/therapist-icon.png",
    title: "전문 치료사",
    description:
      "풍부한 임상경험을 갖춘 전문적이고 체계적인 재활지도사들이 운영합니다.",
  },
  {
    icon: "/images/child-icon.png",
    title: "아이의 눈높이",
    description: "모든 평가와 중재는 아이들의 눈높이에서 시작합니다.",
  },
  {
    icon: "/images/custom-icon.png",
    title: "맞춤 중재",
    description: "집중치료, Type1, Type2 등 아동 맞춤형 1:1 개별 수업",
  },
  {
    icon: "/images/voucher-icon.png",
    title: "바우처 지원",
    description: "보건복지부 발달재활서비스 바우처 지원 가능",
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-8 lg:py-5">
      <div className="container px-4 mx-auto">
        <div className="max-w-[640px] mx-auto">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="w-full md:w-[145px] h-[200px] md:h-[235px] bg-[#D2E5CC] border-2 border-[#7CA172] rounded-lg p-4 lg:pt-5 lg:px-[10px] overflow-hidden"
              >
                <div className="flex flex-col items-center gap-3 md:gap-5">
                  <div className="w-[40px] h-[40px] md:w-[45px] md:h-[45px] relative">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl md:text-[24px] font-nanum text-center">
                    {feature.title}
                  </h3>
                  <p className="text-xs md:text-[14px] text-center break-keep">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
