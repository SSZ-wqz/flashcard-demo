"use client";

import CreateCard from "./_components/create-card";
import DisplayCard from "./_components/display-card";
import { Card } from "./_interfaces/card-types";
import { useState } from "react";

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);  

  const handleCreateCard = (card: Omit<Card, "id">) => {
    const newCard: Card = {
      ...card,
      id: Date.now().toString(),
    }
    setCards([...cards, newCard]);
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <CreateCard onCreateCard={handleCreateCard} />
      <DisplayCard cards={cards} />
    </div>
  );
}
