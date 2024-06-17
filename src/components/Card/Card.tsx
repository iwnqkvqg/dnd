import {
  ForwardedRef,
  RefObject,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";

export interface Position {
  x: number;
  y: number;
}

export interface CardData {
  id: number;
  placeholder: boolean;
  ref: RefObject<HTMLInputElement>;
  selected: boolean;
  text: string;
  title: string;
}

interface CardProps {
  children: React.ReactNode;
  id: number;
  isDragged: boolean;
  onDragEnd: () => void;
  onDragOver: (pos: Position) => void;
  onDragStart: (id: number) => void;
  placeholder: boolean;
}

const Card = forwardRef(function Card(
  props: CardProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const DELAY = 100; // ms
  const [center, setCenter] = useState<Position>({ x: 0, y: 0 });
  // Offset is how far away from the center the user grabs the card; could be negative
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
  const debounceId = useRef<number>(NaN);

  // Set center coordinates
  useEffect(() => {
    if (!ref || !(ref as RefObject<HTMLInputElement>).current) {
      return;
    }
    const { x, y, width, height } = (
      ref as RefObject<HTMLInputElement>
    ).current.getBoundingClientRect();
    setCenter({
      x: x + width / 2,
      y: y + height / 2,
    });
  }, [ref]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    // Update position of the center of the card being dragged
    if (debounceId.current) {
      return;
    }
    debounceId.current = window.setTimeout(() => {
      props.onDragOver({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
      clearTimeout(debounceId.current);
      debounceId.current = NaN;
    }, DELAY);
  };

  const handleDragStart = (e: DragEvent<HTMLElement>) => {
    setOffset({
      x: e.clientX - center.x,
      y: e.clientY - center.y,
    });
    props.onDragStart(props.id);
  };

  const handleDragEnd = () => {
    setOffset({ x: 0, y: 0 });
    props.onDragEnd();
  };

  if (props.placeholder) {
    return (
      <div className="flex flex-col items-center justify-between h-48 p-6 pb-12 text-center text-blue-600 border-4 border-blue-900 rounded bg-dark w-96">
        <div className="w-24 h-4 mb-2 bg-blue-900 rounded"></div>
        <div className="w-48 h-2 bg-blue-900 rounded"></div>
        <div className="h-2 bg-blue-900 rounded w-72"></div>
        <div className="h-2 bg-blue-900 rounded w-36"></div>
      </div>
    );
  }

  return (
    <article
      className={clsx(
        "h-48 p-4 bg-dark text-center shadow-card flex flex-col rounded w-96 cursor-grab",
        props.isDragged &&
          "border border-dashed border-gray-600 shadow-none text-gray-600"
      )}
      draggable="true"
      onDragEnd={handleDragEnd}
      onDragOver={handleMouseMove}
      onDragStart={handleDragStart}
      role="document"
      ref={ref}
      tabIndex={0}
    >
      {props.children}
    </article>
  );
});

export default Card;
