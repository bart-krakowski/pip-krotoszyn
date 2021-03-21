import React, { useContext } from "react";
import Head from "next/head";
import { SettingsContext } from "contexts/settingsContext";

interface SEOProps {
  subTitle: string;
  seoDescription?: string;
  type: "article" | "page";
}

const SEO = ({ subTitle, seoDescription, type }: SEOProps) => {
  const settingContextValue = useContext(SettingsContext);

  if (settingContextValue === null) {
    throw Error("SettingsContext has not been Provided!");
  }

  const { title } = settingContextValue;

  return (
    <Head>
      <title itemProp="name" lang="en">
        {title}
        {` - `}
        {subTitle}
      </title>
      <meta name="description" content={seoDescription} />
      <meta property="og:title" content={`${title} - ${subTitle}`} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary"></meta>
    </Head>
  );
};

export default SEO;
