import { createGlobalStyle } from "styled-components";

export const FontsStyle = createGlobalStyle`
  @font-face {
    font-weight: 400;
    font-family: 'Roslindale';
    font-style: normal;
    src: url('/fonts/Roslindale/RoslindaleText-Regular.woff2') format('woff2'),
      url('/fonts/Roslindale/RoslindaleText-Regular.woff') format('woff'),
      url('/fonts/Roslindale/RoslindaleText-Regular.eot') format('eot'),
      url('/fonts/Roslindale/RoslindaleText-Regular.svg') format('svg'),
      url('/fonts/Roslindale/RoslindaleText-Regular.ttf') format('ttf');
    font-display: fallback;
  }

  @font-face {
    font-weight: 700;
    font-family: 'Roslindale';
    font-style: normal;
    src: url('/fonts/Roslindale/RoslindaleText-Bold.woff2') format('woff2'),
      url('/fonts/Roslindale/RoslindaleText-Bold.woff') format('woff'),
      url('/fonts/Roslindale/RoslindaleText-Bold.eot') format('eot'),
      url('/fonts/Roslindale/RoslindaleText-Bold.svg') format('svg'),
      url('/fonts/Roslindale/RoslindaleText-Bold.ttf') format('ttf');
    font-display: fallback;
  }

  @font-face {
    font-weight: 300;
    font-family: 'Montserrat';
    font-style: normal;
    src: url('/fonts/Montserrat/Montserrat-Light.woff2') format('woff2'),
      url('/fonts/Montserrat/Montserrat-Light.woff') format('woff'),
      url('/fonts/Montserrat/Montserrat-Light.eot') format('eot'),
      url('/fonts/Montserrat/Montserrat-Light.svg') format('svg'),
      url('/fonts/Montserrat/Montserrat-Light.ttf') format('ttf');
    font-display: fallback;
  }

  @font-face {
    font-weight: 500;
    font-family: 'Montserrat';
    font-style: normal;
    src: url('/fonts/Montserrat/Montserrat-Medium.woff2') format('woff2'),
      url('/fonts/Montserrat/Montserrat-Medium.woff') format('woff'),
      url('/fonts/Montserrat/Montserrat-Medium.eot') format('eot'),
      url('/fonts/Montserrat/Montserrat-Medium.svg') format('svg'),
      url('/fonts/Montserrat/Montserrat-Medium.ttf') format('ttf');
    font-display: fallback;
  }

  @font-face {
    font-weight: 700;
    font-family: 'Montserrat';
    font-style: normal;
    src: url('/fonts/Montserrat/Montserrat-Bold.woff2') format('woff2'),
      url('/fonts/Montserrat/Montserrat-Bold.woff') format('woff'),
      url('/fonts/Montserrat/Montserrat-Bold.eot') format('eot'),
      url('/fonts/Montserrat/Montserrat-Bold.svg') format('svg'),
      url('/fonts/Montserrat/Montserrat-Bold.ttf') format('ttf');
    font-display: fallback;
  }
`;
