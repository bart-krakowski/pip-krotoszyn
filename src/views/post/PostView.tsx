import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import HtmlStyledContent from "views/contentBlocks/HtmlStyledContent";
import SEO from "components/SEO";
import ImageObserver from "views/contentBlocks/Image/ImageObserverContext";
import Hero from "./Hero";
import { News } from "lib/contentful";

export interface NewsMetadata {
  createdAt: string;
}
export interface PostViewProps {
  post: News;
  metadata: NewsMetadata;
  category: {
    name: string;
    slug: string;
  };
}
const PostView: FC<PostViewProps> = ({
  post,
  metadata,
  children,
  category,
}) => {
  const content = useMemo(
    () => (post.content ? documentToReactComponents(post.content) : null),
    [post.content, post.thumbnail]
  );

  return (
    <ImageObserver>
      <PostLayout>
        <SEO
          subTitle={post.title}
          seoDescription={post.seoDescription}
          type="article"
        />
        <Hero
          title={post.title}
          image={post.thumbnail.fields.file.url}
          date={metadata.createdAt}
          category={{ name: category.name, slug: category.slug }}
        />
        <Content>
          <HtmlStyledContent>{content}</HtmlStyledContent>
        </Content>
        {children}
      </PostLayout>
    </ImageObserver>
  );
};

const PostLayout = styled.div`
  grid-column: full;
`;

const Content = styled.article`
  max-width: 600px;
  margin: auto;
`;

export default PostView;
