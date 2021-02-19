import React, { FC } from "react";
import styled from "styled-components";

import SEO from "components/SEO";
import Layout from "components/Layout";
import { SEOIndexFields } from "lib/contentful/models";

export interface PostMetadata {
  createdAt: string;
}

export interface IndexViewProps {
  // posts: Array<IndexViewPostProps>;
  fields: SEOIndexFields;
}

const IndexView: FC<IndexViewProps> = ({ fields }) => {
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
};

export default IndexView;
