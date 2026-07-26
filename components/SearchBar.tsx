import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-3 bg-white rounded-full px-4 py-3 border">
      <Search size={18} />

      <input
        className="outline-none flex-1 bg-transparent"
        placeholder="Search customers"
      />
    </div>
  );
}