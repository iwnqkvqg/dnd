import { Position } from "@/components/Card/Card";

const getDistance = (left: Position, right: Position) => {
  const x = right.x - left.x;
  const y = right.y - left.y;
  return Math.sqrt(x * x + y * y);
};

export { getDistance };
