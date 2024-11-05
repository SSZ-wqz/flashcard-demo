"use client";

import CreateCard from "./_components/create-card";
import DisplayCard from "./_components/display-card";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

export default function Home() {
  const createCard = useMutation(api.cards.createCard);
  
  const handleCreateCard = (card: any) => {
    createCard({
      title: card.title,
      description: card.description,
      date: card.date,
    });
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <CreateCard onCreateCard={handleCreateCard} />
      <DisplayCard />
    </div>
  );
}
