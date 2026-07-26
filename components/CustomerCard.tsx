import { ChevronRight } from "lucide-react";

type Customer = {
  id: number;
  name: string;
  phone: string;
  pending: number;
};

export default function CustomerCard({
  customer,
}: {
  customer: Customer;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border cursor-pointer hover:shadow-md transition">
      <div className="flex justify-between items-center">

        <div>
          <h2 className="font-semibold text-lg">
            {customer.name}
          </h2>

          <p className="text-sm text-gray-500">
            {customer.phone}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-red-600 font-bold">
              ₹ {customer.pending.toLocaleString("en-IN")}
            </p>

            <p className="text-xs text-gray-500">
              Pending
            </p>
          </div>

          <ChevronRight size={18} />
        </div>

      </div>
    </div>
  );
}