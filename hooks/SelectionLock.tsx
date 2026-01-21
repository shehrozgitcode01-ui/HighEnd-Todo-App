// context/SelectionContext.tsx
import React, { createContext, useContext, useState } from 'react';

type SelectionContextType = {
  isSelectionMode: boolean;
  setSelectionMode: (mode: boolean) => void;
};

const SelectionContext = createContext<SelectionContextType>({
  isSelectionMode: false,
  setSelectionMode: () => {},
});

export const SelectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSelectionMode, setSelectionMode] = useState(false);

  return (
    <SelectionContext.Provider value={{ isSelectionMode, setSelectionMode }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelectionMode = () => {
  const context = useContext(SelectionContext)
  if (!context) throw new Error('useSelectionMode must be used with an Selection Provider');
  return context
};
  