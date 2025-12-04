"use client";

import { Box } from "@chakra-ui/react";
import MenuSection from "@/components/ui/MenuSection";
import Navbar from "@/components/ui/Navbar";
import MenuSlides from "@/components/ui/MenuSlides";

export default function MenuPage() {
  return (
    <Box>
        <Navbar/>
      {/* <MenuSection /> */}
      <MenuSlides/>
    </Box>
  );
}
