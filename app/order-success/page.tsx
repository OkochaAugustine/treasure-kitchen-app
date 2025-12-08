import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default async function OrderSuccessPage({ searchParams }: Props) {
  const orderId = searchParams.orderId;

  // If no order ID, redirect user away
  if (!orderId) redirect("/");

  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (!order) redirect("/");

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1 style={{ fontSize: 36, marginBottom: 20 }}>🎉 Order Successful</h1>
      <p style={{ fontSize: 20 }}>
        Your order <strong>#{orderId}</strong> has been received.
      </p>
    </div>
  );
}
