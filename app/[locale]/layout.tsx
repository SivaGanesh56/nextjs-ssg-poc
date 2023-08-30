import { Metadata } from "next";
import { ReactNode } from "react";

import "../../styles/index.css";

import { NextIntlClientProvider } from "next-intl";
import { getDictionary } from "./dictionaries";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children, params }: Props) {
  const messages = await getDictionary(params.locale);
  return (
    <html lang={params.locale}>
      <body className="bg-gray-100" suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
