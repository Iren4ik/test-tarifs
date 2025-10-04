import type { Metadata } from "next";
import { Montserrat, Raleway } from "next/font/google";
import "./globals.css";

const geistSans = Montserrat({
  variable: "--font-montserrat",
  subsets: ["cyrillic"],
  weight: ["400", "500", "600", "700"], // Regular, Medium, SemiBold, Bold
});

const geistMono = Raleway({
  variable: "--font-raleway",
  subsets: ["cyrillic"],
  weight: ["700"], // Bold
});

export const metadata: Metadata = {
  title: "Тарифы на спорт",
  description: "Тестовое задание: страница тарифов с таймером и анимацией",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
