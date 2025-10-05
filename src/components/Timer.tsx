"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Timer({ onTimeEnd }: { onTimeEnd?: () => void }) {
  const [timeLeft, setTimeLeft] = useState(1200); // 120 секунд

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeEnd?.();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onTimeEnd]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  let timerColorClass = "text-[#FFBB00]";
  let starImage = "/images/starYellow.svg";
  let animateClass = "";

    if (timeLeft <= 30 && timeLeft > 0) {
    timerColorClass = "text-[#FF4E4E] animate-pulse duration-100";
    starImage = "/images/starRed.svg";
    animateClass = "animate-pulse duration-100";
  } else if (timeLeft <= 0) {
    timerColorClass = "text-white";
    starImage = "/images/starWhite.svg";
    animateClass = "";
  }

  return (
    <div className="bg-[#1D5B43] flex flex-col items-center w-full gap-1 py-2 
      h-[74px] xs:h-[85px] sm:h-[94px] xl:h-[103px]">
      <p className="font-semibold text-sm xs:text-lg sm:text-xl xl:text-2xl leading-[130%]">
        Успейте открыть пробную неделю
      </p>
      <div className="flex flex-row items-center">
        <Image
          src={starImage}
          alt="star icon"
          width={14}
          height={14}
          className={animateClass}
        />
        <div className={`${timerColorClass} flex font-bold font-['Raleway'] leading-[110%] px-2
          text-[28px] xs:text-[32px] sm:text-[36px] xl:text-[40px] 
          gap-[2.5px] xs:gap-[3.5px] sm:gap-[4px] xl:gap-[6px]
          h-[36px] xs:h-[42px] sm:[h-48px] xl:h-[52px]`}>
          <span>{String(minutes).padStart(2, "0")}</span>
          <span>:</span>
          <span>{String(seconds).padStart(2, "0")}</span>
        </div>
        <Image
          src={starImage}
          alt="star icon"
          width={14}
          height={14}
          className={animateClass}
        />
      </div>
    </div>
  );
}
