"use client";

import "../_css/display-card.css";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { useState, useRef, useEffect } from "react";
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { Globe, Trash2, ToggleRight } from "lucide-react";

export default function DisplayCard() {
  // 这些是convex的apis
  const cardsAll = useQuery(api.cards.getAllCards);
  const cardsUnarchived = useQuery(api.cards.getUnarchivedCards);
  const cardsArchived = useQuery(api.cards.getArchivedCards);
  const updateCard = useMutation(api.cards.updateCard);
  const deleteCard = useMutation(api.cards.deleteCard);
  
  // 这些是组件的state
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null); // 当前展开的卡片id
  const [cardHeight, setCardHeight] = useState<number>(200); // 卡片高度
  const cardRef = useRef<HTMLDivElement | null>(null); // 卡片ref
  const [cardsFiltered, setCardsFiltered] = useState<any[]>([]); // 过滤后的卡片
  const [isDragging, setIsDragging] = useState(false); // 是否正在拖动
  const [cardBorderRadius, setCardBorderRadius] = useState<string>('12px'); // 卡片圆角
  const [prevCard, setPrevCard] = useState<any | null>(null); // 之前渲染的卡片

  console.log(prevCard);

  // 当卡片数据变化时，更新过滤后的卡片，默认显示所有卡片(global, getAllCards)
  useEffect(() => {
    setCardsFiltered(cardsAll || []);
    setPrevCard(cardsAll || []);
  }, [cardsAll]);

  // 当卡片展开时，更新卡片高度
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

  const setFilterCards = (cards: any) => {
    setCardsFiltered(cards);
    setPrevCard(cards);
  };

  const handleMouseDown = (event: React.MouseEvent, cardId: string) => {
    if (expandedCardId === cardId) return; // 如果卡片已翻转，禁用滑动

    const cardElement = event.currentTarget as HTMLDivElement;
    let startX = event.clientX;
    let currentX = startX;
    setIsDragging(false);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      currentX = moveEvent.clientX;
      const deltaX = currentX - startX;
      cardElement.style.transform = `translateX(${deltaX}px)`;
      setIsDragging(true);
    };

    const handleMouseUp = () => {
      const deltaX = currentX - startX;
      if (deltaX < -100) { // 如果滑动超过100px，显示删除按钮
        cardElement.style.transform = `translateX(-100px)`;
        (cardElement.querySelector('.delete-button') as HTMLElement)!.style.display = 'flex'; // 设置删除按钮的显示
        setTimeout(() => {
          (cardElement.querySelector('.delete-button') as HTMLElement)!.style.opacity = '1'; // 设置删除按钮的透明度为100%
          (cardElement.querySelector('.delete-button') as HTMLElement)!.style.borderRadius = '0 12px 12px 0'; // 设置删除按钮的圆角为20px
          setCardBorderRadius('12px 0 0 12px'); // 更新状态
        }, 100);
      } else {
        cardElement.style.transform = `translateX(0)`;
        (cardElement.querySelector('.delete-button') as HTMLElement)!.style.opacity = '0'; // 设置删除按钮的透明度为0
        setCardBorderRadius('12px'); // 恢复原始圆角
        setTimeout(() => { 
          (cardElement.querySelector('.delete-button') as HTMLElement)!.style.display = 'none'; // 设置删除按钮的显示
        }, 100);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleCardClick = (cardId: string) => {
    if (!isDragging) { // 只有在没有拖动的情况下才翻转卡片
      setExpandedCardId(expandedCardId === cardId ? null : cardId);
    }
  };

  return (
    <div className="w-1/3 bg-blue-100 m-4 ml-0 rounded-lg h-[calc(100vh-2rem)] relative">
      <header className="header-container flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Display Card</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setFilterCards(cardsAll)}
          >
            所有 <Globe />
          </Button>
          <Button 
            className="bg-red-300 text-black hover:bg-red-500 hover:text-white"
            onClick={() => setFilterCards(cardsUnarchived)}
          >
            未学会 ❌
          </Button>
          <Button 
            className="bg-green-300 text-black hover:bg-green-500 hover:text-white"
            onClick={() => setFilterCards(cardsArchived)}
          >
            已学会 ✅
          </Button>
        </div>
      </header>
      <div className="h-[30px] bg-gradient-to-b from-blue-50/80 via-blue-50/50 to-transparent absolute top-[4rem] left-0 right-0 z-10"/>
      <main className="p-4 pt-24 space-y-6 overflow-y-auto h-[calc(100%-4rem)] pb-96">
        {cardsFiltered && cardsFiltered.length > 0 ? (
          cardsFiltered.map((card) => (
            <div
              key={card._id}
              ref={expandedCardId === card._id ? cardRef : null}
              className={`card-container perspective-1000 relative ${
                expandedCardId === card._id ? 'flipped' : ''
              }`}
              style={{
                height: expandedCardId === card._id ? `${cardHeight}px` : '200px',
                borderRadius: cardBorderRadius, // 使用状态变量
              }}
              onMouseDown={(e) => handleMouseDown(e, card._id)}
              onClick={() => handleCardClick(card._id)}
            >
              <div className="card-inner w-full h-full transition-transform duration-500">
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
              <div 
                className="delete-button absolute top-0 right-0 h-full bg-gradient-to-b from-blue-50/80 via-blue-50/50 to-transparentflex flex-col items-center justify-center translate-x-[100%]" 
                style={{ width: '75px', opacity: '0', transition: 'opacity 0.2s' }}
              >
                <button 
                  className="delete-button-inner flex flex-col items-center justify-center shadow-md hover:shadow-xl mb-2"
                  id="archive-button"
                  onClick={async () => {
                    await updateCard({ id: card._id });
                    setFilterCards(prevCard); // 更新卡片列表
                  }}
                >
                  <ToggleRight size={18} color="white" className="mb-2"/>
                  <span className="text-xs text-[#f4f4f4]">归档</span>
                </button>
                <button 
                  className="delete-button-inner flex flex-col items-center justify-center shadow-md hover:shadow-xl"
                  onClick={() => deleteCard({ id: card._id })}
                >
                  <Trash2 size={18} color="white" className="mb-2"/>
                  <span className="text-xs text-[#f4f4f4]">删除</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-full mt-10">
            <Loader size="lg" /> &nbsp;Loading...
          </div>
        )}
      </main>
    </div>
  );
}
