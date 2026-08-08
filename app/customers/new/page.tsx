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

  const saveCustomer = async () => {
    if (!name.trim()) {
      alert("Customer name is required.");
      return;
    }

    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          address,
        }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type") || "";
        let errorMessage = "Unable to add customer.";

        if (contentType.includes("application/json")) {
          const error = await response.json();
          errorMessage = error.message || error.error || errorMessage;
        } else {
          const text = await response.text();
          errorMessage = text || errorMessage;
        }

        alert(`Unable to add customer: ${errorMessage}`);
        return;
      }

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Expected JSON response but got: ${text}`);
      }

      const customer = await response.json();
      addCustomer({
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        openingBalance: 0,
      });

      router.push("/");
    } catch (err) {
      alert("Unable to add customer. Please try again.");
      console.error(err);
    }
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
          type="button"
          onClick={saveCustomer}
          className="w-full rounded-xl bg-blue-600 py-4 text-white font-semibold"
        >
          Save Customer
        </button>

      </div>

    </main>
  );
}