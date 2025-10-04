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
    relative border-2 rounded-[34px] cursor-pointer overflow-hidden transition-all duration-300
    before:absolute before:inset-0 before:bg-[#313637] before:transition-opacity before:duration-300
    hover:before:opacity-50
  `;

  const largeStyles =
    "w-full flex items-center justify-center max-h-[190px] pt-[34px] pb-[30px] pl-[122px] pr-[80px]";
  const normalStyles =
    "flex flex-col items-center min-h-[335px] px-[18px] pt-[70px] pb-[23px]";

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
        <div className="absolute h-[39px] text-center left-[50px] top-0 bg-[#FD5656] rounded-b-lg flex items-center z-20">
          <span className="text-white px-2 py-[5px] text-lg font-medium">
            -{discount}%
          </span>
        </div>
      )}

      {/* хит */}
      {is_best && (
        <span className="absolute top-[10px] right-5 text-[22px] text-[var(--accent)] font-medium z-20">
          хит!
        </span>
      )}

      {/* Контент */}
      <div className="relative z-10">
        <div
          className={`flex ${
            size === "large"
              ? "flex-row justify-center items-center gap-10"
              : "flex-col"
          }`}
        >
          {/* цена */}
          <div className="flex flex-col items-center justify-between w-min self-center">
            <h3
              className={`font-medium text-white text-[26px] leading-[120%] ${
                size === "large" ? "mb-4" : "mb-[30px]"
              }`}
            >
              {period}
            </h3>
            <span
              className={`font-semibold text-[50px] leading-none ${
                size === "large" ? "text-[var(--accent)]" : "text-white"
              }`}
            >
              {expired ? full_price : price}&nbsp;&#8381;
            </span>
            {!expired && (
              <span className="text-2xl leading-[120%] text-[#919191] line-through self-end">
                {full_price}&nbsp;&#8381;
              </span>
            )}
          </div>

          {/* описание */}
          <p
            className={`font-regular text-white text-base leading-[130%] ${
              size === "large" ? "" : "mt-[50px]"
            }`}
          >
            {text}
          </p>
        </div>
      </div>
    </article>
  );
}
