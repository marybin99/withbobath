import React from "react";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import { useScroll } from "@/components/layout/Header";

const GuidePage: React.FC = () => {
  const isScrolled = useScroll();

  return (
    <Layout>
      <Head>
        <title>이용안내 | 더함발달연구센터</title>
        <meta
          name="description"
          content="더함발달연구센터의 첫 방문 상담, 치료 프로그램, 이용 약속을 안내합니다."
        />
      </Head>
      <div
        className={`min-h-screen bg-white mt-[82px] ${
          isScrolled ? "lg:mt-[108px]" : "lg:mt-[197px]"
        } transition-all duration-300`}
      >
        <div className="max-w-5xl px-4 py-12 mx-auto md:px-8 md:py-16">
          <h2 className="pb-2 mb-10 text-2xl font-semibold border-b">이용안내</h2>

          <section aria-labelledby="first-visit" className="mb-14">
            <h3 id="first-visit" className="mb-5 text-xl font-semibold text-primary">
              첫 방문 안내
            </h3>
            <div className="p-6 leading-8 border border-[#D2E5CC] rounded-xl bg-[#F5F9F2] md:p-8">
              <p>
                상담 전화 또는 카카오톡 채팅으로 문의하신 뒤 방문해 주세요. 첫
                시간에는 치료사와 1:1 상담 및 아동 관찰을 통해 평가하고, 앞으로의
                치료 계획을 안내해 드립니다.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href="tel:070-4255-3068"
                  className="inline-flex items-center px-5 py-2 font-medium text-white rounded-lg bg-primary hover:bg-[#166500]"
                >
                  전화 상담하기
                </a>
                <a
                  href="https://open.kakao.com/o/ssFjyIsh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2 font-medium border rounded-lg border-primary text-primary hover:bg-white"
                >
                  카카오톡 채팅하기
                </a>
              </div>
            </div>
          </section>

          <section aria-labelledby="program" className="mb-14">
            <h3 id="program" className="mb-2 text-xl font-semibold text-primary">
              치료 프로그램
            </h3>
            <p className="mb-6 text-gray-600">기본 주 2회 이상 치료 기준</p>
            <div className="grid gap-4 mb-7 sm:grid-cols-2">
              <div className="p-6 border border-gray-200 rounded-xl">
                <p className="mb-2 font-semibold text-gray-600">Type A</p>
                <p className="text-3xl font-semibold text-primary">60분</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-xl">
                <p className="mb-2 font-semibold text-gray-600">Type B</p>
                <p className="text-3xl font-semibold text-primary">40분</p>
              </div>
            </div>
            <h4 className="mb-3 font-semibold">치료 대상</h4>
            <ul className="pl-5 space-y-2 leading-7 list-disc list-outside text-gray-700">
              <li>미숙아로 태어난 영유아, 뇌손상 진단을 받은 영유아, 단순 발달 지연 영유아</li>
              <li>뇌병변, 사경, 발달 지연이 있거나 또래보다 발달이 더딘 미숙아 등 움직임에 어려움을 겪는 아동</li>
            </ul>
            <p className="p-5 mt-6 leading-7 rounded-xl bg-[#F5F9F2] text-gray-700">
              상담을 통해 아동 각자에게 맞는 치료 프로그램을 결정합니다. 자세한
              내용은 먼저 문의하신 뒤 방문해 주세요.
            </p>
          </section>

          <section aria-labelledby="agreements">
            <h3 id="agreements" className="mb-5 text-xl font-semibold text-primary">
              더함 이용 시 지켜야 할 약속
            </h3>
            <div className="space-y-6 leading-7 text-gray-700">
              <div>
                <h4 className="mb-2 font-semibold text-black">치료 시간과 결석</h4>
                <ul className="pl-5 space-y-2 list-disc list-outside">
                  <li>약속된 치료 시간을 꼭 지켜주세요.</li>
                  <li>불가피하게 시간 변경이 필요한 경우 담당 치료사와 의논해 주세요.</li>
                  <li>결석할 경우 하루 전날 오후 6시까지 담당 선생님에게 연락해 주세요.</li>
                  <li>사전 연락이 없거나 당일 통보한 결석은 보강이 불가합니다. 센터 운영을 위한 결정이니 양해 부탁드립니다.</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-black">보강</h4>
                <p>
                  미리 결석을 알려주시면 보강을 실시합니다. 보강은 해당 월 이내에
                  진행하며, 이후에는 어려우니 아동의 스케줄을 미리 조정해 주세요.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-black">공간 이용</h4>
                <ul className="pl-5 space-y-2 list-disc list-outside">
                  <li>치료 후 사용한 장난감과 커피잔은 정리해 주세요.</li>
                  <li>사용한 기저귀는 챙겨서 가져가 주세요.</li>
                </ul>
              </div>
            </div>
          </section>

          <p className="py-10 text-3xl leading-relaxed text-center text-primary font-hana break-keep md:py-12 md:text-6xl">
            더디 가도 함께 가는 더함이 되겠습니다.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default GuidePage;
