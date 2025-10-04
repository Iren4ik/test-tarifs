"use client";

type Props = {
  id: string;
  period: string;
  price: number;
  full_price: number;
  text?: string;
  is_best?: boolean;
  size?: "large" | "normal";
  selected?: boolean;
  expired?: boolean; // истек ли таймер
  onSelect?: () => void;
};

export default function TariffCard({
  period,
  price,
  full_price,
  text,
  is_best = false,
  size = "normal",
  selected = false,
  expired = false,
  onSelect,
}: Props) {
  const discount =
    full_price > 0 ? Math.round(((full_price - price) / full_price) * 100) : 0;

  // 🔹 base теперь без переносов и с relative на article
  const base = `
    relative border-2 cursor-pointer overflow-hidden transition-all duration-300 
    min-h-[118px] h-[118px] xs:h-[131px]
    rounded-[20px] sm:rounded-[30px] xl:rounded-[34px] 
    before:absolute before:inset-0 before:bg-[#313637] before:transition-opacity before:duration-300
    hover:before:opacity-50
  `;

  const largeStyles =
    "w-full flex items-center justify-center sm:h-[150px] max-h-[190px] py-[20px] pr-[20px] pl-[20px] xs:pr-[30px] sm:pt-[34px] sm:pb-[30px] sm:pl-[122px] sm:pr-[80px]";
  const normalStyles =
    "flex flex-col items-center sm:h-[270px] xl:h-[335px] sm:px-[18px] py-[20px] pr-[20px] pl-[20px] xs:pr-[30px] sm:pt-[56px] xl:pt-[70px] sm:pb-[23px]";

  const cardClass = size === "large" ? largeStyles : normalStyles;
  const selectedClass = selected ? "border-[var(--accent)]" : "border-[#484D4E]";

  return (
    <article
      onClick={onSelect}
      className={`${base} ${cardClass} ${selectedClass}`}
      aria-label={`Тариф ${period}`}
    >
      {/* скидка % */}
      {!expired && discount > 0 && (
        <div className={`
              absolute text-center top-0 bg-[#FD5656] rounded-b-lg flex items-center z-20
              sm:right-auto sm:left-[30px] xl:left-[50px]
              h-[23px] xs:h-[27px] sm:h-[34px] xl:h-[39px]
              ${size === "large" ? 
              "right-[50px] xs:right-[62px]  " : 
              "right-[28px] xs:right-[30px]  "}  
            `}>
          <span className="text-white font-medium leading-[130%] 
              text-[13px] xs:text-base sm:text-lg
              px-[6px] py-[3px] sm:px-2 sm:py-[5px]  
              ">
            -{discount}%
          </span>
        </div>
      )}

      {/* хит */}
      {is_best && (
        <span className="absolute text-[var(--accent)] font-medium z-20 leading-[130%] tracking-[3%]
            top-[6px] sm:top-[8px] xl:top-[10px] 
            right-[14px] sm:right-[18px] xl:right-[20px] 
            text-[13px] xs:text-[16px] sm:text-[18px] xl:text-[22px] ">
          хит!
        </span>
      )}

      {/* Контент */}
      <div className="relative z-10 flex w-full">
        <div
          className={`flex flex-row ${
            size === "large"
              ? "justify-center items-center gap-[30px] xs:gap-[50px] sm:gap-[40px]"
              : "justify-center items-center gap-[30px] xs:gap-[50px] sm:flex-col"
          }`}
        >
          {/* цена */}
          <div className="flex flex-col items-start sm:items-center justify-between w-min min-w-[107px] xs:min-w-[121px] self-center">
            <h3
              className={`font-medium text-white leading-[120%]
                text-[16px] xs:text-[18px] sm:text-[20px] xl:text-[26px]  
                ${
                size === "large" ? 
                "mb-3 xs:mb-4" : 
                "mb-[12px] xs:mb-[16px] xl:mb-[30px]"
              }`}
            >
              {period}
            </h3>
            <span
              className={`font-semibold leading-none text-[30px] xs:text-[34px] sm:text-[36px] xl:text-[50px] self-end ${
                size === "large" ? "text-[var(--accent)]" : "text-white"
              }`}
            >
              {expired ? full_price : price}&nbsp;&#8381;
            </span>
            {!expired && (
              <span className="leading-[120%] text-[#919191] line-through self-end
                  text-sm xs:text-base sm:text-lg xl:text-2xl">
                {full_price}&nbsp;&#8381;
              </span>
            )}
          </div>

          {/* описание */}
          <p className="font-regular text-white leading-[130%] text-sm xl:text-base" >
            {text}
          </p>
        </div>
      </div>
    </article>
  );
}
