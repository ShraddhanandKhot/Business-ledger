"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FloatingButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/customers/new")}
      className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-blue-600 text-white shadow-xl flex items-center justify-center"
    >
      <Plus size={32} />
    </button>
  );
}