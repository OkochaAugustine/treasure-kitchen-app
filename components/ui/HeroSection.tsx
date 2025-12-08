"use client";

import { Box, Heading, Text, Button, VStack, HStack, Icon } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GiTomato, GiChickenOven, GiMeat } from "react-icons/gi";

const slides = [
  {
    id: 1,
    title: "Fresh Meals Delivered Fast",
    subtitle: "Savor the rich flavors of our Vegetable Soup 🌿",
    icon: GiTomato,
    bg: "/images/hero4.jpg",
    button: "Order Now",
    link: "/order",
  },
  {
    id: 2,
    title: "Hot and Delicious Food",
    subtitle: "Dive into the authentic taste of Nsala Soup 🍲",
    icon: GiChickenOven,
    bg: "/images/hero5.jpg",
    button: "View Menu",
    link: "/menu",
  },
  {
    id: 3,
    title: "Experience Culinary Joy",
    subtitle: "Enjoy the savory goodness of Egusi Soup 🥘",
    icon: GiMeat,
    bg: "/images/hero6.jpg",
    button: "Get Started",
    link: "/order",
  },
];

const MotionBox = motion(Box);

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      position="relative"
      w="full"
      overflow="hidden"
      bgImage="/images/hero-bg.jpg" // <-- Background image for the whole hero section
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <AnimatePresence>
        {slides.map(
          (slide, index) =>
            index === current && (
              <MotionBox
                key={slide.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 1 }}
                position="relative"
                w="full"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  as="img"
                  src={slide.bg}
                  alt={slide.title}
                  width="100%"
                  height="auto"
                  maxH={{ base: "500px", md: "800px" }}
                  objectFit="contain"
                />

                <VStack
                  spacing={6}
                  position="absolute"
                  bg="rgba(0,0,0,0.5)"
                  p={{ base: 4, md: 10 }}
                  borderRadius="md"
                  textAlign="center"
                  color="white"
                  maxW="800px"
                >
                  <Heading fontSize={{ base: "2xl", md: "5xl" }}>{slide.title}</Heading>
                  <HStack spacing={3} justifyContent="center">
                    {slide.icon && <Icon as={slide.icon} boxSize={{ base: 6, md: 8 }} />}
                    <Text fontSize={{ base: "md", md: "xl" }} fontWeight="bold">
                      {slide.subtitle}
                    </Text>
                  </HStack>
                  <Button
                    colorScheme="teal"
                    size="lg"
                    onClick={() => router.push(slide.link)}
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
