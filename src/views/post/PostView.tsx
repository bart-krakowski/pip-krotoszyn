import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document as RichTextDocument } from "@contentful/rich-text-types";

import HtmlStyledContent from "views/contentBlocks/HtmlStyledContent";
import SEO from "components/SEO";
import ImageObserver from "views/contentBlocks/Image/ImageObserverContext";
import createRenderOptions from "./createRenderOptions";

export interface PostMetadata {
  createdAt: string;
}

export interface Post {
  title: string;
  content?: RichTextDocument;
  excerpt: string;
  thumbnails: { [id: string]: string };
  seoDescription: string;
}

export interface PostViewProps {
  post: Post;
  metadata: PostMetadata;
}

const PostView: FC<PostViewProps> = ({ post, children }) => {
  const content = useMemo(
    () =>
      post.content
        ? documentToReactComponents(
            post.content,
            createRenderOptions({ thumbnails: post.thumbnails })
          )
        : null,
    [post.content, post.thumbnails]
  );

  return (
    <ImageObserver>
      <PostLayout>
        <SEO
          subTitle={post.title}
          seoDescription={post.seoDescription}
          type="article"
        />
        <Heading>{post.title}</Heading>
        <Lead>{post.excerpt}</Lead>
        <Hrline />
        <HtmlStyledContent>{content}</HtmlStyledContent>
        {children}
      </PostLayout>
    </ImageObserver>
  );
};

const PostLayout = styled.div`
  width: 568px;
  max-width: 100%;
  margin: 0 auto;
  padding: 71px 0 0;
`;

const Heading = styled.h1`
  ${({ theme }) => theme.typography.h1}
`;

const Lead = styled.p`
  margin-top: 32px;
  margin-bottom: 64px;
  ${({ theme }) => theme.typography.lead}
  color: ${({ theme }) => theme.palette.text.primary};
`;

const Hrline = styled.hr`
  height: 1px;
  background: ${({ theme }) => theme.palette.greys[200]};
  border: 0;
`;

export default PostView;
