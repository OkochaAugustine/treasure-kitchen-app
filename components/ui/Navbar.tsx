"use client";

import {
  Box,
  Flex,
  HStack,
  Image,
  Spacer,
  Text,
  Button,
  IconButton,
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const router = useRouter();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Riders", href: "/riders" },
  ];

  return (
    <Flex
      as="nav"
      w="full"
      px={{ base: 4, md: 16 }}
      py={4}
      align="center"
      bg="white"
      shadow="sm"
      position="sticky"
      top={0}
      zIndex={100}
    >
      <HStack spacing={4}>
        <Image
          src="/images/logo.png"
          alt="Treasure Kitchen"
          boxSize={{ base: "60px", md: "80px" }}
          objectFit="contain"
          cursor="pointer"
          onClick={() => router.push("/")}
        />
      </HStack>

      <Spacer />

      {!isMobile ? (
        <HStack spacing={6}>
          {navLinks.map((link) => (
            <Text
              key={link.label}
              fontSize="lg"
              fontWeight="500"
              cursor="pointer"
              position="relative"
              transition="color 0.3s"
              _after={{
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "0%",
                height: "2px",
                bg: "orange.400",
                transition: "width 0.3s ease",
              }}
              _hover={{
                color: "orange.400",
                _after: { width: "100%" },
              }}
              onClick={() => router.push(link.href)}
            >
              {link.label}
            </Text>
          ))}
          {/* Desktop Order Now button */}
          <Button
            colorScheme="orange"
            bg="orange.400"
            _hover={{ bg: "orange.500", transform: "scale(1.05)" }}
            transition="all 0.2s"
            onClick={() => router.push("/order")} // <-- Navigate to order page
          >
            Order Now
          </Button>
        </HStack>
      ) : (
        <>
          <IconButton
            aria-label="Menu"
            icon={<HamburgerIcon />}
            variant="outline"
            onClick={onOpen}
          />
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody mt={10}>
                <VStack spacing={4} align="start">
                  {navLinks.map((link) => (
                    <Button
                      key={link.label}
                      w="full"
                      variant="ghost"
                      onClick={() => {
                        router.push(link.href);
                        onClose();
                      }}
                    >
                      {link.label}
                    </Button>
                  ))}
                  {/* Mobile Order Now button */}
                  <Button
                    w="full"
                    colorScheme="orange"
                    onClick={() => {
                      router.push("/order");
                      onClose();
                    }}
                  >
                    Order Now
                  </Button>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </Flex>
  );
}
