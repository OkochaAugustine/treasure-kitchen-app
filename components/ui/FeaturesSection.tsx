// components/ui/FeaturesSection.tsx
"use client";

import { Box, SimpleGrid, VStack, Text, Icon, Flex } from "@chakra-ui/react";
import { GiCookingPot, GiKnifeFork, GiMeal, GiFruitBowl } from "react-icons/gi";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: any;
}

const features: Feature[] = [
  {
    id: 1,
    title: "Fresh Ingredients",
    description: "We source only the freshest ingredients to ensure every bite is perfect.",
    icon: GiFruitBowl,
  },
  {
    id: 2,
    title: "Expert Chefs",
    description: "Our chefs are trained in traditional and modern culinary techniques.",
    icon: GiCookingPot,
  },
  {
    id: 3,
    title: "Fast Delivery",
    description: "Delicious meals delivered straight to your doorstep in no time.",
    icon: GiKnifeFork,
  },
  {
    id: 4,
    title: "Authentic Flavors",
    description: "Every dish bursts with rich, authentic flavors crafted with care.",
    icon: GiMeal,
  },
];

export default function FeaturesSection() {
  return (
    <Box as="section" bg="orange.50" py={{ base: 12, md: 20 }} px={{ base: 4, md: 16 }}>
      <VStack spacing={6} textAlign="center" mb={12}>
        <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" color="orange.400">
          Why Choose Us
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" maxW="2xl">
          Discover what makes our restaurant stand out and why our customers keep coming back.
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
        {features.map((feature) => (
          <Flex
            key={feature.id}
            direction="column"
            align="center"
            bg="white"
            borderRadius="2xl"
            shadow="lg"
            p={6}
            transition="all 0.3s"
            _hover={{ transform: "translateY(-8px)", shadow: "2xl" }}
          >
            <Icon as={feature.icon} w={12} h={12} color="orange.400" mb={4} />
            <Text fontWeight="bold" fontSize="xl" mb={2} color="gray.800">
              {feature.title}
            </Text>
            <Text fontSize="sm" color="gray.600" textAlign="center">
              {feature.description}
            </Text>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
}
