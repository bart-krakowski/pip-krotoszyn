import React from "react";
import type { GetStaticProps } from "next";

import { getSettings } from "lib/contentful";
// import { IndexView, IndexViewPostProps } from "views/index/IndexView";
import { getPage, getPosts } from "lib/contentful";
import { SEOIndexFields } from "lib/contentful/models";
import IndexView from "views/index";
interface PostMetadata {
  createdAt: string;
}

interface Post {
  title: string;
  slug: string;
}

interface IndexViewPostProps {
  post: Post;
  metadata: PostMetadata;
}

interface IndexProps {
  posts: Array<IndexViewPostProps>;
  fields: SEOIndexFields;
}

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const settings = await getSettings();
  const postsPerPage = settings.fields.postsPerPage;

  const posts = await getPosts({
    perPage: postsPerPage,
  });

  const page = await getPage("/");

  return {
    props: {
      posts: posts.items.map((item) => {
        return {
          post: {
            title: item.fields.title,
            slug: item.fields.slug,
          },
          metadata: {
            createdAt: item.sys.createdAt,
          },
        };
      }),
      fields: {
        title: page.fields.title,
        seoDescription: page.fields.seoDescription,
      },
    },
  };
};

export default function Index({ fields }: IndexProps) {
  return <IndexView fields={fields} />;
}
