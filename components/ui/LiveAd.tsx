"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

type NewsItem = {
  title: string;
  image: string;
  description?: string;
  url?: string;
};

// Simple helper to check if image URL is valid
const isValidImage = (url: string) => url && url.startsWith("http");

export default function LiveAd() {
  const [isOpen, setIsOpen] = useState(true);
  const [firstArticle, setFirstArticle] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/live-news");
        const data = await res.json();

        if (!data.news || !Array.isArray(data.news)) return;

        // Only keep articles with a valid image URL
        const articlesWithValidImages = data.news.filter(
          (item: NewsItem) => isValidImage(item.image)
        );

        if (articlesWithValidImages.length > 0) {
          setFirstArticle(articlesWithValidImages[0]);
        } else {
          console.warn("No articles with valid images found");
        }
      } catch (err) {
        console.error("Failed to fetch live news:", err);
      }
    };

    fetchNews();
  }, []);

  if (!firstArticle) return null;

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="xl" overflow="hidden">
        <ModalCloseButton />
        <ModalBody p={0}>
          <VStack spacing={0}>
            <Image
              src={firstArticle.image}
              alt={firstArticle.title}
              objectFit="cover"
              w="full"
              h="300px"
              fallbackSrc="/images/hero-bg.jpg" // fallback in case image is broken
            />
            <Box p={4} bg="orange.50" w="full">
              <Text fontSize="lg" fontWeight="bold">
                {firstArticle.title}
              </Text>
              {firstArticle.description && (
                <Text mt={2} fontSize="sm" color="gray.700">
                  {firstArticle.description}
                </Text>
              )}
              {firstArticle.url && (
                <Button
                  mt={3}
                  colorScheme="orange"
                  as="a"
                  href={firstArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </Button>
              )}
              <Button mt={3} ml={2} colorScheme="gray" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
