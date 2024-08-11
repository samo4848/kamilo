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
  const [history, setHistory] = useState<Shape[][]>([shapes]); // State history for undo/redo
  const [historyIndex, setHistoryIndex] = useState(0);

  return (
    <DrawingContext.Provider
      value={{
        bottomSheetRef,
        shapes,
        setShapes,
        history,
        setHistory,
        historyIndex,
        setHistoryIndex,
      }}
    >
      {children}
    </DrawingContext.Provider>
  );
}

export default DrawingPageContext;
