"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomerStore } from "@/store/customerStore";

export default function AddCustomerPage() {
  const router = useRouter();

  const addCustomer = useCustomerStore((state) => state.addCustomer);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [openingBalance, setOpeningBalance] = useState("");

  const saveCustomer = () => {
    if (!name.trim()) return;

    addCustomer({
      id: crypto.randomUUID(),
      name,
      phone,
      address,
      openingBalance: Number(openingBalance || 0),
    });

    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gray-50 p-5">

      <h1 className="text-2xl font-bold mb-6">
        Add Customer
      </h1>

      <div className="space-y-4">

        <input
          placeholder="Customer Name"
          className="w-full rounded-xl border p-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Phone"
          className="w-full rounded-xl border p-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          placeholder="Address"
          className="w-full rounded-xl border p-4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="number"
          placeholder="Opening Balance"
          className="w-full rounded-xl border p-4"
          value={openingBalance}
          onChange={(e) => setOpeningBalance(e.target.value)}
        />

        <button
          onClick={saveCustomer}
          className="w-full rounded-xl bg-blue-600 py-4 text-white font-semibold"
        >
          Save Customer
        </button>

      </div>

    </main>
  );
}