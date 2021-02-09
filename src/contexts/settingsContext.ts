import { createContext, useContext } from "react";
import type { Settings } from "../lib/contentful";

export const SettingsContext = createContext<Settings | null>(null);

export const SettingsProvider = SettingsContext.Provider;

export const useSettings = () => {
  const settings = useContext(SettingsContext);

  if (!settings) {
    throw new Error("Settings aren't rehydrated!");
  }

  return settings;
};
