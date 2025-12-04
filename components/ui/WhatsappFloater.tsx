"use client";

import { Box, IconButton, Text, HStack, useBreakpointValue } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import { keyframes } from "@emotion/react";

export default function WhatsappFloater() {
  // Floating animation
  const float = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0px); }
  `;

  // Responsive text size
  const textSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Box
      position="fixed"
      bottom={{ base: "20px", md: "30px" }}
      right={{ base: "10px", md: "30px" }}
      zIndex={50}
      animation={`${float} 2s ease-in-out infinite`}
    >
      <HStack
        spacing={3}
        bg="whatsapp.500"
        color="white"
        p={{ base: 2, md: 3 }}
        borderRadius="full"
        boxShadow="lg"
        _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
      >
        <IconButton
          as="a"
          href="https://wa.me/234XXXXXXXXXX" // replace with your company WhatsApp
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          icon={<FaWhatsapp />}
          size="md"
          colorScheme="whatsapp"
          isRound
        />
        <Text fontSize={textSize} fontWeight="bold" whiteSpace="nowrap">
          Contact us on WhatsApp
        </Text>
      </HStack>
    </Box>
  );
}
