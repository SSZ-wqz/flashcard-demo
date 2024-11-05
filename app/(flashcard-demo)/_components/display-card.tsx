"use client";

import "../_css/display-card.css";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useState, useRef, useEffect } from "react";
import { Loader } from "@/components/ui/loader";

export default function DisplayCard() {
  const cards = useQuery(api.cards.getAllCards);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [cardHeight, setCardHeight] = useState<number>(200);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (expandedCardId && cardRef.current) {
      const frontElement = cardRef.current.querySelector('.card-front');
      const backElement = cardRef.current.querySelector('.card-back');
      const frontHeight = frontElement?.scrollHeight || 200;
      const backHeight = backElement?.scrollHeight || 200;
      
      const frontTextLength = frontElement?.textContent?.length || 0;
      const backTextLength = backElement?.textContent?.length || 0;
      const additionalHeight = (frontTextLength + backTextLength) * 0.5; // 根据字数调整高度

      setCardHeight(Math.max(frontHeight, backHeight) + additionalHeight);
    } else {
      setCardHeight(200);
    }
  }, [expandedCardId]);

  return (
    <div className="w-1/3 bg-blue-100 m-4 ml-0 rounded-lg h-[calc(100vh-2rem)] overflow-hidden relative">
      <header className="header-container flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Display Card</h1>
      </header>
      <div className="h-[30px] bg-gradient-to-b from-blue-50/80 via-blue-50/50 to-transparent absolute top-[4rem] left-0 right-0 z-10"/>
      <main className="p-4 pt-24 space-y-6 overflow-y-auto h-[calc(100%-4rem)]">
        {cards ? (
          cards.map((card) => (
            <div
              key={card._id}
              ref={expandedCardId === card._id ? cardRef : null}
              className={`card-container perspective-1000 ${
                expandedCardId === card._id ? 'flipped' : ''
              }`}
              style={{ height: expandedCardId === card._id ? `${cardHeight}px` : '200px' }}
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
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <Loader size="lg" /> &nbsp;Loading...
          </div>
        )}
      </main>
    </div>
  );
}
