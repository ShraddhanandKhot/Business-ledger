import Header from "@/components/Header";
import TotalPendingCard from "@/components/TotalPendingCard";
import SearchBar from "@/components/SearchBar";
import CustomerCard from "@/components/CustomerCard";
import FloatingButton from "@/components/FloatingButton";

const customers = [
  {
    id: 1,
    name: "Rahul Patil",
    phone: "9876543210",
    pending: 2500,
  },
  {
    id: 2,
    name: "Amit Kumar",
    phone: "9123456789",
    pending: 900,
  },
  {
    id: 3,
    name: "Suresh",
    phone: "9988776655",
    pending: 4200,
  },
];

export default function Home() {
  const totalPending = customers.reduce(
    (sum, customer) => sum + customer.pending,
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