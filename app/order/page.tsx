"use client";

import {
  Box,
  Text,
  VStack,
  Select,
  NumberInput,
  NumberInputField,
  Button,
  Card,
  CardBody,
  Input,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { PhoneIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useState, useMemo } from "react";

const PRICES = {
  soups: { nsala: 2500, banga: 2500, oha: 2500, egusi: 2500, okra: 2500, atama: 2500, afang: 2500, rice: 2000 },
  swallow: { eba: 300, fufu: 500, semovita: 500 },
  meats: { goat: 500, beef: 400, chicken: 600, fish: 800 },
};

type SoupType = keyof typeof PRICES.soups;
type MeatType = keyof typeof PRICES.meats;
type SwallowType = keyof typeof PRICES.swallow;

export default function OrderPage() {
  const [phone, setPhone] = useState("");
  const [soup, setSoup] = useState<SoupType | "">("");
  const [plates, setPlates] = useState(1);
  const [swallowQty, setSwallowQty] = useState<Record<SwallowType, number>>({ eba: 0, fufu: 0, semovita: 0 });
  const [meatType, setMeatType] = useState<MeatType | "">("");
  const [meatQty, setMeatQty] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const totalPrice = useMemo(() => {
    const soupPrice = soup ? PRICES.soups[soup] * plates : 0;
    const swallowPrice = Object.entries(swallowQty).reduce(
      (acc, [key, qty]) => acc + qty * PRICES.swallow[key as SwallowType],
      0
    );
    const meatPrice = meatType ? PRICES.meats[meatType] * meatQty : 0;
    return soupPrice + swallowPrice + meatPrice;
  }, [soup, plates, swallowQty, meatType, meatQty]);

  // Open payment modal
  const handleSubmit = () => {
    if (!phone) return alert("Please enter your phone number!");
    onOpen();
  };

  // Submit order via backend API
  const handleProceedPayment = async () => {
    const orderData = {
      phone,
      soup,
      plates,
      swallow: swallowQty,
      meattype: meatType,
      meatqty: meatQty,
      totalprice: totalPrice,
      payment_status: "pending",
      created_at: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Order submitted! Wait for admin confirmation.");
        onClose();
        setSoup(""); setPlates(1); setSwallowQty({ eba: 0, fufu: 0, semovita: 0 }); setMeatType(""); setMeatQty(0); setPhone("");
      } else {
        alert("Failed to submit order: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Unexpected error occurred.");
    }
  };

  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box position="relative" minH="100vh" py={10} px={5} bgGradient="linear(to-br, orange.50, pink.50)">
      <Box maxW="600px" mx="auto" bg="white" borderRadius="2xl" shadow="2xl" p={8}>
        <Text fontSize="4xl" fontWeight="extrabold" mb={8} textAlign="center" bgGradient="linear(to-r, orange.400, red.500)" bgClip="text">
          🍽️ Make Your Order
        </Text>

        <VStack spacing={6}>
          {/* Phone Input */}
          <Card bg={cardBg} shadow="lg" borderRadius="2xl" w="full">
            <CardBody>
              <Text fontSize="lg" fontWeight="bold" mb={2}>📱 Phone Number</Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<PhoneIcon color="orange.400" />} />
                <Input placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} size="lg" />
              </InputGroup>
            </CardBody>
          </Card>

          {/* Soup */}
          <Card bg={cardBg} shadow="lg" borderRadius="2xl" w="full">
            <CardBody>
              <Text fontSize="2xl" fontWeight="bold" mb={3}>🥣 Choose Your Soup</Text>
              <Select placeholder="Select soup" value={soup} onChange={(e) => setSoup(e.target.value as SoupType)} size="lg" icon={<ChevronDownIcon />}>
                {Object.keys(PRICES.soups).map((key) => (
                  <option key={key} value={key}>{key.toUpperCase()} - ₦{PRICES.soups[key as SoupType].toLocaleString()}</option>
                ))}
              </Select>
              <Text fontWeight="600" mb={2}>Number of Plates</Text>
              <NumberInput min={1} value={plates} size="lg" onChange={(v) => setPlates(Number(v))}><NumberInputField /></NumberInput>
            </CardBody>
          </Card>

          {/* Swallow */}
          <Card bg={cardBg} shadow="lg" borderRadius="2xl" w="full">
            <CardBody>
              <Text fontSize="2xl" fontWeight="bold" mb={3}>🍛 Swallow Options</Text>
              <VStack spacing={3} align="stretch">
                {Object.keys(swallowQty).map((key) => (
                  <Box key={key} display="flex" alignItems="center" justifyContent="space-between">
                    <Text fontWeight="600">{key.toUpperCase()} - ₦{PRICES.swallow[key as SwallowType].toLocaleString()}</Text>
                    <NumberInput min={0} value={swallowQty[key as SwallowType]} size="md" width="100px" onChange={(v) => setSwallowQty((prev) => ({ ...prev, [key]: Number(v) }))}>
                      <NumberInputField placeholder="Qty" />
                    </NumberInput>
                  </Box>
                ))}
              </VStack>
            </CardBody>
          </Card>

          {/* Meat */}
          <Card bg={cardBg} shadow="lg" borderRadius="2xl" w="full">
            <CardBody>
              <Text fontSize="2xl" fontWeight="bold" mb={3}>🍗 Choose Your Meat</Text>
              <Select placeholder="Select meat" value={meatType} onChange={(e) => setMeatType(e.target.value as MeatType)} size="lg" icon={<ChevronDownIcon />}>
                {Object.keys(PRICES.meats).map((key) => (
                  <option key={key} value={key}>{key.toUpperCase()} - ₦{PRICES.meats[key as MeatType].toLocaleString()}</option>
                ))}
              </Select>
              <NumberInput min={0} value={meatQty} size="lg" onChange={(v) => setMeatQty(Number(v))}><NumberInputField placeholder="Number of pieces" /></NumberInput>
            </CardBody>
          </Card>

          {/* Total */}
          <Box w="full" p={5} bgGradient="linear(to-r, orange.400, red.400)" color="white" borderRadius="2xl" textAlign="center" shadow="xl" fontWeight="bold" fontSize="2xl">
            Total: ₦{totalPrice.toLocaleString()}
          </Box>

          {/* Submit */}
          <Button colorScheme="orange" size="lg" w="full" borderRadius="full" py={7} fontSize="lg" shadow="lg" onClick={handleSubmit}>Submit Order 🧾</Button>
        </VStack>
      </Box>

      {/* Payment Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(5px)" />
        <ModalContent borderRadius="2xl">
          <ModalHeader>💳 Payment Information</ModalHeader>
          <ModalBody>
            <Text mb={3}>Transfer <strong>₦{totalPrice.toLocaleString()}</strong> to:</Text>
            <Text>Account Name: Treasure Kitchen Ltd</Text>
            <Text>Bank: GTBank</Text>
            <Text>Account Number: 0123456789</Text>
            <Text mt={4} fontWeight="bold">After payment, wait for the admin to confirm your payment.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" w="full" onClick={handleProceedPayment}>Proceed</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

