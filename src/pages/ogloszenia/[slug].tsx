import React from "react";
import type { GetStaticProps, GetStaticPaths } from "next";

import { getAnnouncements } from "lib/contentful";
import PostView, { PostViewProps } from "views/post";
import { getSingleAnnoucement } from "lib/contentful/api";
import Layout from "components/Layout";

// Typescript is complaining about missing index signature if we'll use interface here
type QueryParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAnnouncements({});

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

  const post$ = getSingleAnnoucement({ slug: params.slug });
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
        name: "Ogłoszenia",
        slug: "ogloszenia",
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
