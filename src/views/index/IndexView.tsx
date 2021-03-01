import React, { FC } from "react";
import styled from "styled-components";

import SEO from "components/SEO";
import Layout from "components/Layout";
import { SEOIndexFields } from "lib/contentful/models";
import {
  IndexViewAnnouncementPostsProps,
  IndexViewGalleryProps,
  IndexViewIntensionsPostsProps,
  IndexViewNewsProps,
} from "pages";
import PostTile from "components/PostTile";
import Typography from "components/Typography";
import QuoteSection from "./QuoteSection";
import AboutSection from "./AboutSection";

export interface PostMetadata {
  createdAt: string;
}

export interface IndexViewProps {
  fields: SEOIndexFields;
  announcementPosts: Array<IndexViewAnnouncementPostsProps>;
  intensionsPosts: Array<IndexViewIntensionsPostsProps>;
  newsPosts: Array<IndexViewNewsProps>;
  galleryPosts: Array<IndexViewGalleryProps>;
}

const IndexView: FC<IndexViewProps> = ({
  fields,
  intensionsPosts,
  announcementPosts,
  newsPosts,
  galleryPosts,
}) => {
  return (
    <Layout>
      <SEO
        subTitle={fields.title}
        seoDescription={fields.seoDescription}
        type="page"
      />
      <AboutSection />
      {(intensionsPosts.length > 0 || announcementPosts.length > 0) && (
        <Section>
          <Typography variant="h2" center>
            Tydzień
          </Typography>
          <PostsWrapper>
            {intensionsPosts && (
              <PostTile
                key={intensionsPosts[0].post.slug}
                title={intensionsPosts[0].post.title}
                slug={intensionsPosts[0].post.slug}
                date={intensionsPosts[0].metadata.createdAt}
                img={intensionsPosts[0].post.thumbnail}
              />
            )}
            {announcementPosts && (
              <PostTile
                key={announcementPosts[0].post.slug}
                title={announcementPosts[0].post.title}
                slug={announcementPosts[0].post.slug}
                date={announcementPosts[0].metadata.createdAt}
                img={announcementPosts[0].post.thumbnail}
              />
            )}
          </PostsWrapper>
        </Section>
      )}
      <QuoteSection />
      {newsPosts.length > 0 && (
        <Section>
          <Typography variant="h2" center>
            Aktualności
          </Typography>
          <PostsWrapper>
            {newsPosts.map(({ post, metadata }) => (
              <PostTile
                key={post.slug}
                title={post.title}
                slug={post.slug}
                date={metadata.createdAt}
                img={post.thumbnail}
              />
            ))}
          </PostsWrapper>
        </Section>
      )}
      {galleryPosts.length > 0 && (
        <Section>
          <Typography variant="h2" center>
            Galeria
          </Typography>
          <PostsWrapper>
            {galleryPosts.map(({ post, metadata }) => (
              <PostTile
                key={post.slug}
                title={post.title}
                slug={post.slug}
                date={metadata.createdAt}
                img={post.thumbnail}
                variant="gallery"
              />
            ))}
          </PostsWrapper>
        </Section>
      )}
    </Layout>
  );
};

export default IndexView;

const Section = styled.section`
  grid-column: content;
  display: grid;
  gap: 25px;
  padding: 58px 20px;
`;

const PostsWrapper = styled.div`
  display: grid;
  column-gap: 36px;
  row-gap: 100px;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  justify-content: center;
`;
