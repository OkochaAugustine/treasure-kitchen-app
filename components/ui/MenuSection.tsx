"use client";

import { Box, SimpleGrid, VStack, Image, Text, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const MotionBox = motion(Box);

const foodItems: FoodItem[] = [
  { id: 1, name: "Banga Soup", description: "Traditional Banga Soup served hot.", price: 2500, image: "/images/banga.jpg" },
  { id: 2, name: "Okra Soup", description: "Delicious Okra Soup with assorted meats.", price: 2500, image: "/images/okra.jpg" },
  { id: 3, name: "Egusi Soup", description: "Nutty Egusi Soup with rich flavors.", price: 2500, image: "/images/egusi.jpg" },
  { id: 4, name: "Vegetable Soup", description: "Healthy and fresh Vegetable Soup.", price: 2500, image: "/images/vegetable.jpg" },
  { id: 5, name: "Oha Soup", description: "Authentic Oha Soup with local spices.", price: 2500, image: "/images/oha.jpg" },
  { id: 6, name: "Afang Soup", description: "Tasty Afang Soup with perfect seasoning.", price: 2500, image: "/images/afang.jpg" },
  { id: 7, name: "Atama Soup", description: "Rich Atama Soup made with love.", price: 2500, image: "/images/atama.jpg" },
  { id: 8, name: "Jollof Rice", description: "Classic Jollof Rice with vibrant flavors.", price: 2500, image: "/images/jollof.jpg" },
];

export default function MenuSection() {
  const router = useRouter();

  return (
    <Box
      as="section"
      bgImage="url('/images/menu-bg.jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgAttachment="fixed"
      py={{ base: 12, md: 20 }}
      px={{ base: 4, md: 16 }}
    >
      {/* Header */}
      <VStack spacing={6} textAlign="center" mb={12}>
        <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" color="orange.400">
          Our Delicious Menu
        </Text>

        <Text fontSize={{ base: "md", md: "lg" }} color="white" maxW="2xl">
          Explore the finest dishes we prepare with love. Each plate is crafted to satisfy your taste buds and bring joy to your table.
        </Text>
      </VStack>

      {/* Scrollable section */}
      <Box
        maxH="100%"
        overflowY="auto"
        css={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        sx={{ "&::-webkit-scrollbar": { display: "none" } }}
      >
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          {foodItems.map((item, index) => (
            <MotionBox
              key={item.id}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              bg="white"
              borderRadius="xl"
              shadow="lg"
              overflow="hidden"
              _hover={{ transform: "translateY(-5px)", shadow: "2xl" }}
            >
              <Image
                src={item.image}
                alt={item.name}
                w="full"
                h={{ base: "180px", md: "230px" }}
                objectFit="cover"
              />

              <VStack spacing={3} p={6} align="start">
                <Text fontWeight="bold" fontSize="xl" color="gray.800">
                  {item.name}
                </Text>

                <Text fontSize="sm" color="gray.600">
                  {item.description}
                </Text>

                {/* PRICE UPDATED TO ₦2500 */}
                <Text fontWeight="bold" color="orange.400">
                  ₦{item.price}
                </Text>

                <Button
                  w="full"
                  colorScheme="orange"
                  bg="orange.400"
                  _hover={{ bg: "orange.500", transform: "scale(1.05)" }}
                  onClick={() => router.push("/login")}
                >
                  Order Now
                </Button>
              </VStack>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
