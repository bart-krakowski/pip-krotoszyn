import React from "react";
import type { GetStaticProps, GetStaticPaths } from "next";

import { getPosts, getPost } from "lib/contentful";
import PostView, { PostViewProps } from "views/post/PostView";
import { getImagesThumbnails } from "lib/contentful/api";
import Layout from "components/Layout";

// Typescript is complaining about missing index signature if we'll use interface here
type QueryParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts({});

  const paths = posts.items.map(({ fields }) => ({
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

  const post$ = getPost({ slug: params.slug });
  const post = await post$;
  const thumbnails = await getImagesThumbnails({ post });

  return {
    props: {
      post: {
        title: post.fields.title,
        excerpt: post.fields.excerpt ?? "",
        content: post.fields.content,
        thumbnails,
        seoDescription: post.fields.seoDescription,
      },
      metadata: {
        createdAt: post.sys.createdAt,
      },
    },
  };
};

export default function BlogPostView({ post, metadata }: PostViewProps) {
  return (
    <Layout>
      <PostView post={post} metadata={metadata} />
    </Layout>
  );
}
