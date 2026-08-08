"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isPWA } from "@/lib/isPWA";
import InstallApp from "@/components/InstallApp";
import { supabase } from "@/lib/supabase/client";

import Header from "@/components/Header";
import TotalPendingCard from "@/components/TotalPendingCard";
import SearchBar from "@/components/SearchBar";
import CustomerCard from "@/components/CustomerCard";
import FloatingButton from "@/components/FloatingButton";
import { useCustomerStore } from "@/store/customerStore";

export default function Home() {
  const router = useRouter();
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setInstalled(isPWA());
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const session = await supabase.auth.getSession();
      if (!session?.data?.session) {
        router.push("/auth/login");
      }
    };

    checkSession();
  }, [router]);

  // Always call hooks in the same order. `useCustomerStore` must run
  // on every render, even if we show the install prompt first.
  const customers = useCustomerStore((state) => state.customers);

  const totalPending = customers.reduce(
    (sum, c) => sum + c.openingBalance,
    0
  );

  if (!installed) {
    return <InstallApp />;
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <Header />

      <div className="p-4 space-y-4">
        <TotalPendingCard amount={totalPending} />
        <SearchBar />
        {customers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>

      <FloatingButton />
    </main>
  );
}