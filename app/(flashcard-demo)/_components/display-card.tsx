"use client";

import "../_css/display-card.css";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useState } from "react";

export default function DisplayCard() {
  const cards = useQuery(api.cards.getAllCards);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  return (
    <div className="w-1/3 bg-blue-100 m-4 ml-0 rounded-lg h-[calc(100vh-2rem)] overflow-hidden relative">
      <header className="header-container flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Display Card</h1>
      </header>
      <div className="h-[30px] bg-gradient-to-b from-blue-50/80 via-blue-50/50 to-transparent absolute top-[4rem] left-0 right-0 z-10"/>
      <main className="p-4 space-y-6 overflow-y-auto h-[calc(100%-4rem)] mb-10">
        {cards?.map((card) => (
          <div
            key={card._id}
            className={`card-container h-[200px] perspective-1000 ${
              expandedCardId === card._id ? 'flipped' : ''
            }`}
            onClick={() => setExpandedCardId(expandedCardId === card._id ? null : card._id)}
          >
            <div className="card-inner relative w-full h-full transition-transform duration-500">
              <div className="card-front absolute w-full h-full bg-white rounded-lg p-6 shadow-md hover:shadow-lg backface-hidden">
                <div className="flex flex-col justify-between h-full">
                  <h2 className="text-xl font-bold">{card.title}</h2>
                  <p className="text-gray-400 text-sm">{card.date}</p>
                </div>
              </div>
              <div className="card-back absolute w-full h-full bg-white rounded-lg p-6 shadow-md backface-hidden">
                <div className="flex flex-col justify-center h-full">
                  <p className="text-gray-600">{card.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
