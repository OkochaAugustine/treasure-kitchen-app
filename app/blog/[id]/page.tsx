"use client";

import {
  Box,
  VStack,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Stack,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import WhatsappFloater from "@/components/ui/WhatsappFloater";

type Article = {
  id: number;
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
};

const articles: Article[] = [
  {
    id: 1,
    title: "5 Tips for Perfect Nigerian Soups",
    content:
      "Discover the secrets to perfect Nigerian soups. Start with fresh ingredients, use the right stock, and balance your spices. Simmer slowly for the best flavor. Garnish with herbs for aroma and presentation. Enjoy with fufu or your preferred swallow.",
    image: "/images/blog1.jpg",
    author: "Chef Okocha",
    date: "Dec 8, 2025",
  },
  {
    id: 2,
    title: "Mastering the Art of Fufu",
    content:
      "Making perfect fufu requires patience and practice. Boil your chosen starch, stir vigorously to remove lumps, and shape using lightly oiled hands. Serve with rich soups for a complete experience.",
    image: "/images/blog2.jpg",
    author: "Chef Ada",
    date: "Dec 5, 2025",
  },
  {
    id: 3,
    title: "Top 10 Quick Nigerian Recipes",
    content:
      "For busy days, try these 10 quick Nigerian recipes. They are fast, easy, and maintain authentic flavors. From one-pot stews to simple snacks, these dishes bring convenience without compromising taste.",
    image: "/images/blog3.jpg",
    author: "Chef Emeka",
    date: "Dec 1, 2025",
  },
];

const popularArticles = [
  { id: 2, title: "Mastering the Art of Fufu" },
  { id: 3, title: "Top 10 Quick Nigerian Recipes" },
  { id: 1, title: "5 Tips for Perfect Nigerian Soups" },
];

interface BlogArticleProps {
  params: { id: string };
}

export default function BlogArticlePage({ params }: BlogArticleProps) {
  const articleId = parseInt(params.id, 10);
  const article = articles.find((a) => a.id === articleId) || articles[0];
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box>
      {/* ---------------- Navbar ---------------- */}
      <Navbar />

      {/* ---------------- Hero Section ---------------- */}
      <Box
        w="full"
        h={{ base: "250px", md: "400px" }}
        bgImage={article.image}
        bgSize="cover"
        bgPosition="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack
          bg="rgba(0,0,0,0.5)"
          p={{ base: 4, md: 8 }}
          borderRadius="md"
          spacing={2}
          textAlign="center"
          color="white"
        >
          <Heading fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold">
            {article.title}
          </Heading>
          <Text fontSize={{ base: "sm", md: "md" }} color="gray.200">
            By {article.author} | {article.date}
          </Text>
        </VStack>
      </Box>

      {/* ---------------- Article Content with Sidebar ---------------- */}
      <Box py={{ base: 8, md: 16 }} px={{ base: 4, md: 16 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {/* Main content */}
          <Box gridColumn={{ base: "span 1", md: "span 2" }}>
            <Text fontSize={{ base: "md", md: "lg" }} mb={4} color="gray.700">
              {article.content}
            </Text>
            <Divider my={6} />
            <Heading fontSize="xl" mb={3} color="orange.400">
              Related Recipes
            </Heading>
            <VStack spacing={3} align="start">
              {popularArticles
                .filter((a) => a.id !== article.id)
                .map((a) => (
                  <Text
                    key={a.id}
                    fontSize="md"
                    cursor="pointer"
                    _hover={{ color: "orange.400", textDecoration: "underline" }}
                  >
                    {a.title}
                  </Text>
                ))}
            </VStack>
          </Box>

          {/* Sidebar */}
          {!isMobile && (
            <Box>
              <Heading fontSize="xl" mb={4} color="orange.400">
                Popular Recipes
              </Heading>
              <VStack align="start" spacing={3}>
                {popularArticles.map((a) => (
                  <Text
                    key={a.id}
                    fontSize="md"
                    cursor="pointer"
                    _hover={{ color: "orange.400", textDecoration: "underline" }}
                  >
                    {a.title}
                  </Text>
                ))}
              </VStack>
            </Box>
          )}
        </SimpleGrid>
      </Box>

      {/* ---------------- Footer & WhatsApp ---------------- */}
      <Footer />
      <WhatsappFloater />
    </Box>
  );
}
