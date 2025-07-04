import React from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Features from "@/components/home/Features";
import Message from "@/components/home/Message";

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-white to-[#E4EDDC]">
        <Hero />
        <About />
        <Features />
        <Message />
      </div>
    </Layout>
  );
};

export default Home;
