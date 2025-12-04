"use client";

import { useEffect, useState } from "react";
import { Box, Button, useToast, Text } from "@chakra-ui/react";

import HeroSection from "@/components/ui/HeroSection";
import MenuSection from "@/components/ui/MenuSection";
import WhyPeopleLoveUs from "@/components/ui/WhyPeopleLoveUs";
import FeaturesSection from "@/components/ui/FeaturesSection";
import Testimonials from "@/components/ui/Testimonials";
import OurChefs from "@/components/ui/OurChefs";
import OrderNowCTA from "@/components/ui/OrderNowCTA";
import Footer from "@/components/ui/Footer";
import WhatsappFloater from "@/components/ui/WhatsappFloater";
import Navbar from "@/components/ui/Navbar";

import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Order = {
  id: string;
  soup: string;
  plates: number;
  swallow: Record<string, number>;
  meattype: string;
  meatqty: number;
  totalprice: number;
  payment_status: string;
  created_at: string;
};

export default function HomePage() {
  const toast = useToast();

  // Replace with current user's order ID from app logic
  const [orderId, setOrderId] = useState<string | null>(
    "5aede1cc-8731-472b-9734-b35a89e32de7"
  );

  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  // Debug log
  console.log("[DEBUG] orderId:", orderId);
  console.log("[DEBUG] paymentConfirmed:", paymentConfirmed);

  // ---------------- Fetch latest order on page load ----------------
  useEffect(() => {
    const fetchLatestOrder = async () => {
      if (!orderId) return;

      const { data, error } = await supabase
        .from("order")
        .select("*")
        .eq("id", orderId)
        .single();

      if (error) {
        console.error("[DEBUG] Failed to fetch latest order:", error);
      } else {
        console.log("[DEBUG] Latest order fetched:", data);
        if (data?.payment_status === "confirmed") setPaymentConfirmed(true);
      }
    };

    fetchLatestOrder();
  }, [orderId]);

  // ---------------- Realtime subscription ----------------
  useEffect(() => {
    if (!orderId) return;

    console.log("[DEBUG] Setting up Realtime subscription...");

    const channel = supabase
      .channel(`order-${orderId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "order",
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          console.log("[DEBUG] Realtime payload received:", payload);
          const order = payload.new as Order;
          if (order.payment_status === "confirmed") {
            setPaymentConfirmed(true);

            toast({
              title: "Payment Confirmed ✅",
              description:
                "Your order and payment have been confirmed! You will receive your order shortly.",
              status: "success",
              duration: 10000,
              isClosable: true,
              position: "top-right",
            });
          }
        }
      )
      .subscribe();

    return () => {
      console.log("[DEBUG] Removing Realtime subscription...");
      supabase.removeChannel(channel);
    };
  }, [orderId, toast]);

  // ------------------ Cancel notification ----------------
  const handleCancelNotification = () => {
    setPaymentConfirmed(false);
  };

  return (
    <Box>
      <Navbar />
      <HeroSection />
      <MenuSection />
      <WhyPeopleLoveUs />
      <FeaturesSection />
      <Testimonials />
      <OurChefs />
      <OrderNowCTA />

      {/* ------------------ Payment Confirmation Screen ------------------ */}
      {paymentConfirmed && (
        <Box
          position="fixed"
          top="20%"
          left="50%"
          transform="translateX(-50%)"
          bg="green.500"
          color="white"
          p={6}
          borderRadius="lg"
          shadow="lg"
          zIndex={999}
        >
          <Text fontWeight="bold" mb={2}>
            ✅ Payment Confirmed!
          </Text>
          <Text mb={3}>
            Your order and payment have been confirmed! You will receive your
            order shortly.
          </Text>
          <Button colorScheme="red" onClick={handleCancelNotification}>
            Cancel
          </Button>
        </Box>
      )}

      <Footer />
      <WhatsappFloater />
    </Box>
  );
}
