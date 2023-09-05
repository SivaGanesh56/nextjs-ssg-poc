import { Metadata } from "next";
import { ReactNode } from "react";

import "../../styles/index.css";

import { setLocale } from "./context";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateStaticParams() {
  const locales = [
    "en-US",
    "fr",
    "ja-JP",
    "es-001",
    "de-DE",
    "pt-BR",
    "en-GB",
    "ko",
    "en-SG",
    "en-AU",
    "it",
    "ar",
  ];
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children, params }: Props) {
  setLocale(params.locale);

  return (
    <html lang={params.locale ?? "en"}>
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
