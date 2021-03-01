import React from "react";
import type { GetStaticProps, GetStaticPaths } from "next";

import { getNews, getPage, getSettings } from "lib/contentful";
import type { SEOIndexFields } from "lib/contentful";
import Layout from "components/Layout";

interface IndexProps {
  currentPage: number;
  lastPage: number;
  fields: SEOIndexFields;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getNews({ select: "sys.id" });

  const paths: Array<{
    params: {
      paged: string;
    };
  }> = [];

  for (let i = 1; i <= Math.ceil(posts.items.length / 2); i++) {
    paths.push({
      params: {
        paged: String(i),
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IndexProps> = async ({
  params,
}) => {
  if (!params) {
    throw new Error("Params are missing");
  }

  const settings = await getSettings();
  const postsPerPage = settings.fields.postsPerPage;

  const posts = await getPosts({
    type: "blog",
    perPage: postsPerPage,
    currentPage: Number(params.paged),
  });

  const lastPage = Math.ceil(posts.total / postsPerPage);
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
      currentPage: Number(params.paged),
      lastPage,
      fields: {
        title: page.fields.title,
        seoDescription: page.fields.seoDescription,
      },
    },
  };
};

export default function BlogPostView({}: IndexProps) {
  return <Layout></Layout>;
}
