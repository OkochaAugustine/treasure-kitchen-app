"use client";

import { useEffect, useState } from "react";
import { Box, Text, VStack, Badge, useToast } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase (public URL + anon key for client)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Order = {
  id: string;
  phone: string;
  soup: string;
  plates: number;
  swallow: Record<string, number>;
  meattype: string;
  meatqty: number;
  totalprice: number;
  payment_status: string;
  created_at: string;
};

export default function NotificationsPage() {
  const toast = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [userOrderIds, setUserOrderIds] = useState<string[]>([]); // User's order IDs

  useEffect(() => {
    // Fetch user's orders on mount
    const fetchUserOrders = async () => {
      try {
        const res = await fetch("/api/orders/my-orders"); // your endpoint to fetch current user's orders
        const data = await res.json();
        if (data.orders) {
          setOrders(data.orders);
          setUserOrderIds(data.orders.map((o: Order) => o.id));
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchUserOrders();
  }, []);

  useEffect(() => {
    if (userOrderIds.length === 0) return;

    // Subscribe to updates for each order
    const subscriptions = userOrderIds.map((orderId) =>
      supabase
        .channel(`order-${orderId}`)
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "order", filter: `id=eq.${orderId}` },
          (payload) => {
            const updatedOrder = payload.new as Order; // cast to Order

            if (updatedOrder.payment_status === "confirmed") {
              toast({
                title: "Payment Confirmed ✅",
                description: `Your order ${orderId} has been confirmed!`,
                status: "success",
                duration: 8000,
                isClosable: true,
                position: "top-right",
              });

              // Update the order in state
              setOrders((prev) => {
                const otherOrders = prev.filter((o) => o.id !== orderId);
                return [...otherOrders, updatedOrder];
              });
            }
          }
        )
        .subscribe()
    );

    // Cleanup subscriptions on unmount
    return () => {
      subscriptions.forEach((sub) => supabase.removeChannel(sub));
    };
  }, [userOrderIds, toast]);

  return (
    <Box p={10}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        🛎️ Notifications
      </Text>

      {orders.length === 0 && <Text>No orders yet.</Text>}

      <VStack spacing={4} align="stretch">
        {orders
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .map((order) => (
            <Box
              key={order.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              bg={order.payment_status === "confirmed" ? "green.50" : "orange.50"}
            >
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold">Order ID: {order.id}</Text>
                <Text>Soup: {order.soup} x {order.plates}</Text>
                <Text>
                  Swallow: {Object.entries(order.swallow).map(([k, v]) => `${k.toUpperCase()}:${v}`).join(", ")}
                </Text>
                <Text>Meat: {order.meattype} x {order.meatqty}</Text>
                <Text fontWeight="bold">Total: ₦{order.totalprice.toLocaleString()}</Text>
                <Badge colorScheme={order.payment_status === "confirmed" ? "green" : "orange"}>
                  {order.payment_status.toUpperCase()}
                </Badge>
              </VStack>
            </Box>
          ))}
      </VStack>
    </Box>
  );
}
