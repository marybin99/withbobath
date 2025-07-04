"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    document.head.appendChild(script);

    script.addEventListener("load", () => {
      window.kakao.maps.load(() => {
        const coords = new window.kakao.maps.LatLng(35.128795, 129.108665);
        const container = document.getElementById("map");

        const options = {
          center: coords,
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        map.setCenter(coords);

        const content =
          '<div class="customoverlay">' +
          '  <a href="https://map.naver.com/p/entry/place/1623630851?c=15.00,0,0,0,dh&placePath=/home?from=map&from=map&fromPanelNum=1&additionalHeight=76&timestamp=202506271710&locale=ko&svcName=map_pcv5&fromPanelNum=1&additionalHeight=76&timestamp=202506271710&locale=ko&svcName=map_pcv5" target="_blank">' +
          '    <span class="title">' +
          '      <img src="/images/logo.png" width="40px">더함발달연구센터' +
          '    </span>' +
          "  </a>" +
          "</div>";

        // 커스텀 오버레이가 표시될 위치입니다
        const position = new window.kakao.maps.LatLng(35.128795, 129.108665);

        // 커스텀 오버레이를 생성합니다
        const customOverlay = new window.kakao.maps.CustomOverlay({
          map: map,
          position: position,
          content: content,
          yAnchor: 1,
        });
      });
    });
  }, []);

  return (
    <div>
      <div id="map" className="w-full h-64 rounded-lg border shadow-md md:h-96" />
    </div>
  );
};

export default KakaoMap;