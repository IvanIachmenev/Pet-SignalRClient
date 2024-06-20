"use client"
import { ChakraProvider } from "@chakra-ui/react";
import { fonts } from "./fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body>
      <ChakraProvider>
        {children}
      </ChakraProvider>
      </body>
    </html>
  );
}
