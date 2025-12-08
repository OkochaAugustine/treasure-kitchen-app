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

        const articlesWithValidImages = data.news.filter(
          (item: NewsItem) => isValidImage(item.image)
        );

        if (articlesWithValidImages.length > 0) {
          setFirstArticle(articlesWithValidImages[0]);
        }
      } catch (err) {
        console.error("Failed to fetch live news:", err);
      }
    };

    fetchNews();
  }, []);

  if (!firstArticle) return null;

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md" isCentered>
      <ModalOverlay />

      <ModalContent borderRadius="lg" overflow="hidden">
        <ModalCloseButton />

        {/* AD LABEL */}
        <Box bg="orange.400" w="full" p={1}>
          <Text
            fontSize="xs"
            textAlign="center"
            color="white"
            fontWeight="bold"
            letterSpacing="1px"
          >
            ADVERTISEMENT
          </Text>
        </Box>

        <ModalBody p={0}>
          <VStack spacing={0}>
            <Image
              src={firstArticle.image}
              alt={firstArticle.title}
              objectFit="cover"
              w="full"
              h="180px"        // 🔥 SMALLER IMAGE
              fallbackSrc="/images/hero-bg.jpg"
            />

            <Box p={3} bg="orange.50" w="full">
              <Text fontSize="md" fontWeight="bold">
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
                  size="sm"
                  colorScheme="orange"
                  as="a"
                  href={firstArticle.url}
                  target="_blank"
                >
                  Read More
                </Button>
              )}

              <Button
                mt={3}
                ml={2}
                size="sm"
                colorScheme="gray"
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
