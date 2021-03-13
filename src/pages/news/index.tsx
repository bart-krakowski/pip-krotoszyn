import React from "react";
import type { GetStaticProps } from "next";

import { Page } from "lib/contentful";
import { getPage, getNews, News } from "lib/contentful";
import PageView from "views/page";

interface PostMetadata {
  createdAt: string;
}

export interface PageViewNewsProps {
  post: News;
  metadata: PostMetadata;
}

interface IndexProps {
  posts: Array<PageViewNewsProps>;
  page: Page;
}

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const posts = await getNews({
    perPage: 100,
  });

  const page = await getPage("/");

  return {
    props: {
      posts: posts.items.map((item) => {
        return {
          post: {
            title: item.fields.title,
            slug: item.fields.slug,
            content: item.fields.content,
            author: item.fields.author ? item.fields.author : null,
            seoDescription: item.fields.seoDescription
              ? item.fields.seoDescription
              : "",
            thumbnail: item.fields.thumbnail,
          },
          metadata: {
            createdAt: item.sys.createdAt,
          },
        };
      }),
      page: page.fields,
      fields: {
        title: page.fields.title,
        seoDescription: page.fields.seoDescription,
      },
    },
  };
};

export default function Index({ posts, page }: IndexProps) {
  return <PageView page={page} posts={posts} />;
}
