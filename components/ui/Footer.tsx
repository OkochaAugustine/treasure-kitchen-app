"use client";

import { Box, VStack, HStack, Text, Link, Icon, Stack, Divider } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <Box bg="gray.900" color="white" py={12} px={{ base: 6, md: 20 }}>
      <VStack spacing={8} align="start">
        <Text fontSize="2xl" fontWeight="bold" color="orange.400">
          Treasure Kitchen
        </Text>
        <Text maxW="3xl">
          Taste the difference with Treasure Kitchen. Fresh meals, fast delivery, and authentic flavors straight to your doorstep.
        </Text>
        <HStack spacing={6}>
          <Link href="#" isExternal>
            <Icon as={FaFacebook} w={6} h={6} />
          </Link>
          <Link href="#" isExternal>
            <Icon as={FaInstagram} w={6} h={6} />
          </Link>
          <Link href="#" isExternal>
            <Icon as={FaTwitter} w={6} h={6} />
          </Link>
        </HStack>

        {/* Phone and Address */}
        <VStack align="start" spacing={1}>
          <Text fontSize="md">
            📞 Phone: <Link href="tel:09066534666" textDecor="underline">09066534666</Link>
          </Text>
          <Text fontSize="md">
            📍 Address: Asaba, Delta State, Behind Jamb Office, Opkanam Road
          </Text>
        </VStack>
      </VStack>

      <Divider my={6} borderColor="gray.700" />

      <Stack
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "start", md: "center" }}
      >
        <Text fontSize="sm">© {new Date().getFullYear()} Treasure Kitchen. All rights reserved.</Text>
        <HStack spacing={4} fontSize="sm">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </HStack>
      </Stack>
    </Box>
  );
}
