"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Timer from "@/components/Timer";
import TariffCard from "@/components/TariffCard";

type Tariff = {
  id: string;
  period: string;
  price: number;
  full_price: number;
  text?: string;
  is_best?: boolean;
};

export default function Home() {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [expired, setExpired] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [shakePolicy, setShakePolicy] = useState(false);

  useEffect(() => {
    async function fetchTariffs() {
      try {
        const res = await fetch("https://t-core.fit-hub.pro/Test/GetTariffs");
        const data = await res.json();
        setTariffs(data);
      } catch (err) {
        console.error("Ошибка загрузки тарифов:", err);
      }
    }
    fetchTariffs();
  }, []);

  const accent = tariffs.find((t) => t.period === "Навсегда");
  const others = tariffs.filter((t) => t.period !== "Навсегда").reverse();

  useEffect(() => {
    if (accent) setSelectedPlan(-1);
  }, [accent]);

  const handleBuyClick = () => {
    if (!agreedToPolicy) {
      setShakePolicy(true);
      setTimeout(() => setShakePolicy(false), 500);
      return;
    }
  };

  return (
    <main className="flex flex-col min-h-screen font-[Montserrat]">
      <Timer onTimeEnd={() => setExpired(true)} />
      <div className="mx-auto pt-[50px] pb-[150px]">
        <h1 className="text-[40px] font-bold leading-[110%] text-white mb-[110px]">
          Выбери подходящий для себя{" "}
          <span className="[color:var(--accent)]">тариф</span>
        </h1>

        <div className="flex flex-row gap-[82px] items-center justify-between max-w-[1216px]">
          {/* Person */}
          <div>
            <Image src="/person.png" alt="man" width={380} height={767} />
          </div>

          <div className="flex flex-col max-w-[748px]">
            {/* Tariffs */}
            <div className="flex flex-col gap-[14px]">
              {/* Accent card */}
              {accent && (
                <TariffCard
                  key="accent"
                  {...accent}
                  size="large"
                  is_best={true}
                  expired={expired}
                  selected={selectedPlan === -1}
                  onSelect={() => setSelectedPlan(-1)}
                />
              )}

              {/* Other cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-[14px]">
                {others.map((tariff, index) => (
                  <TariffCard
                    key={index}
                    {...tariff}
                    size="normal"
                    expired={expired}
                    selected={selectedPlan === index}
                    onSelect={() => setSelectedPlan(index)}
                  />
                ))}
              </div>
            </div>

            {/* Attention */}
            <div className="bg-[#2D3233] rounded-[20px] px-5 py-[18px] flex items-start gap-2 max-w-[499px] mt-5">
              <Image
                src="/exclamation.svg"
                alt="exclamation mark"
                width={24}
                height={26}
              />
              <p className="text-white font-regular text-base leading-[130%]">
                Следуя плану на 3 месяца и более, люди получают в 2 раза лучший
                результат, чем за 1 месяц
              </p>
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="flex items-center justify-start gap-3 mt-[30px]">
              <button
                onClick={() => setAgreedToPolicy(!agreedToPolicy)}
                className={`w-8 h-8 border-2 border-[#606566] rounded flex items-center justify-center cursor-pointer transition-colors duration-500 ${
                  shakePolicy ? "bg-[#FD5656]" : "bg-transparent"
                }`}
              >
                {agreedToPolicy && (
                  <Image
                    src="/checkbox.svg"
                    alt="checkbox"
                    width={20.36}
                    height={14.55}
                  />
                )}
              </button>
              <p className="text-[#CDCDCD] text-base leading-[110%] max-w-[605px]">
                Я согласен с{" "}
                <span className="underline cursor-pointer hover:text-white transition-colors">
                  офертой рекуррентных платежей
                </span>{" "}
                и{" "}
                <span className="underline cursor-pointer hover:text-white transition-colors">
                  Политикой конфиденциальности
                </span>
              </p>
            </div>

            {/* Buy Button */}
            <button
              onClick={() => { handleBuyClick(); }}
              className="w-[352px] px-[60px] py-5 rounded-[20px] text-[#191E1F] font-bold text-lg mt-4
              bg-[var(--accent)] transition-opacity duration-200 ease-in-out cursor-pointer active:opacity-70"
            >
              Купить
            </button>
            
            {/* Legal Text */}
            <p className="text-[#9B9B9B] text-sm leading-[120%] font-regular mt-[14px]">
              Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения 
              пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой 
              карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.
            </p>
          </div>
        </div>

        {/* Guarantee Section */}
        <div className="mt-[66px] border border-[#484D4E] rounded-[30px] p-5 max-w-[1216px] mx-auto">
          <div className="inline-flex px-[30px] py-4 border border-[#81FE95] bg-[#2D3233] rounded-[30px] mb-[30px]">
            <span className="text-[#81FE95] text-[28px] font-medium leading-[120%]">
              гарантия возврата 30 дней
            </span>
          </div>
          <p className="text-[#DCDCDC] text-2xl leading-[130%] font-regular">
            Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели! Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получишь видимых результатов.
          </p>
        </div>
      </div>
    </main>
  );
}
