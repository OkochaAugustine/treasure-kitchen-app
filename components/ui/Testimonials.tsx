// components/ui/Testimonials.tsx
"use client";

import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  SimpleGrid,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number; // out of 5
  comment: string;
}

// Example testimonials
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mary Johnson",
    role: "Food Blogger",
    avatar: "/images/avatar1.jpg",
    rating: 5,
    comment:
      "The flavors are out of this world! Every dish is crafted with love and the service is impeccable.",
  },
  {
    id: 2,
    name: "David Smith",
    role: "Chef Enthusiast",
    avatar: "/images/avatar2.jpg",
    rating: 5,
    comment:
      "I am blown away by the attention to detail and freshness of the ingredients. Highly recommend!",
  },
  {
    id: 3,
    name: "Olivia Brown",
    role: "Foodie",
    avatar: "/images/avatar3.jpg",
    rating: 4,
    comment:
      "The menu variety is amazing and every dish tastes incredible. Perfect spot for family and friends.",
  },
];

export default function Testimonials() {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box as="section" py={{ base: 16, md: 24 }} bg={bgColor}>
      <VStack spacing={6} textAlign="center" mb={12}>
        <Text
          fontSize={{ base: "3xl", md: "4xl" }}
          fontWeight="bold"
          color="orange.400"
        >
          What Our Customers Say
        </Text>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          color="gray.600"
          maxW="3xl"
        >
          Our customers love us! See why people keep coming back for more and why
          Treasure Kitchen is their go-to place for delicious meals.
        </Text>
      </VStack>

      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={8}
        px={{ base: 4, md: 16 }}
      >
        {testimonials.map((testi) => (
          <Box
            key={testi.id}
            bg={cardBg}
            borderRadius="2xl"
            shadow="xl"
            p={8}
            textAlign="center"
            _hover={{ transform: "translateY(-5px)", shadow: "2xl" }}
            transition="all 0.3s"
          >
            <Avatar
              src={testi.avatar}
              name={testi.name}
              size="xl"
              mb={4}
              mx="auto"
            />
            <HStack justify="center" mb={4} spacing={1}>
              {Array.from({ length: testi.rating }, (_, i) => (
                <Icon key={i} as={FaStar} color="orange.400" />
              ))}
            </HStack>
            <Text fontSize="md" color="gray.600" mb={6}>
              "{testi.comment}"
            </Text>
            <VStack spacing={0}>
              <Text fontWeight="bold" fontSize="lg" color="gray.800">
                {testi.name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {testi.role}
              </Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
