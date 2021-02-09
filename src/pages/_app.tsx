import React from "react";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import App from "next/app";
import Head from "next/head";

import Theme from "theme/Theme";
import { NavigationProvider } from "contexts/navigationContext";
import { SettingsProvider } from "contexts/settingsContext";

function MyApp({
  Component,
  pageProps: { navigation, settings, socialMedia, ...restProps },
}: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/favicon/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ffffff"></meta>
        <meta property="og:image" content={settings.ogImage.fields.file.url} />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Roboto+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SettingsProvider value={{ ...settings, socialMedia }}>
        <NavigationProvider value={navigation}>
          <Theme>
            <Component {...restProps} />
          </Theme>
        </NavigationProvider>
      </SettingsProvider>
    </>
  );
}

MyApp.getInitialProps = async (
  appContext: AppContext
): Promise<AppInitialProps> => {
  const api = await import("lib/contentful");
  const navigationData = await api.getNavigation("main");
  const appProps = await App.getInitialProps(appContext);
  const settings = await api.getSettings();

  const navigation = navigationData.fields.elements.map((page) => {
    const title = page.fields.title;
    const slug = page.fields.slug;
    if (!title || !slug) {
      return null;
    }

    return {
      title,
      slug,
    };
  });

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      navigation: navigation,
      settings: settings.fields,
    },
  };
};

export default MyApp;
