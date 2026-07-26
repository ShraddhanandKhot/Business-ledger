"use client";

import Header from "@/components/Header";
import TotalPendingCard from "@/components/TotalPendingCard";
import SearchBar from "@/components/SearchBar";
import CustomerCard from "@/components/CustomerCard";
import FloatingButton from "@/components/FloatingButton";
import { useCustomerStore } from "@/store/customerStore";

export default function Home() {
  const customers = useCustomerStore((state) => state.customers);

  const totalPending = customers.reduce(
    (sum, customer) => sum + customer.openingBalance,
    0
  );

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