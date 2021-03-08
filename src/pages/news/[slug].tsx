import React from "react";
import type { GetStaticProps, GetStaticPaths } from "next";

import { getNews } from "lib/contentful";
import PostView, { PostViewProps } from "views/post/PostView";
import { getSingleNews } from "lib/contentful/api";
import Layout from "components/Layout";

// Typescript is complaining about missing index signature if we'll use interface here
type QueryParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getNews({});

  const paths = posts.items.map(({ fields }: { fields: any }) => ({
    params: {
      slug: fields.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PostViewProps,
  QueryParams
> = async ({ params }) => {
  if (!params) {
    throw new Error("Params are missing");
  }

  const post$ = getSingleNews({ slug: params.slug });
  const post = await post$;

  return {
    props: {
      post: {
        slug: post.fields.slug,
        author: post.fields.author,
        title: post.fields.title,
        content: post.fields.content,
        thumbnail: post.fields.thumbnail,
        seoDescription: post.fields.seoDescription
          ? post.fields.seoDescription
          : "",
      },
      metadata: {
        createdAt: post.sys.createdAt,
      },
      category: {
        name: "Aktualności",
        slug: "news",
      },
    },
  };
};

export default function BlogPostView({
  post,
  metadata,
  category,
}: PostViewProps) {
  return (
    <Layout>
      <PostView post={post} metadata={metadata} category={category} />
    </Layout>
  );
}
