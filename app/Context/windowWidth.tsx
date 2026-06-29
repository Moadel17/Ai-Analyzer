import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface child {
  children: ReactNode;
}

interface context {
  width: number;
}

export const Window = createContext<context | null>(null);

export const Window_Width = ({ children }: child) => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(window.innerWidth);

    function getWidth() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", getWidth);
    return () => window.removeEventListener("resize", getWidth);
  }, []);

  return <Window.Provider value={{ width }}>{children}</Window.Provider>;
};
