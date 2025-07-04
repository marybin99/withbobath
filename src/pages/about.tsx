import React from "react";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import Teachers from "../components/about/Teachers";
import Location from "../components/about/Location";
import { useScroll } from "../components/layout/Header";

const AboutPage: React.FC = () => {
  const isScrolled = useScroll();

  return (
    <Layout>
      <Head>
        <title>센터소개 | 더함발달연구센터</title>
      </Head>
      <div
        className={`bg-white min-h-screen mt-[82px] ${
          isScrolled ? "lg:mt-[108px]" : "lg:mt-[197px]"
        } transition-all duration-300`}
      >
        <div className="max-w-5xl px-4 py-12 mx-auto md:px-8">
          <Teachers />
          <Location />
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
