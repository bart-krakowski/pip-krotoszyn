import React, { FC } from "react";
import { ThemeProvider } from "styled-components";

import { createBreakpoints } from "./createBreakpoints";

import { NormalizeStyle } from "./GlobalNormalizeStyle";

const latoFontFamily = `Lato, BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif`;
const robotoMono = `"Roboto Mono", monospace`;

export const themeConfig = {
  // media queries
  // Documentation: https://material-ui.com/customization/breakpoints/
  breakpoints: createBreakpoints({
    values: {
      mobile: 0,
      desktop: 1024,
      max: 1168,
    },
  }),
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    brand: {
      primary: "#0C2B55",
    },
    greys: {
      900: "#061125",
      800: "#2E3749",
      700: "#6A7489",
      600: "#909DB5",
      200: "#E2E6ED",
      100: "#F9FAFC",
    },
    text: {
      heading: "#061125",
      primary: "#2E3749",
      secondary: "#6A7489",
    },
    icons: {
      primary: "#919DB5",
      secondary: "#B4BECF",
    },
  },
  typography: {
    h1: {
      fontFamily: latoFontFamily,
      fontStyle: "normal",
      fontWeight: 900,
      fontSize: "32px",
      lineHeight: "44px",
    },
    h2: {
      fontFamily: latoFontFamily,
      fontStyle: "normal",
      fontWeight: 900,
      fontSize: "28px",
      lineHeight: "40px",
    },
    h3: {
      fontFamily: latoFontFamily,
      fontStyle: "normal",
      fontWeight: 900,
      fontSize: "24px",
      lineHeight: "40px",
    },
    h4: {
      fontFamily: latoFontFamily,
      fontStyle: "normal",
      fontWeight: 900,
      fontSize: "20px",
      lineHeight: "32px",
    },
    h5: {
      fontFamily: latoFontFamily,
      fontStyle: "normal",
      fontWeight: 900,
      fontSize: "16px",
      lineHeight: "24px",
    },
    h6: {
      fontFamily: latoFontFamily,
      fontStyle: "normal",
      fontWeight: 900,
      fontSize: "12px",
      lineHeight: "20px",
    },
    lead: {
      fontFamily: latoFontFamily,
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "18px",
      lineHeight: "36px",
    },
    body1: {
      fontFamily: latoFontFamily,
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "18px",
      lineHeight: "36px",
    },
    body2: {
      fontFamily: latoFontFamily,
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "20px",
    },
    subhead: {
      fontFamily: latoFontFamily,
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "24px",
    },
    menu: {
      fontFamily: latoFontFamily,
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "14px",
      lineHeight: "24px",
    },
  },
};

const Theme: FC = ({ children }) => (
  <ThemeProvider theme={themeConfig}>
    <NormalizeStyle />
    {children}
  </ThemeProvider>
);

export default Theme;
