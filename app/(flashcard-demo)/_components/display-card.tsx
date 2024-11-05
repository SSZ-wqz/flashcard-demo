"use client";

import "../_css/display-card.css";
import { Card } from "../_interfaces/card-types";

interface DisplayCardProps {
  cards: Card[];
}

export default function DisplayCard({ cards }: DisplayCardProps) {
  return (
    <div className="w-1/3 bg-blue-100 m-4 ml-0 rounded-lg">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Display Card</h1>
      </header>
      <main className="p-4 space-y-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="card-container bg-white rounded-lg p-4 h-[100px] hover:h-[200px] transition-[height] duration-300 ease-in-out overflow-hidden group"
          >
            <div className="flex flex-col h-full">
              <h2 className="text-xl font-bold">{card.title}</h2>
              <p className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {card.description}
              </p>
              <p className="text-gray-500 mt-auto self-end">{card.date}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
