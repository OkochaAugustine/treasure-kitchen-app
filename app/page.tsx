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
import LiveAd from "@/components/ui/LiveAd"; // <-- updated, no props needed

import { createClient } from "@supabase/supabase-js";

// ---------------- Initialize Supabase client ----------------
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Notification = {
  id: string;
  phone: string;
  message: string;
  created_at: string;
};

export default function HomePage() {
  const toast = useToast();

  const [userPhone, setUserPhone] = useState("08026394187");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // ---------------- Fetch existing notifications ----------------
  useEffect(() => {
    if (!userPhone) return;

    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("phone", userPhone)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to fetch notifications:", error);
        return;
      }

      setNotifications(data || []);

      data?.forEach((n) => {
        toast({
          title: "Notification",
          description: n.message,
          status: "info",
          duration: 10000,
          isClosable: true,
          position: "top-right",
        });
      });
    };

    fetchNotifications();
  }, [userPhone, toast]);

  // ---------------- Realtime subscription ----------------
  useEffect(() => {
    if (!userPhone) return;

    const channel = supabase
      .channel("notification-channel-" + userPhone)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `phone=eq.${userPhone}`,
        },
        (payload) => {
          const newNotification = payload.new as Notification;

          setNotifications((prev) => [newNotification, ...prev]);

          toast({
            title: "New Notification",
            description: newNotification.message,
            status: "info",
            duration: 10000,
            isClosable: true,
            position: "top-right",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userPhone, toast]);

  // ---------------- Mark all notifications as read ----------------
  const markAllRead = async () => {
    if (notifications.length === 0) return;

    const ids = notifications.map((n) => n.id);

    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .in("id", ids);

    if (error) {
      console.error("Failed to mark notifications as read:", error);
      return;
    }

    setNotifications([]);
  };

  return (
    <Box>
      <Navbar />

      {/* ---------------- Live Ad ---------------- */}
      <LiveAd />

      <HeroSection />
      <MenuSection />
      <WhyPeopleLoveUs />
      <FeaturesSection />
      <Testimonials />
      <OurChefs />
      <OrderNowCTA />

      {/* ---------------- Notification Panel ---------------- */}
      {notifications.length > 0 && (
        <Box
          position="fixed"
          top="12%"
          right="2%"
          width="300px"
          maxHeight="80vh"
          overflowY="auto"
          bg="white"
          shadow="xl"
          borderRadius="md"
          p={4}
          zIndex={9999}
        >
          <Text fontWeight="bold" mb={2} fontSize="lg">
            Notifications
          </Text>

          <Button
            size="sm"
            mb={3}
            colorScheme="green"
            variant="solid"
            onClick={markAllRead}
          >
            Mark all as read
          </Button>

          {notifications.map((n) => (
            <Box
              key={n.id}
              p={3}
              mb={2}
              borderRadius="md"
              bg="gray.100"
              shadow="sm"
              fontSize="sm"
            >
              {n.message}
            </Box>
          ))}
        </Box>
      )}

      <Footer />
      <WhatsappFloater />
    </Box>
  );
}
