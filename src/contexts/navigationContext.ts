import { createContext, useContext } from "react";

interface NavigationItem {
  slug: string;
  title: string;
}

export type Navigation = NavigationItem[];

export const NavigationContext = createContext<Navigation | null>(null);

export const NavigationProvider = NavigationContext.Provider;

export const useNavigation = () => {
  const navigation = useContext(NavigationContext);

  if (!navigation) {
    throw new Error("Navigation isn't rehydrated!");
  }

  return navigation;
};
