import React, { FC, useMemo } from "react";
import styled from "styled-components";

import SEO from "components/SEO";
import ImageObserver from "views/contentBlocks/Image/ImageObserverContext";
import Hero from "./Hero";
import { Gallery } from "lib/contentful";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export interface NewsMetadata {
  createdAt: string;
}
export interface PostGallertViewProps {
  post: Gallery;
  metadata: NewsMetadata;
  category: {
    name: string;
    slug: string;
  };
}
export const PostGallertView: FC<PostGallertViewProps> = ({
  post,
  metadata,
  children,
  category,
}) => {
  const images = useMemo(() => post.images, [post.images]);

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
          {images?.map((el) => (
            <Zoom>
              <Img src={el.fields.file.url} alt={el.fields.file.fileName} />
            </Zoom>
          ))}
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

const Img = styled.img`
  display: block;
  max-width: 100%;
`;
