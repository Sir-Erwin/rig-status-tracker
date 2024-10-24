import React, { createContext, useContext, useState, ReactNode } from 'react';

// Create a context for the asset
const AssetContext = createContext<any>(null);

// Create a provider component
export const AssetProvider = ({ children }: { children: ReactNode }) => {
  const [selectedValue, setSelectedValue] = useState<string>("choose");

  return (
    <AssetContext.Provider value={{ selectedValue, setSelectedValue }}>
      {children}
    </AssetContext.Provider>
  );
};

// Create a custom hook to use the AssetContext
export const useAsset = () => {
  return useContext(AssetContext);
};
