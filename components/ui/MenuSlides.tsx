"use client";

import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  IconButton,
  Badge,
  Button,
  Spinner,
} from "@chakra-ui/react";
import {
  PhoneIcon,
  InfoIcon,
  TimeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const MotionBox = motion(Box);

// ⭐ FOOD SLIDES
const slides = [
  {
    title: "Jollof Rice Deluxe",
    img: "/images/jollof.jpg",
    desc: "Smoky party-style Jollof served with tender grilled chicken and rich flavors.",
    tag: "🍚 Rice Meal",
  },
  {
    title: "Atama Soup Special",
    img: "/images/atama.jpg",
    desc: "A rich blend of spices, palm cream, and tender proteins — served hot & fresh.",
    tag: "⭐ Chef Special",
  },
  {
    title: "Oha Soup Royal",
    img: "/images/oha.jpg",
    desc: "Traditional Oha soup made with handpicked leaves and seasoned meats.",
    tag: "🔥 Local Dish",
  },
  {
    title: "Okra Supreme",
    img: "/images/okra.jpg",
    desc: "Delicious okra soup filled with assorted meats and premium spices.",
    tag: "🍲 Soup Delight",
  },
  {
    title: "Egusi Classic",
    img: "/images/egusi.jpg",
    desc: "Nutty Egusi soup bursting with rich flavor and garnished with beef and fish.",
    tag: "⭐ Chef Special",
  },
  {
    title: "Afang Perfection",
    img: "/images/afang.jpg",
    desc: "Fresh Afang leaves blended with rich broth and assorted proteins.",
    tag: "🔥 Nigerian Favourite",
  },
  {
    title: "Vegetable Harmony",
    img: "/images/vegetable.jpg",
    desc: "Perfect balance of fresh vegetables and seasoned meats for a healthy bite.",
    tag: "🥗 Healthy Option",
  },
];

// ⭐ NEAREST RIDERS DATA (SIMULATED NEAR YOU)
const userLocation = { lat: 7.5052, lng: 5.0615 }; // Your location

const riders = [
  {
    name: "Rider A",
    phone: "08026394187",
    lat: 7.5100,
    lng: 5.0650,
    status: "Available",
  },
  {
    name: "Rider B",
    phone: "08034567890",
    lat: 7.5200,
    lng: 5.0500,
    status: "Busy",
  },
  {
    name: "Rider C",
    phone: "08098765432",
    lat: 7.5000,
    lng: 5.0700,
    status: "Available",
  },
];

// 🧮 Haversine formula to calculate distance
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

export default function MenuSlides() {
  const [[index, direction], setIndex] = useState([0, 0]);
  const [ridersWithDistance, setRidersWithDistance] = useState<any[]>([]);

  // Slider navigation
  const slideTo = (newDirection: number) => {
    setIndex(([prev]) => {
      const next = (prev + newDirection + slides.length) % slides.length;
      return [next, newDirection];
    });
  };

  useEffect(() => {
    const interval = setInterval(() => slideTo(1), 5000);
    return () => clearInterval(interval);
  }, []);

  // Calculate riders distance from user
  useEffect(() => {
    const updated = riders.map((r) => ({
      ...r,
      distance: getDistanceFromLatLonInKm(userLocation.lat, userLocation.lng, r.lat, r.lng),
    }));
    setRidersWithDistance(updated.sort((a, b) => a.distance - b.distance));
  }, []);

  // Slider animation variants
  const variants = {
    enter: (direction: number) => ({
      opacity: 0,
      scale: 0.85,
      x: direction > 0 ? 180 : -180,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
    exit: (direction: number) => ({
      opacity: 0,
      scale: 0.85,
      x: direction < 0 ? 180 : -180,
      transition: { duration: 0.5, ease: "easeIn" },
    }),
  };

  return (
    <Box>
      {/* FOOD SLIDER */}
      <Box position="relative" w="100%" h={{ base: "520px", md: "680px" }} overflow="hidden" bg="black">
        <AnimatePresence initial={false} custom={direction}>
          <MotionBox
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            position="absolute"
            top="0"
            w="100%"
            h="100%"
          >
            <Image
              src={slides[index].img}
              alt={slides[index].title}
              w="100%"
              h="100%"
              objectFit="cover"
              filter="brightness(55%)"
            />

            <VStack
              position="absolute"
              bottom="18%"
              left="50%"
              transform="translateX(-50%)"
              color="white"
              textAlign="center"
              spacing={4}
              px={6}
            >
              <Badge
                fontSize="md"
                px={4}
                py={1}
                borderRadius="full"
                bg="orange.400"
                color="white"
                boxShadow="0px 0px 12px rgba(255,140,0,0.7)"
              >
                {slides[index].tag}
              </Badge>

              <Text
                fontSize={{ base: "2.5xl", md: "4.5xl" }}
                fontWeight="extrabold"
                textShadow="0px 4px 14px rgba(0,0,0,0.7)"
              >
                {slides[index].title}
              </Text>

              <Text fontSize={{ base: "md", md: "xl" }} maxW="600px" opacity={0.9}>
                {slides[index].desc}
              </Text>
            </VStack>
          </MotionBox>
        </AnimatePresence>

        {/* SLIDER ARROWS */}
        <IconButton
          aria-label="Previous"
          icon={<ChevronLeftIcon boxSize={8} />}
          position="absolute"
          top="50%"
          left="20px"
          transform="translateY(-50%)"
          color="white"
          bg="rgba(0,0,0,0.4)"
          _hover={{ bg: "rgba(0,0,0,0.7)" }}
          onClick={() => slideTo(-1)}
          size="lg"
        />
        <IconButton
          aria-label="Next"
          icon={<ChevronRightIcon boxSize={8} />}
          position="absolute"
          top="50%"
          right="20px"
          transform="translateY(-50%)"
          color="white"
          bg="rgba(0,0,0,0.4)"
          _hover={{ bg: "rgba(0,0,0,0.7)" }}
          onClick={() => slideTo(1)}
          size="lg"
        />

        {/* SLIDER DOTS */}
        <HStack position="absolute" bottom="25px" left="50%" transform="translateX(-50%)" spacing={2}>
          {slides.map((_, i) => (
            <Box
              key={i}
              w={i === index ? "14px" : "8px"}
              h={i === index ? "14px" : "8px"}
              bg={i === index ? "orange.400" : "whiteAlpha.600"}
              borderRadius="50%"
              transition="0.3s"
              boxShadow={i === index ? "0px 0px 10px orange" : ""}
            />
          ))}
        </HStack>
      </Box>

      {/* NEAREST RIDERS */}
      <Box p={6} bg="gray.50">
        <Text fontSize="2xl" fontWeight="bold" mb={6} color="orange.600">
          🚴 Nearest Dispatch Riders
        </Text>

        {!ridersWithDistance.length ? (
          <Spinner size="xl" color="orange.400" />
        ) : (
          <VStack spacing={5}>
            {ridersWithDistance.map((rider) => (
              <Box
                key={rider.phone}
                p={5}
                borderRadius="xl"
                shadow="lg"
                bg="white"
                w="full"
                _hover={{ transform: "scale(1.02)", transition: "0.3s" }}
              >
                <VStack align="start" spacing={2}>
                  <Text fontSize="lg" fontWeight="bold" color="orange.500">
                    {rider.name}
                  </Text>

                  <HStack>
                    <PhoneIcon color="green.500" />
                    <Text>{rider.phone}</Text>
                  </HStack>

                  <HStack>
                    <InfoIcon color={rider.status === "Available" ? "green.400" : "red.400"} />
                    <Text>{rider.status}</Text>
                  </HStack>

                  <HStack>
                    <TimeIcon color="blue.400" />
                    <Text>{rider.distance.toFixed(2)} km away</Text>
                  </HStack>

                  <Button
                    colorScheme="orange"
                    size="sm"
                    onClick={() => window.open(`tel:${rider.phone}`)}
                  >
                    Call Rider
                  </Button>
                </VStack>
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    </Box>
  );
}


