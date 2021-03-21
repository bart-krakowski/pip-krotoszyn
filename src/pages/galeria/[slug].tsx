import React from "react";
import type { GetStaticProps, GetStaticPaths } from "next";

import { getGalleries } from "lib/contentful";
import { PostGallertView, PostViewProps } from "views/post";
import { getSingleGallery } from "lib/contentful/api";
import Layout from "components/Layout";
import { PostGallertViewProps } from "views/post/PostGalleryView";

// Typescript is complaining about missing index signature if we'll use interface here
type QueryParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getGalleries({});

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
  PostGallertViewProps,
  QueryParams
> = async ({ params }) => {
  if (!params) {
    throw new Error("Params are missing");
  }

  const post$ = getSingleGallery({ slug: params.slug });
  const post = await post$;

  return {
    props: {
      post: {
        slug: post.fields.slug,
        title: post.fields.title,
        thumbnail: post.fields.thumbnail,
        seoDescription: post.fields.seoDescription
          ? post.fields.seoDescription
          : "",
        images: post.fields.images,
      },
      metadata: {
        createdAt: post.sys.createdAt,
      },
      category: {
        name: "Galeria",
        slug: "galeria",
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
      <PostGallertView post={post} metadata={metadata} category={category} />
    </Layout>
  );
}
