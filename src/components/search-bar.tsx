"use client";
import Image from "next/image";
import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Athlete {
  id: string;
  name: string;
  image: string;
  price: string;
  change: string;
  changePercent: number;
}

const athletesData: Athlete[] = [
  {
    id: "1",
    name: "LeBron James",
    image: "/icons/athletes/lebron-james.png",
    price: "$102.3",
    change: "+3.27%",
    changePercent: 3.27,
  },
  {
    id: "2",
    name: "LeBron James",
    image: "/icons/athletes/lebron-james.png",
    price: "$102.3",
    change: "+3.27%",
    changePercent: 3.27,
  },
  {
    id: "3",
    name: "LeBron James",
    image: "/icons/athletes/lebron-james.png",
    price: "$102.3",
    change: "+3.27%",
    changePercent: 3.27,
  },
];

interface SearchBarProps {
  teamImageUrl: string;
  name: string;
  onClose?: () => void;
  onSelectAthlete?: (athlete: Athlete) => void;
}

export default function SearchBar({ teamImageUrl, name, onClose, onSelectAthlete }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredAthletes = athletesData.filter((athlete) =>
    athlete.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Focus input when component mounts (when dialog opens)
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose?.();
      return;
    }

    if (filteredAthletes.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredAthletes.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSelectAthlete(filteredAthletes[selectedIndex]);
    }
  };

  const handleSelectAthlete = (athlete: Athlete) => {
    console.log("Selected athlete:", athlete);
    onSelectAthlete?.(athlete);
    onClose?.();
    setSearchQuery("");
  };

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="relative border-b border-gray-200">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search athletes..."
          className="w-full h-14 pl-12 pr-16 focus:outline-none text-base"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
          ESC
        </div>
      </div>

      {/* Results List */}
      <div className="max-h-[400px] overflow-y-auto">
        {filteredAthletes.length > 0 ? (
          filteredAthletes.map((athlete, index) => (
            <button
              key={athlete.id}
              onClick={() => handleSelectAthlete(athlete)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                index === selectedIndex
                  ? "bg-blue-50 border-l-4 border-l-blue-500"
                  : "border-l-4 border-l-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-yellow-400 overflow-hidden flex-shrink-0">
                  <Image
                    src="/icons/athletes/logo.png"
                    alt="Logo"
                    fill
                    className="object-cover opacity-20 mix-blend-screen"
                  />
                  <Image
                    src={athlete.image}
                    alt={athlete.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm text-gray-900">
                    {athlete.name}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-2">
                    <span>{athlete.price}</span>
                    <span
                      className={
                        athlete.changePercent > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {athlete.change}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Long", athlete);
                  }}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-green-500"
                  >
                    <path
                      d="M8 2L8 14M14 8L8 2M2 8L8 2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Short", athlete);
                  }}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-red-500"
                  >
                    <path
                      d="M8 14L8 2M2 8L8 14M14 8L8 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </button>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            No athletes found
          </div>
        )}
      </div>
    </div>
  );
}