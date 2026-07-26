type Props = {
  amount: number;
};

export default function TotalPendingCard({ amount }: Props) {
  return (
    <div className="rounded-3xl bg-black text-white p-6">
      <p className="text-gray-300">Total Pending</p>

      <h2 className="text-4xl font-bold mt-2">
        ₹ {amount.toLocaleString("en-IN")}
      </h2>
    </div>
  );
}