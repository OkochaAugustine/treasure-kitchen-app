"use client";

import {
  Box,
  VStack,
  Text,
  Button,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaWhatsapp, FaPhoneAlt, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function OrderNowCTA() {
  const textColor = useColorModeValue("white", "white");
  const router = useRouter();

  // No session logic needed here, middleware handles it
  const handleOrderNow = () => {
    router.push("/order"); // middleware will redirect to /register if needed
  };

  return (
    <Box
      as="section"
      py={{ base: 16, md: 24 }}
      px={6}
      bgImage="url('/images/foodbg.jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        bg: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(3px)",
      }}
    >
      <VStack
        spacing={6}
        position="relative"
        zIndex={2}
        textAlign="center"
        maxW="3xl"
        mx="auto"
        color={textColor}
      >
        <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold">
          Ready to Taste Real African Goodness?
        </Text>

        <Text fontSize={{ base: "md", md: "xl" }} opacity={0.9}>
          Freshly prepared meals delivered HOT and FAST to your doorstep.
          Choose your favorite dish and place your order now.
        </Text>

        <HStack spacing={4} flexWrap="wrap" justify="center">
          <Button
            size="lg"
            colorScheme="green"
            leftIcon={<FaWhatsapp />}
            px={8}
            py={6}
            fontSize="lg"
            borderRadius="full"
            onClick={() =>
              (window.location.href = "https://wa.me/+2349066534666")
            }
          >
            Order on WhatsApp
          </Button>

          <Button
            size="lg"
            colorScheme="orange"
            leftIcon={<FaPhoneAlt />}
            px={8}
            py={6}
            fontSize="lg"
            borderRadius="full"
            onClick={() => (window.location.href = "tel:+2349066534666")}
          >
            Call to Order
          </Button>

          <Button
            size="lg"
            variant="outline"
            border="2px solid white"
            color="white"
            leftIcon={<FaArrowRight />}
            px={8}
            py={6}
            fontSize="lg"
            borderRadius="full"
            _hover={{
              bg: "whiteAlpha.300",
            }}
            onClick={handleOrderNow} // middleware handles redirect
          >
            Order Now
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
