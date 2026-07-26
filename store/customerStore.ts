import { create } from "zustand";
import { Customer } from "@/types/customer";

interface CustomerStore {
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  customers: [
    {
      id: "1",
      name: "Rahul Patil",
      phone: "9876543210",
      openingBalance: 2500,
    },
    {
      id: "2",
      name: "Amit Kumar",
      phone: "9123456789",
      openingBalance: 900,
    },
  ],

  addCustomer: (customer) =>
    set((state) => ({
      customers: [...state.customers, customer],
    })),
}));