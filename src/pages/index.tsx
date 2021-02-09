import React from "react";
import type { GetStaticProps } from "next";

import { getSettings } from "lib/contentful";
// import { IndexView, IndexViewPostProps } from "views/index/IndexView";
import { getPage } from "lib/contentful";
import { getPosts } from "lib/contentful";
import Layout from "components/Layout";
import SEO from "components/SEO";
import { SEOIndexFields } from "lib/contentful/models";
// import Navigation from "components/Navigation";
// import Footer from "components/Footer";

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
  lastPage: number;
}

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const settings = await getSettings();
  const postsPerPage = settings.fields.postsPerPage;

  const posts = await getPosts({
    perPage: postsPerPage,
  });

  const page = await getPage("/");
  const lastPage = Math.ceil(posts.total / postsPerPage);

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
      lastPage,
    },
  };
};

export default function Index({ fields }: IndexProps) {
  return (
    <Layout>
      <SEO
        subTitle={fields.title}
        seoDescription={fields.seoDescription}
        type="page"
      />
      {/* <BlogList>
        {posts.map(({ post, metadata }) => (
          <BlogListItem
            key={post.slug}
            type={type}
            title={post.title}
            slug={post.slug}
            date={metadata.createdAt}
          />
        ))}
      </BlogList> */}
    </Layout>
  );
}
