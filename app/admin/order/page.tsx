"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/react";

type Order = {
  id: string;
  phone: string;
  location: string; // Added location
  soup: string;
  plates: number;
  swallow: Record<string, number>;
  meattype: string;
  meatqty: number;
  totalprice: number;
  payment_status: string;
  created_at: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const toast = useToast();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();

      if (data.orders) {
        setOrders(data.orders);
      } else {
        console.warn("No orders returned from API", data);
      }
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  const confirmPayment = async (orderId: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId }),
      });

      const result = await res.json();

      if (res.ok) {
        toast({
          title: "Payment confirmed",
          description:
            "Customer will receive notification and order will be processed.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        fetchOrders();
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to confirm payment",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Unexpected error",
        description: "Could not confirm payment",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading)
    return <Spinner size="xl" mt={20} mx="auto" display="block" />;

  return (
    <Box p={10}>
      <Text fontSize="3xl" fontWeight="bold" mb={6}>
        🧾 Admin Orders
      </Text>

      {orders.length === 0 && <Text>No orders yet.</Text>}

      <VStack spacing={5} align="stretch">
        {orders.map((order) => (
          <Box
            key={order.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="xl"
            bg="white"
          >
            <HStack justifyContent="space-between" mb={2}>
              <Text fontWeight="bold">{order.phone}</Text>
              <Badge
                colorScheme={
                  order.payment_status === "pending" ? "orange" : "green"
                }
              >
                {order.payment_status.toUpperCase()}
              </Badge>
            </HStack>

            <Text>📍 Location: {order.location || "Not provided"}</Text>
            <Text>🥣 Soup: {order.soup} x {order.plates}</Text>
            <Text>
              🍛 Swallow: {Object.entries(order.swallow || {})
                .map(([k, v]) => `${k.toUpperCase()}:${v}`)
                .join(", ")}
            </Text>
            <Text>🍗 Meat: {order.meattype || "None"} x {order.meatqty}</Text>
            <Text fontWeight="bold">Total: ₦{order.totalprice?.toLocaleString() || "0"}</Text>
            <Text fontSize="sm" color="gray.500">
              Ordered: {order.created_at ? new Date(order.created_at).toLocaleString() : "Unknown"}
            </Text>

            {order.payment_status === "pending" && (
              <Button
                mt={3}
                colorScheme="green"
                isLoading={updatingId === order.id}
                onClick={() => confirmPayment(order.id)}
              >
                Confirm Payment
              </Button>
            )}
          </Box>
        ))}
      </VStack>

      <Button mt={6} colorScheme="orange" onClick={fetchOrders}>
        Refresh
      </Button>
    </Box>
  );
}
