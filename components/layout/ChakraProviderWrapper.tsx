"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ReactNode } from "react";

// Optional: customize your theme here
const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        padding: 0,
        margin: 0,
        fontFamily: "system-ui, sans-serif",
        backgroundColor: "gray.50",
      },
    },
  },
});

export default function ChakraProviderWrapper({ children }: { children: ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
