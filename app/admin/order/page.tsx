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
} from "@chakra-ui/react";

type Order = {
  id: string; // UUID
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

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders from the server
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.orders) setOrders(data.orders);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle admin confirming payment
  const handleConfirmPayment = async (orderId: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/confirm`, {
        method: "POST",
      });
      const data = await res.json();

      if (res.ok) {
        alert("✅ Payment confirmed!");
        fetchOrders(); // Refresh list after update
      } else {
        alert("Failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Unexpected error occurred.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Spinner size="xl" mt={20} mx="auto" display="block" />;

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

            <Text>
              Soup: {order.soup} x {order.plates}
            </Text>

            <Text>
              Swallow:{" "}
              {Object.entries(order.swallow)
                .map(([k, v]) => `${k.toUpperCase()}:${v}`)
                .join(", ")}
            </Text>

            <Text>
              Meat: {order.meattype} x {order.meatqty}
            </Text>

            <Text fontWeight="bold">
              Total: ₦{order.totalprice.toLocaleString()}
            </Text>

            <Text fontSize="sm" color="gray.500">
              Ordered: {new Date(order.created_at).toLocaleString()}
            </Text>

            {order.payment_status === "pending" && (
              <Button
                mt={3}
                colorScheme="green"
                size="sm"
                onClick={() => handleConfirmPayment(order.id)}
              >
                ✅ Confirm Payment
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
