"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LeaderboardTitleContextType {
  title: string;
  setTitle: (title: string) => void;
}

const LeaderboardTitleContext = createContext<
  LeaderboardTitleContextType | undefined
>(undefined);

export const LeaderboardTitleProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [title, setTitle] = useState("title");

  return (
    <LeaderboardTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </LeaderboardTitleContext.Provider>
  );
};

export const useLeaderboardTitle = () => {
  const context = useContext(LeaderboardTitleContext);
  if (context === undefined) {
    throw new Error(
      "useLeaderboardTitle must be used within a LeaderboardTitleProvider"
    );
  }
  return context;
};

