// components/ui/WhyPeopleLoveUs.tsx
"use client";

import { Box, SimpleGrid, VStack, Text, Icon } from "@chakra-ui/react";
import { CheckIcon, StarIcon, TimeIcon, InfoIcon } from "@chakra-ui/icons";

interface Feature {
  icon: typeof InfoIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: InfoIcon,
    title: "Fresh & Delicious Meals",
    description: "Every dish is prepared using the freshest ingredients for the best taste.",
  },
  {
    icon: TimeIcon,
    title: "Fast Delivery",
    description: "Get your orders delivered hot and on time, every time.",
  },
  {
    icon: StarIcon,
    title: "Loved by Everyone",
    description: "Our customers rave about our food, service, and atmosphere.",
  },
  {
    icon: CheckIcon,
    title: "Affordable Pricing",
    description: "Premium meals at prices that won't break the bank.",
  },
];

export default function WhyPeopleLoveUs() {
  return (
    <Box
      as="section"
      bg="orange.50"
      py={{ base: 12, md: 20 }}
      px={{ base: 4, md: 16 }}
    >
      {/* Section Header */}
      <VStack spacing={6} textAlign="center" mb={12}>
        <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" color="orange.400">
          Why People Love Us
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" maxW="2xl">
          Discover why our customers keep coming back for more. It's not just food, it's an experience.
        </Text>
      </VStack>

      {/* Features Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
        {features.map((feature, index) => (
          <VStack
            key={index}
            spacing={4}
            p={6}
            bg="white"
            borderRadius="2xl"
            shadow="lg"
            align="start"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-8px)", shadow: "2xl" }}
          >
            <Icon as={feature.icon} w={10} h={10} color="orange.400" />
            <Text fontWeight="bold" fontSize="xl" color="gray.800">
              {feature.title}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {feature.description}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}
