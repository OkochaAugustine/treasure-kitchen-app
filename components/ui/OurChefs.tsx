// components/ui/OurChefs.tsx
"use client";

import {
  Box,
  VStack,
  Text,
  SimpleGrid,
  HStack,
  Icon,
} from "@chakra-ui/react";
import {
  GiKnifeFork,
  GiCookingPot,
  GiHealthPotion,
  GiFireBowl,
  GiHotMeal,
} from "react-icons/gi";

export default function OurChefs() {
  const textColor = "white"; // FORCE WHITE TEXT ALWAYS

  return (
    <Box
      as="section"
      position="relative"
      py={{ base: 12, md: 20 }}
      px={4}
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgImage: "url('/images/foodbg.jpg')",
        bgSize: "cover",
        bgPosition: "center",
        bgRepeat: "no-repeat",
        filter: "blur(6px) brightness(0.55)",
        zIndex: 0,
      }}
    >
      <Box position="relative" zIndex={1}>
        {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
        {/*                     EGUSI SOUP SECTION                       */}
        {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

        <VStack spacing={4} textAlign="center" mb={10}>
          <Text
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="extrabold"
            color="white"
            textShadow="2px 2px 10px rgba(0,0,0,0.9)"
          >
            The Magic Behind Egusi Soup
          </Text>

          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="white"
            maxW="3xl"
            textShadow="1px 1px 6px rgba(0,0,0,0.9)"
          >
            Learn how this traditional African delicacy nourishes the body and
            delights the senses.
          </Text>
        </VStack>

        <SimpleGrid columns={2} spacing={6} maxW="6xl" mx="auto">
          {/* VIDEO */}
          <Box borderRadius="2xl" overflow="hidden" shadow="2xl">
            <video
              src="/videos/Egusi.mp4"
              autoPlay
              loop
              muted
              controls
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "500px",
                borderRadius: "1rem",
                objectFit: "cover",
              }}
            />
          </Box>

          {/* TEXT */}
          <VStack align="start" spacing={6}>
            <HStack spacing={4} align="start">
              <Icon as={GiCookingPot} w={7} h={7} color="orange.400" mt={1} />
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color={textColor}
                textShadow="1px 1px 10px rgba(0,0,0,1)"
              >
                <b>Preparation:</b> Made from blended melon seeds cooked with
                palm oil, vegetables, assorted meats, and native spices for a
                deeply rich, nutty flavor.
              </Text>
            </HStack>

            <HStack spacing={4} align="start">
              <Icon as={GiKnifeFork} w={7} h={7} color="orange.400" mt={1} />
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color={textColor}
                textShadow="1px 1px 10px rgba(0,0,0,1)"
              >
                <b>Serving:</b> Perfect with fufu, pounded yam, semo, or rice —
                satisfying, flavorful, and heart-warming.
              </Text>
            </HStack>

            <HStack spacing={4} align="start">
              <Icon as={GiHealthPotion} w={7} h={7} color="orange.400" mt={1} />
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color={textColor}
                textShadow="1px 1px 10px rgba(0,0,0,1)"
              >
                <b>Benefits:</b> Nutrient-dense with proteins, healthy fats and
                essential minerals that strengthen the body.
              </Text>
            </HStack>
          </VStack>
        </SimpleGrid>

        {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
        {/*                     OKRA SOUP SECTION                        */}
        {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

        <VStack spacing={4} textAlign="center" mt={20} mb={10}>
          <Text
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="extrabold"
            color="white"
            textShadow="2px 2px 10px rgba(0,0,0,0.9)"
          >
            The Delight of Okra Soup
          </Text>

          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="white"
            maxW="3xl"
            textShadow="1px 1px 6px rgba(0,0,0,0.9)"
          >
            A smooth, nutritious soup known for its freshness and digestive
            benefits.
          </Text>
        </VStack>

        <SimpleGrid columns={2} spacing={6} maxW="6xl" mx="auto">
          {/* VIDEO */}
          <Box borderRadius="2xl" overflow="hidden" shadow="2xl">
            <video
              src="/videos/Okra.mp4"
              autoPlay
              loop
              muted
              controls
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "500px",
                borderRadius: "1rem",
                objectFit: "cover",
              }}
            />
          </Box>

          {/* TEXT */}
          <VStack align="start" spacing={6}>
            <HStack spacing={4} align="start">
              <Icon as={GiHotMeal} w={7} h={7} color="orange.400" mt={1} />
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color={textColor}
                textShadow="1px 1px 10px rgba(0,0,0,1)"
              >
                <b>Preparation:</b> Fresh okra simmered with palm oil,
                vegetables, seafood or beef, creating a silky and nutritious
                texture.
              </Text>
            </HStack>

            <HStack spacing={4} align="start">
              <Icon as={GiKnifeFork} w={7} h={7} color="orange.400" mt={1} />
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color={textColor}
                textShadow="1px 1px 10px rgba(0,0,0,1)"
              >
                <b>Serving:</b> Enjoy with garri, fufu, amala, or semo — smooth,
                light, and satisfying.
              </Text>
            </HStack>

            <HStack spacing={4} align="start">
              <Icon as={GiHealthPotion} w={7} h={7} color="orange.400" mt={1} />
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color={textColor}
                textShadow="1px 1px 10px rgba(0,0,0,1)"
              >
                <b>Benefits:</b> Supports digestion, boosts immunity, and is
                rich in antioxidants and vitamins.
              </Text>
            </HStack>
          </VStack>
        </SimpleGrid>

        {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
        {/*                     BANGA SOUP SECTION                       */}
        {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

        <VStack spacing={4} textAlign="center" mt={20} mb={10}>
          <Text
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="extrabold"
            color="white"
            textShadow="2px 2px 10px rgba(0,0,0,0.9)"
          >
            The Royal Taste of Banga Soup
          </Text>

          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="white"
            maxW="3xl"
            textShadow="1px 1px 6px rgba(0,0,0,0.9)"
          >
            A luxurious palm-fruit delicacy loved for its deep flavor and
            nourishing strength.
          </Text>
        </VStack>

        <SimpleGrid columns={2} spacing={6} maxW="6xl" mx="auto">
          {/* VIDEO */}
          <Box borderRadius="2xl" overflow="hidden" shadow="2xl">
            <video
              src="/videos/Banga.mp4"
              autoPlay
              loop
              muted
              controls
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "500px",
                borderRadius: "1rem",
                objectFit: "cover",
              }}
            />
          </Box>

          {/* TEXT */}
          <VStack align="start" spacing={6}>
            <HStack spacing={4} align="start">
              <Icon as={GiFireBowl} w={7} h={7} color="orange.400" mt={1} />
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color={textColor}
                textShadow="1px 1px 10px rgba(0,0,0,1)"
              >
                <b>Preparation:</b> Made from boiled palm nuts blended with
                indigenous spices, fresh fish, beef, and unique Niger-Delta
                seasonings.
              </Text>
            </HStack>

            <HStack spacing={4} align="start">
              <Icon as={GiKnifeFork} w={7} h={7} color="orange.400" mt={1} />
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color={textColor}
                textShadow="1px 1px 10px rgba(0,0,0,1)"
              >
                <b>Serving:</b> Best paired with starch, fufu, or pounded yam —
                thick, aromatic, and deeply satisfying.
              </Text>
            </HStack>

            <HStack spacing={4} align="start">
              <Icon as={GiHealthPotion} w={7} h={7} color="orange.400" mt={1} />
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color={textColor}
                textShadow="1px 1px 10px rgba(0,0,0,1)"
              >
                <b>Benefits:</b> Rich in natural oils, vitamins, antioxidants
                and essential nutrients that strengthen and energize the body.
              </Text>
            </HStack>
          </VStack>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
