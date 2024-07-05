import { createContext, useState, useContext, Dispatch, SetStateAction, ReactNode } from 'react';
import Game from "../models/game.ts";

interface GameContextType {
  game: Game | undefined;
  setGame: Dispatch<SetStateAction<Game | undefined>>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const [game, setGame] = useState<Game | undefined>(undefined);

  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
