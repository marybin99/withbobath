import React from "react";

const Message: React.FC = () => {
  return (
    <section className="pb-8 lg:pt-5 lg:pb-[120px]">
      <div className="container px-4 mx-auto">
        <div className="max-w-[640px] mx-auto">
          <div className="bg-[#D2E5CC] border border-[#7CA172] rounded-lg p-4 lg:px-5 lg:py-[25px]">
            <div className="space-y-3 lg:space-y-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2 lg:gap-3">
                  <span className="text-lg lg:text-[24px] font-jua">
                    &gt;&gt;
                  </span>
                  <div className="space-y-1">
                    <p className="text-lg lg:text-[24px] font-jua leading-[1.4] lg:leading-[1.25] break-keep">
                      {
                        "대상 아동의 가족과 함께 아이들의 미래와 행복한 삶의 가치를 더불어 고민하는 더함발달연구센터가 되겠습니다."
                      }
                    </p>
                    <p className="font-sans text-sm lg:text-base">
                      언제든지 아이들과 관련된 궁금한 점은 선생님들과
                      상의하세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Message;
