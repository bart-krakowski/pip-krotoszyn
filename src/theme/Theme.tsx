import React, { FC } from "react";
import { ThemeProvider } from "styled-components";

import { createBreakpoints } from "./createBreakpoints";
import { FontsStyle } from "./fonts";

import { NormalizeStyle } from "./GlobalNormalizeStyle";

const roslindaleFontFamily = `Roslindale, BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif`;
const montserratFontFamily = `Montserrat, BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif`;

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
      primary: "#000000",
      secondary: "#ffffff",
      tertiary: "#0C2B55",
      quaternary: "#8D9297",
    },
    icons: {
      primary: "#919DB5",
      secondary: "#B4BECF",
    },
  },
  typography: {
    h1: {
      fontFamily: roslindaleFontFamily,
      fontStyle: "normal",
      fontWeight: 900,
      fontSize: "48px",
      lineHeight: "67px",
    },
    h2: {
      fontFamily: roslindaleFontFamily,
      fontStyle: "normal",
      fontWeight: 900,
      fontSize: "36px",
      lineHeight: "50px",
    },
    h3: {
      fontFamily: roslindaleFontFamily,
      fontStyle: "normal",
      fontWeight: 900,
      fontSize: "28px",
      lineHeight: "33px",
    },
    h4: {
      fontFamily: roslindaleFontFamily,
      fontStyle: "normal",
      fontWeight: 900,
      fontSize: "18px",
      lineHeight: "25px",
    },
    h5: {
      fontFamily: roslindaleFontFamily,
      fontStyle: "normal",
      fontWeight: 900,
      fontSize: "14px",
      lineHeight: "20px",
    },
    h6: {
      fontFamily: roslindaleFontFamily,
      fontStyle: "normal",
      fontWeight: 900,
      fontSize: "12px",
      lineHeight: "20px",
    },
    lead: {
      fontFamily: montserratFontFamily,
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "18px",
      lineHeight: "36px",
    },
    body1: {
      fontFamily: montserratFontFamily,
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "13px",
      lineHeight: "18px",
    },
    body2: {
      fontFamily: montserratFontFamily,
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "20px",
    },
    date: {
      fontFamily: montserratFontFamily,
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "8px",
      lineHeight: "11px",
    },
    menu: {
      fontFamily: montserratFontFamily,
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
    <FontsStyle />
    {children}
  </ThemeProvider>
);

export default Theme;
