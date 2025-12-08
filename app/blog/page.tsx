"use client";

import { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Spinner,
  Center,
  Button,
  HStack,
  Tag,
} from "@chakra-ui/react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import WhatsappFloater from "@/components/ui/WhatsappFloater";
import { createClient } from "@supabase/supabase-js";

// ---------------- Initialize Supabase client ----------------
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Article = {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  category?: string;
  created_at?: string;
  author?: string;
};

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from("recipes")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Supabase fetch error:", error.message || error);
        } else if (data) {
          setArticles(data as Article[]);
        }
      } catch (err) {
        console.error("Unexpected fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <Box>
      <Navbar />

      {/* Hero Section */}
      <Box
        w="full"
        h={{ base: "300px", md: "500px" }}
        bgImage="url('/images/blog-hero.jpg')"
        bgSize="cover"
        bgPosition="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={4} bg="rgba(0,0,0,0.5)" p={8} borderRadius="md">
          <Heading color="white" fontSize={{ base: "3xl", md: "5xl" }}>
            Our Culinary Insights
          </Heading>
          <Text color="white" fontSize={{ base: "md", md: "xl" }}>
            Delicious recipes, tips, and food stories from Treasure Kitchen
          </Text>
        </VStack>
      </Box>

      {/* Articles Section */}
      <Box py={12} px={{ base: 4, md: 16 }}>
        {loading ? (
          <Center>
            <Spinner size="xl" color="orange.400" />
          </Center>
        ) : articles.length === 0 ? (
          <Center>
            <Text fontSize="xl" color="gray.500">
              No articles found.
            </Text>
          </Center>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {articles.map((article) => (
              <Box
                key={article.id}
                borderRadius="xl"
                shadow="lg"
                overflow="hidden"
                bg="white"
                transition="transform 0.3s, box-shadow 0.3s"
                _hover={{ transform: "scale(1.03)", boxShadow: "2xl" }}
              >
                {article.image_url && (
                  <Image
                    src={article.image_url}
                    alt={article.title}
                    h="200px"
                    w="full"
                    objectFit="cover"
                    loading="lazy"
                  />
                )}
                <Box p={6}>
                  <HStack spacing={2} mb={2}>
                    {article.category && (
                      <Tag colorScheme="orange">{article.category}</Tag>
                    )}
                    {article.created_at && (
                      <Text fontSize="xs" color="gray.400">
                        {new Date(article.created_at).toLocaleDateString()}
                      </Text>
                    )}
                  </HStack>
                  <Heading fontSize="xl" mb={2} color="orange.400">
                    {article.title}
                  </Heading>
                  {article.author && (
                    <Text fontSize="sm" color="gray.500" mb={2}>
                      By {article.author}
                    </Text>
                  )}
                  <Text fontSize="sm" color="gray.600" noOfLines={4}>
                    {article.content}
                  </Text>
                  <Button
                    mt={4}
                    colorScheme="orange"
                    size="sm"
                    onClick={() =>
                      alert("Navigate to full article page for " + article.title)
                    }
                  >
                    Read More
                  </Button>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Box>

      <Footer />
      <WhatsappFloater />
    </Box>
  );
}
