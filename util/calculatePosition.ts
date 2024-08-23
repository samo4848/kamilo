import { Shape } from "@/components/contexts/DrawingPageContext";

const calculatePosition = (shape: Shape, index: number) => {
  let x = 0;
  let y = 0;
  if (index % 2) {
    x = shape.x + (shape?.width || 0) - 30;
    y = shape.y + 30 * index;
  } else {
    x = shape.x + 30;
    y = shape.y + 30 + 30 * index;
  }

  if ((shape?.width || 0) < 130) {
    x = shape.x + 30;
    y = shape.y + 30 + 50 * index;
  }
  return { x, y };
};

export { calculatePosition };
