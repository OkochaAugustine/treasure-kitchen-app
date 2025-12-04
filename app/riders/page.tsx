"use client";

import { Box, Text, SimpleGrid, Image, Button, VStack } from "@chakra-ui/react";
import Navbar from "@/components/ui/Navbar";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const riders = [
  {
    name: "Swift Dispatch",
    image: "/riders/rider1.jpg",
    description: "Fast and reliable delivery within minutes.",
  },
  {
    name: "Urban Express",
    image: "/riders/rider2.jpg",
    description: "Professional city riders for all deliveries.",
  },
  {
    name: "SpeedPro Logistics",
    image: "/riders/rider3.jpg",
    description: "Trusted dispatch with excellent tracking.",
  },
];

export default function RidersPage() {
  return (
    <Box bg="#0c0c0c" minH="100vh" color="white">
      <Navbar />

      {/* HERO SECTION */}
      <MotionBox
        textAlign="center"
        py={20}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Text fontSize="5xl" fontWeight="bold">
          Book a Dispatch Rider
        </Text>
        <Text mt={4} fontSize="lg" opacity={0.8} maxW="600px" mx="auto">
          Fast, reliable and professional riders at your service.
        </Text>
      </MotionBox>

      {/* RIDERS GRID */}
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={10}
        px={{ base: 6, md: 20 }}
        pb={20}
      >
        {riders.map((rider, idx) => (
          <MotionBox
            key={idx}
            bg="#1a1a1a"
            borderRadius="2xl"
            overflow="hidden"
            shadow="lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            <Image
              src={rider.image}
              alt={rider.name}
              h="220px"
              w="100%"
              objectFit="cover"
            />
            <VStack p={6} align="start" spacing={4}>
              <Text fontSize="2xl" fontWeight="bold">
                {rider.name}
              </Text>

              <Text opacity={0.7}>{rider.description}</Text>

              <Button
                size="lg"
                bg="red.500"
                _hover={{ bg: "red.600" }}
                width="full"
                borderRadius="xl"
              >
                Book Rider
              </Button>
            </VStack>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Box>
  );
}
