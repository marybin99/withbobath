export interface NoticeData {
  id: number;
  title: string;
  date: string;
  content: string;
}

export const notices: NoticeData[] = [
  {
    id: 1,
    title: "2024년 7월 휴관 안내",
    date: "2024-07-01",
    content:
      '<span style="color:red">7월 휴관일은 7/15(월)입니다.</span> <br/> <img src="/images/hero-image.jpg" alt="휴관 안내" style="max-width:200px; margin-top:10px;" /> <br/>이용에 참고 바랍니다.',
  },
  {
    id: 2,
    title: "여름방학 프로그램 모집",
    date: "2024-06-20",
    content:
      '<span style="color:blue">여름방학 특강 프로그램을 모집합니다.</span><br/>자세한 내용은 센터로 문의 주세요.',
  },
  {
    id: 3,
    title: "센터 방역 안내",
    date: "2024-06-10",
    content:
      '정기 방역을 실시하였습니다.<br/><span style="color:green">안심하고 방문하세요.</span>',
  },
];
