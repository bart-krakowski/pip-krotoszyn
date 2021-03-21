import React from "react";
import type { GetStaticProps, GetStaticPaths } from "next";

import { getIntentions } from "lib/contentful";
import PostView, { PostViewProps } from "views/post";
import { getSingleIntension } from "lib/contentful/api";
import Layout from "components/Layout";

type QueryParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getIntentions({});

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

  const post$ = getSingleIntension({ slug: params.slug });
  const post = await post$;

  return {
    props: {
      post: {
        slug: post.fields.slug,
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
        name: "Intencje",
        slug: "intencje",
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
