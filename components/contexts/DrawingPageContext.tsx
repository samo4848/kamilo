import React, { useCallback, useRef, useState } from "react";
import { BottomSheetMethods } from "../custom/bottomSheet/BottomSheet";
import { Colors } from "../../constants/Colors";

export const DrawingContext = React.createContext<any>({});

export interface Shape {
  id: string;
  type: "rect" | "circle";
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  color: string;
}
function DrawingPageContext({ children }: any) {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);

  return (
    <DrawingContext.Provider value={{ bottomSheetRef, shapes, setShapes }}>
      {children}
    </DrawingContext.Provider>
  );
}

export default DrawingPageContext;
