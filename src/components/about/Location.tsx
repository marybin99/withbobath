import KakaoMap from "./Map";

const Location = () => {
  return (
    <section>
      <h2 className="pb-2 mb-4 text-2xl font-semibold border-b">오시는 길</h2>
      <p className="mb-4">부산 남구 분포로 113 LG메트로 4차 220동 101호</p>
      <KakaoMap />
    </section>
  );
};

export default Location;
