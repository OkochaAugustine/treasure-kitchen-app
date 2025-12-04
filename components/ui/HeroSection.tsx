"use client";

import { Box, Heading, Text, Button, VStack, useBreakpointValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // <-- Import router

// Slides data
const slides = [
  {
    id: 1,
    title: "Fresh Meals Delivered Fast",
    subtitle: "Taste the difference with Treasure Kitchen",
    bg: "/images/hero1.jpg",
    button: "Order Now",
    link: "/order", // <-- page to navigate to
  },
  {
    id: 2,
    title: "Hot and Delicious Food",
    subtitle: "We bring flavor straight to your door",
    bg: "/images/hero2.jpg",
    button: "View Menu",
    link: "/menu",
  },
  {
    id: 3,
    title: "Experience Culinary Joy",
    subtitle: "Your favorite meals, made with love",
    bg: "/images/hero3.jpg",
    button: "Get Started",
    link: "/order",
  },
];

// Motion div wrapper for Chakra Box
const MotionBox = motion(Box);

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const router = useRouter(); // <-- Initialize router
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box position="relative" w="full" h={{ base: "400px", md: "600px" }} overflow="hidden">
      <AnimatePresence>
        {slides.map(
          (slide, index) =>
            index === current && (
              <MotionBox
                key={slide.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 1 }}
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                backgroundImage={`url(${slide.bg})`}
                backgroundSize="cover"
                backgroundPosition="center"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <VStack
                  spacing={6}
                  bg="rgba(0,0,0,0.4)"
                  p={{ base: 4, md: 10 }}
                  borderRadius="md"
                  textAlign="center"
                  color="white"
                  maxW="800px"
                >
                  <Heading fontSize={{ base: "2xl", md: "5xl" }}>{slide.title}</Heading>
                  <Text fontSize={{ base: "md", md: "xl" }}>{slide.subtitle}</Text>
                  <Button
                    colorScheme="teal"
                    size="lg"
                    onClick={() => router.push(slide.link)} // <-- Navigate to page
                  >
                    {slide.button}
                  </Button>
                </VStack>
              </MotionBox>
            )
        )}
      </AnimatePresence>
    </Box>
  );
}
