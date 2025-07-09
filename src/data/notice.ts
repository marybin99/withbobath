export interface NoticeData {
  id: number;
  title: string;
  date: string;
  author: string;
  content: string;
}

export const notices: NoticeData[] = [
  {
    id: 1,
    title:
      "[안내] 더함발달연구센터는 보건복지부 발달재활서비스 제공기관입니다.",
    date: "2024-08-10",
    author: "관리자",
    content: `
      <div style="font-size:24px;font-weight:bold;">안내드립니다!!</div>
      더함발달연구센터는 보건복지부지정 발달재활서비스 제공기관입니다.

      발달재활서비스는
      보건복지부에서 소관하는 중앙부처 정책지원금 서비스로
      만 18세 미만의​​ <span style="color:green;">뇌병변, 지적, 자폐성, 청각, 언어, 시각장애 아동 및 </span>
      만 6세 미만의 <span style="color:green;">발달재활 의뢰서를 받은 발달지연 영유아가 <span style="color:red">지원대상자</span>입니다.</span>

      발달재활 서비스는 언어, 청능, 미술, 음악, 행동, 놀이, 심리, 감각, 운동등의 서비스 영역이 있으며,
      더함발달연구센터에서는 <span style="font-weight:bold;">"운동발달재활"</span> 영역을 제공하고 있습니다.

      발달재활서비스 지원금은 월 250,000원이며, 

      본 기관의 서비스 비용은 회기당 45,000원으로 5.5회 사용 가능합니다.     

      발달재활서비스(정부지원금 및 본인부담금)가격: 
      대상자의 소득기준에 따라 바우처 지원액 및 본인부담금 차등 지원
      
      <table style="width: 100%; border-collapse: collapse; text-align: center; border: 1px solid #ccc;">
        <thead>
          <tr style="background-color: #f5f5f5;">
          <th style="border: 1px solid #ccc; padding: 8px;">소득수준</th>
          <th style="border: 1px solid #ccc; padding: 8px;">바우처지원액</th>
          <th style="border: 1px solid #ccc; padding: 8px;">본인부담금</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">기초생활수급자(다형)</td>
            <td style="border: 1px solid #ccc; padding: 8px;">월 25만원</td>
            <td style="border: 1px solid #ccc; padding: 8px;">면제</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">차상위계층(가형)</td>
            <td style="border: 1px solid #ccc; padding: 8px;">월 23만원</td>
            <td style="border: 1px solid #ccc; padding: 8px;">2만원</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">차상위계층초과 ~ 기준중위소득 65% 이하 (나형)</td>
            <td style="border: 1px solid #ccc; padding: 8px;">월 21만원</td>
            <td style="border: 1px solid #ccc; padding: 8px;">4만원</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">기준중위소득 65% 초과 ~ 120%이하(라형)</td>
            <td style="border: 1px solid #ccc; padding: 8px;">월 19만원</td>
            <td style="border: 1px solid #ccc; padding: 8px;">6만원</td>
          </tr>
          <tr>
          <td style="border: 1px solid #ccc; padding: 8px;">기준중위소득 120% 초과 ~ 180%이하(마형)</td>
          <td style="border: 1px solid #ccc; padding: 8px;">월 17만원</td>
          <td style="border: 1px solid #ccc; padding: 8px;">8만원</td>
          </tr>
        </tbody>
      </table>

      본인부담금 납부방법: 서비스 대상자가 제공기관에 직접 사전 납부, 계좌입금을 원칙으로 함

      <p style="font-size:28px;font-weight:bold;text-align:center;">전화로 상담예약 후 방문하시면 친절하게 안내해 드리겠습니다.</p>
    `,
  },
  {
    id: 2,
    title: "2024년 7월 휴관 안내",
    date: "2024-07-01",
    author: "관리자",
    content:
      '<span style="color:red">7월 휴관일은 7/15(월)입니다.</span> <br/> <img src="/images/hero-image.jpg" alt="휴관 안내" style="max-width:200px; margin-top:10px;" /> <br/>이용에 참고 바랍니다.',
  },
  {
    id: 3,
    title: "여름방학 프로그램 모집",
    date: "2024-06-20",
    author: "관리자",
    content:
      '<span style="color:blue">여름방학 특강 프로그램을 모집합니다.</span><br/>자세한 내용은 센터로 문의 주세요.',
  },
  {
    id: 4,
    title: "센터 방역 안내",
    date: "2024-06-10",
    author: "관리자",
    content:
      '정기 방역을 실시하였습니다.<br/><span style="color:green">안심하고 방문하세요.</span>',
  },
];
