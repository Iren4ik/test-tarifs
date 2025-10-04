"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Timer({ onTimeEnd }: { onTimeEnd?: () => void }) {
  const [timeLeft, setTimeLeft] = useState(120); // 120 секунд

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
  let starImage = "/starYellow.svg";
  let animateClass = "";

    if (timeLeft <= 30 && timeLeft > 0) {
    timerColorClass = "text-[#FF4E4E] animate-pulse duration-100";
    starImage = "/starRed.svg";
    animateClass = "animate-pulse duration-100";
  } else if (timeLeft <= 0) {
    timerColorClass = "text-white";
    starImage = "/starWhite.svg";
    animateClass = "";
  }

  return (
    <div className="bg-[#1D5B43] py-2 h-[103px] flex flex-col items-center w-full">
      <p className="font-semibold text-2xl leading-[130%]">
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
        <div className={`${timerColorClass} font-bold font-['Raleway'] text-[40px] leading-[130%] px-2`}>
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
