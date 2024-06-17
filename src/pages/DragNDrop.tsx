import { createRef, useState } from "react";

import Card, { type CardData } from "@/components/Card/Card";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import MainContainer from "@/components/MainContainer/MainContainer";
import { Position } from "@/components/Card/Card";
import { getDistance } from "@/utils/utils";

const PLACEHOLDER = {
  placeholder: true,
  id: -1,
} as CardData;

const DragNDrop = () => {
  const [draggedCardId, setDraggedCardId] = useState<number>(NaN);
  const [replacedCardId, setReplacedCardId] = useState<number>(NaN);
  const [cards, setCards] = useState<CardData[]>([
    {
      id: 1,
      ref: createRef<HTMLInputElement>(),
      selected: false,
      title: "Of Effort",
      placeholder: false,
      text: "Struggle without the rewards of eventually being loved and appreciated descends deep into chaos.",
    },
    {
      id: 2,
      ref: createRef<HTMLInputElement>(),
      selected: false,
      placeholder: false,
      title: "Of Movement",
      text: "Never settle. Never give up. Never stop. Never destroy the sewage system. Never ever.",
    },
    {
      id: 3,
      ref: createRef<HTMLInputElement>(),
      selected: false,
      title: "Of Order",
      placeholder: false,
      text: "When one is incapable to rearrange their destiny, what is there left to rearrange?",
    },
    {
      id: 4,
      ref: createRef<HTMLInputElement>(),
      selected: false,
      title: "Of Fate",
      placeholder: false,
      text: "Cocoa can turn your world into agony. And sometimes even a modest muffin is enough to bring down civilizations.",
    },
    {
      id: 5,
      ref: createRef<HTMLInputElement>(),
      selected: false,
      title: "Of Meaning",
      placeholder: false,
      text: "Bullies dream about staying in good shape for the fun of it.",
    },
  ]);

  const handleDragEnd = () => {
    const newCards = cards.filter((card) => !card.placeholder);
    const removeIndex = newCards.findIndex((card) => card.id === draggedCardId);
    const insertIndex = newCards.findIndex((card) => card.id === replacedCardId);
    const removedCard = newCards.splice(removeIndex, 1);
    newCards.splice(insertIndex, 0, removedCard[0]);
    setCards(newCards);
    setDraggedCardId(NaN);
    setReplacedCardId(NaN);
  };

  const handleDragOver = (pos: Position) => {
    let closestCardId = NaN;
    let min = Infinity;
    cards.forEach((card) => {
      if (card?.ref?.current) {
        const { height, width, x, y } =
          card.ref.current.getBoundingClientRect();
        const distance = getDistance(pos, {
          x: x + width / 2,
          y: y + height / 2,
        });
        if (distance < min) {
          min = distance;
          closestCardId = card.id;
        }
      }
    });
    let newCards: CardData[];
    if (!isNaN(closestCardId) && closestCardId !== draggedCardId) {
      const i = cards.findIndex((card) => card.id === closestCardId);
      newCards = cards.filter((card) => !card.placeholder);
      newCards.splice(i, 0, PLACEHOLDER);
      setReplacedCardId(closestCardId);
    } else {
      newCards = cards.filter((card) => !card.placeholder);
      setReplacedCardId(NaN);
    }
    setCards(() => newCards);
  };

  return (
    <>
      <Header />
      <MainContainer>
        <div className="grid justify-center gap-6 p-12 grid-cols-autofit">
          {cards.map((card) => (
            <Card
              {...card}
              isDragged={card.id === draggedCardId}
              key={card.id}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDragStart={setDraggedCardId}
            >
              <div className="mb-2 text-lg font-semibold">{card.title}</div>
              <div>{card.text}</div>
            </Card>
          ))}
        </div>
      </MainContainer>
      <Footer />
    </>
  );
};

export default DragNDrop;
