import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import HtmlStyledContent from "views/contentBlocks/HtmlStyledContent";
import SEO from "components/SEO";
import ImageObserver from "views/contentBlocks/Image/ImageObserverContext";
import Hero from "./Hero";
import { IndexViewNewsProps } from "pages";
import { Page } from "lib/contentful";
import Layout from "components/Layout";

export interface PageViewProps {
  page: Page;
  posts?: Array<IndexViewNewsProps>;
}
const PageView: FC<PageViewProps> = ({ page, children }) => {
  const content = useMemo(
    () => (page?.content ? documentToReactComponents(page.content) : null),
    [page?.content, page?.thumbnail]
  );

  return (
    <ImageObserver>
      <Layout>
        <SEO
          subTitle={page.title}
          seoDescription={page.seoDescription}
          type="article"
        />
        <Hero title={page.title} image={page.thumbnail.fields.file.url} />
        <Content>
          <HtmlStyledContent>{content}</HtmlStyledContent>
        </Content>
        {children}
      </Layout>
    </ImageObserver>
  );
};

export default PageView;

const Content = styled.article`
  grid-column: content;
  max-width: 600px;
  margin: auto;
`;
