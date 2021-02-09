import React from "react";
import type { GetStaticProps, GetStaticPaths } from "next";

import { getPage, getPosts, getSettings } from "lib/contentful";
import type { SEOIndexFields } from "lib/contentful";
import { IndexView } from "views/index/IndexView";
import type { IndexViewPostProps } from "views/index/IndexView";

import Layout from "components/StickyPageLayout";
import Footer from "components/Footer";
import Profile from "components/Profile";
import Navigation from "components/Navigation";
import { useSettings } from "contexts/settingsContext";

interface IndexProps {
  posts: Array<IndexViewPostProps>;
  currentPage: number;
  lastPage: number;
  fields: SEOIndexFields;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts({ type: "blog", select: "sys.id" });

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

export default function BlogPostView({
  posts,
  currentPage,
  lastPage,
  fields,
}: IndexProps) {
  const settings = useSettings();

  return (
    <Layout
      profile={
        <Profile
          twitter={settings.socialMedia.twitter.url}
          linkedin={settings.socialMedia.linkedin.url}
          description={settings.description}
          logo={settings.logo.fields.file.url}
          investor={settings.investor}
          title={settings.title}
        />
      }
      navigation={<Navigation />}
      footer={
        <Footer
          twitter={settings.socialMedia.twitter.url}
          linkedin={settings.socialMedia.linkedin.url}
        />
      }
    >
      <IndexView
        type="blog"
        posts={posts}
        currentPage={currentPage}
        lastPage={lastPage}
        fields={fields}
      />
    </Layout>
  );
}
