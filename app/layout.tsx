import "@/styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import clsx from "clsx";

export const metadata: Metadata = {
<<<<<<< HEAD
  title: 'Librarian - oneplanet',
  description: 'Oneplanet LMS',
}
=======
  title: "Next.js",
  description: "Generated by Next.js",
};
>>>>>>> 19beccf692cdf9453dc554cfdcb4087a30bd835c

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={clsx("font-sans antialiased", fontSans.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
