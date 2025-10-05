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
    <main className="flex flex-col min-h-screen font-[Montserrat] items-center">
      <Timer onTimeEnd={() => setExpired(true)} />
      <section aria-label="Выбор тарифа"
        className="mx-[16px] sm:mx-[36px] xl:mx-[50px]
          pt-[22px] xs:pt-[21px] sm:pt-[30px] xl:pt-[50px] 
          pb-[20px] xs:pb-[30px] sm:pb-[50px] xl:pb-[150px] 
      ">
        <h1 className="font-bold leading-[110%] text-white 
          text-[22px] xs:text-[24px] sm:text-[30px] xl:text-[40px] 
          tracking-[0.22px] xs:tracking-[0.24px] sm:tracking-[0.3px] xl:tracking-[0.4px]
          mb-[22px] xs:mb-[16px] sm:mb-[40px] xl:mb-[110px]
          xs:max-w-[312px] sm:max-w-none">
          Выбери подходящий для себя{" "}
          <span className="[color:var(--accent)]">тариф</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-0 lg:gap-[82px] items-center justify-between max-w-[1216px]">
          {/* Person */}
            <div className="relative 
              h-[200px] min-w-[99px] 
              xs:h-[250px] xs:min-w-[124px] 
              sm:h-[500px] sm:min-w-[248px] 
              xl:h-[767px] xl:min-w-[380px]">
              <Image 
                src="/images/person.png" 
                alt="man" 
                fill
                className="object-contain object-bottom"
              />
              
              {/* Gradient overlay */}
              <div
                className="absolute bottom-0 left-0 w-full h-[80px]"
                style={{
                  background: 'linear-gradient(180deg, rgba(35, 40, 41, 0) 0%, #232829 100%)',
                }}
              />
            </div>

          <div className="flex flex-col max-w-[748px]">
            {/* Tariffs */}
            <div className="flex flex-col gap-[6px] xs:gap-[8px] sm:gap-[14px]">
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-[6px] xs:gap-[8px] sm:gap-[14px]">
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
            <div className="bg-[#2D3233] flex items-start 
              gap-[4px] sm:gap-[8px] 
              rounded-[16px] xs:rounded-[20px] 
              pl-[12px] pr-[20px] sm:px-5 py-[14px] sm:py-[18px] 
              w-full lg:max-w-[499px] 
              mt-[10px] xs:mt-[12px] sm:mt-[20px]">
              <Image
                src="/images/exclamation.svg"
                alt="exclamation mark"
                width={24}
                height={26}
              />
              <p className="text-white font-regular leading-[130%] text-xs sm:text-base">
                Следуя плану на 3 месяца и более, люди получают в 2 раза лучший
                результат, чем за 1 месяц
              </p>
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="flex items-start xs:items-center justify-start gap-[10px] xs:gap-[12px] mt-[16px] xs:mt-[24px] sm:mt-[30px]">
              <button
                onClick={() => setAgreedToPolicy(!agreedToPolicy)}
                className={`border-2 border-[#606566]  flex items-center justify-center cursor-pointer transition-colors duration-500
                  w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] min-w-[30px] sm:min-w-[32px] rounded ${
                  shakePolicy ? "bg-[#FD5656]" : "bg-transparent"
                }`}
              >
                {agreedToPolicy && (
                  <div className="w-[19.09px] h-[13.64] sm:w-[20.36px] sm:h-[14.55px]">
                    <Image
                      src="/images/checkbox.svg"
                      alt="checkbox"
                      width={20.36}
                      height={14.55}
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </button>
              <p className="text-[#CDCDCD] text-xs sm:text-base leading-[120%] sm:leading-[110%] xl:max-w-[605px]">
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
              className="w-full md:w-[352px] px-[60px] py-4 xs:py-5 rounded-[20px] 
              text-[#191E1F] font-bold text-lg leading-[130%] mt-4 xs:mt-5 sm:mt-4 xl:mt-[18px]
                bg-[var(--accent)] transition-opacity duration-200 ease-in-out cursor-pointer active:opacity-70"
            >
              Купить
            </button>
            
            {/* Legal Text */}
            <p className="text-[#9B9B9B] leading-[120%] font-regular
              text-[10px] sm:text-[14px] mt-[10px] xs:mt-[22px] sm:mt-[16px]">
              Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения 
              пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой 
              карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.
            </p>
          </div>
        </div>

        {/* Guarantee Section */}
        <section aria-label="Гарантия возврата"
          className="border border-[#484D4E] max-w-[748px] lg:max-w-[1216px] mx-auto
          mt-[20px] xs:mt-[22px] sm:mt-[36px] xl:mt-[66px]  
          rounded-[20px] sm:rounded-[30px] p-[11px] sm:p-5">
          <div className="inline-flex items-center justify-center border border-[#81FE95] bg-[#2D3233] rounded-[30px] 
            w-full xs:max-w-[294px] sm:max-w-[400px] xl:max-w-[461px]
            px-[16px] sm:px-[24px] xl:px-[28px] pt-[10px] pb-[12px] sm:py-[14px] xl:py-[16px] mb-[10px] sm:mb-[20px] xl:mb-[30px]">
            <span className="text-[#81FE95] font-medium leading-[120%]
              text-[16px] xs:text-[18px] sm:text-[24px] xl:text-[28px]">
              гарантия возврата 30 дней
            </span>
          </div>
          <p className="text-[#DCDCDC] leading-[130%] font-regular 
            text-[13px] xs:text-[14px] sm:text-[20px] xl:text-[24px] ">
            Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели! 
            Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получишь видимых результатов.
          </p>
        </section>
      </section>
    </main>
  );
}
