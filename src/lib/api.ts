export type Tariff = {
  id: string;
  period: string;
  price: number;
  full_price: number;
  is_best: boolean;
  text?: string;
};

const TARIFFS_URL = "https://t-core.fit-hub.pro/Test/GetTariffs";

/**
 * Получаем тарифы с сервера.
 * В App Router мы можем вызывать эту функцию из серверного компонента (async).
 * Настройка { next: { revalidate: 60 } } — кэшировать 60s (опционально).
 */
export async function getTariffs(): Promise<Tariff[]> {
  const res = await fetch(TARIFFS_URL, {
    // В dev можно поставить no-store, в проде — revalidate: 60
    next: { revalidate: 60 },
    // credentials / headers можно добавить при необходимости
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch tariffs: ${res.status}`);
  }
  const data = await res.json();
  return data as Tariff[];
}
