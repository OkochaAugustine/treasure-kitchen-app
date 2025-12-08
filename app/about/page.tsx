"use client";

import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar"; // Your updated navbar
import Footer from "@/components/ui/Footer";
import WhatsappFloater from "@/components/ui/WhatsappFloater";
import OurChefs from "@/components/ui/OurChefs";

const MotionBox = motion(Box);

export default function AboutPage() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const router = useRouter();

  return (
    <Box>
      {/* ---------------- Navbar ---------------- */}
      <Navbar />

      {/* ---------------- Hero Section ---------------- */}
      <Box
        position="relative"
        w="full"
        h={{ base: "400px", md: "600px" }}
        bgImage="url('/images/hero-bg.jpg')"
        bgSize="cover"
        bgPosition="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack
          bg="rgba(0,0,0,0.5)"
          p={{ base: 6, md: 12 }}
          borderRadius="md"
          spacing={4}
          textAlign="center"
          color="white"
        >
          <Heading fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold">
            About Treasure Kitchen
          </Heading>
          <Text fontSize={{ base: "md", md: "xl" }} maxW="2xl">
            Crafting delicious meals with love, passion, and tradition. Experience flavors that bring joy to every table.
          </Text>
          <Button
            colorScheme="orange"
            size="lg"
            _hover={{ bg: "orange.500", transform: "scale(1.05)" }}
            onClick={() => router.push("/menu")}
          >
            Explore Our Menu
          </Button>
        </VStack>
      </Box>

      {/* ---------------- Story Section ---------------- */}
      <Box py={{ base: 12, md: 20 }} px={{ base: 4, md: 16 }} bg="gray.50">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
          <MotionBox
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/kitchen.jpg"
              alt="Treasure Kitchen Story"
              borderRadius="xl"
              objectFit="cover"
              w="full"
              h={{ base: "300px", md: "400px" }}
            />
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Heading fontSize={{ base: "2xl", md: "4xl" }} mb={4} color="orange.400">
              Our Story
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} mb={4}>
              Treasure Kitchen started as a small passion project to bring authentic, home-cooked flavors to our community. From traditional soups to modern favorites, we combine fresh ingredients with culinary expertise to deliver meals that delight every sense.
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
              Over the years, our mission has remained the same: provide delicious, high-quality meals with exceptional service, and create unforgettable dining experiences for all our customers.
            </Text>
          </MotionBox>
        </SimpleGrid>
      </Box>

      {/* ---------------- Mission & Vision ---------------- */}
      <Box py={{ base: 12, md: 20 }} px={{ base: 4, md: 16 }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <MotionBox
            bg="orange.50"
            p={8}
            borderRadius="xl"
            shadow="lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Heading fontSize={{ base: "2xl", md: "3xl" }} mb={4} color="orange.400">
              Our Mission
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }}>
              To craft memorable meals that celebrate local flavors, while providing fast and reliable delivery, creating joy and satisfaction in every bite.
            </Text>
          </MotionBox>

          <MotionBox
            bg="orange.50"
            p={8}
            borderRadius="xl"
            shadow="lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Heading fontSize={{ base: "2xl", md: "3xl" }} mb={4} color="orange.400">
              Our Vision
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }}>
              To become the most loved culinary brand by consistently delivering fresh, flavorful meals that bring communities together.
            </Text>
          </MotionBox>
        </SimpleGrid>
      </Box>

      {/* ---------------- Our Chefs Section ---------------- */}
      <Box py={{ base: 12, md: 20 }} px={{ base: 4, md: 16 }} bg="gray.50">
        <Heading
          fontSize={{ base: "2xl", md: "4xl" }}
          textAlign="center"
          mb={10}
          color="orange.400"
        >
          
        </Heading>
        <OurChefs />
      </Box>

      {/* ---------------- Footer & WhatsApp ---------------- */}
      <Footer />
      <WhatsappFloater />
    </Box>
  );
}
