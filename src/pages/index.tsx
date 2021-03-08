import React from "react";
import type { GetStaticProps } from "next";

import { Gallery, getSettings } from "lib/contentful";
import {
  getPage,
  getNews,
  Intention,
  News,
  SEOIndexFields,
  Announcement,
} from "lib/contentful";
import IndexView from "views/index";
import {
  getAnnouncements,
  getGalleries,
  getIntentions,
  getSchedule,
} from "lib/contentful/api";
import type { Document as RichTextDocument } from "@contentful/rich-text-types";

interface PostMetadata {
  createdAt: string;
}

export interface IndexViewAnnouncementPostsProps {
  post: Announcement;
  metadata: PostMetadata;
}

export interface IndexViewIntensionsPostsProps {
  post: Intention;
  metadata: PostMetadata;
}

export interface IndexViewNewsProps {
  post: News;
  metadata: PostMetadata;
}

export interface IndexViewGalleryProps {
  post: Gallery;
  metadata: PostMetadata;
}
interface IndexProps {
  announcementPosts: Array<IndexViewAnnouncementPostsProps>;
  intensionsPosts: Array<IndexViewIntensionsPostsProps>;
  newsPosts: Array<IndexViewNewsProps>;
  galleryPosts: Array<IndexViewGalleryProps>;
  schedule: {
    confession: RichTextDocument;
    devotions: RichTextDocument;
    masses: RichTextDocument;
  };
  fields: SEOIndexFields;
}

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const settings = await getSettings();
  const postsPerPage = settings.fields.postsPerPage;

  const announcementPosts = await getAnnouncements({
    perPage: 1,
  });

  const intensionsPosts = await getIntentions({
    perPage: 1,
  });

  const newsPosts = await getNews({
    perPage: postsPerPage,
  });

  const galleryPosts = await getGalleries({
    perPage: postsPerPage,
  });

  const schedule = await getSchedule();

  const page = await getPage("/");

  return {
    props: {
      announcementPosts: announcementPosts.items.map((item) => {
        return {
          post: {
            title: item.fields.title,
            slug: item.fields.slug,
            seoDescription: item.fields.seoDescription
              ? item.fields.seoDescription
              : "",
            thumbnail: item.fields.thumbnail,
            content: item.fields.content,
          },
          metadata: {
            createdAt: item.sys.createdAt,
          },
        };
      }),
      intensionsPosts: intensionsPosts.items.map((item) => {
        return {
          post: {
            title: item.fields.title,
            slug: item.fields.slug,
            seoDescription: item.fields.seoDescription
              ? item.fields.seoDescription
              : "",
            thumbnail: item.fields.thumbnail,
            content: item.fields.content,
          },
          metadata: {
            createdAt: item.sys.createdAt,
          },
        };
      }),
      newsPosts: newsPosts.items.map((item) => {
        return {
          post: {
            title: item.fields.title,
            slug: item.fields.slug,
            content: item.fields.content,
            author: item.fields.author ? item.fields.author : null,
            seoDescription: item.fields.seoDescription
              ? item.fields.seoDescription
              : "",
            thumbnail: item.fields.thumbnail,
          },
          metadata: {
            createdAt: item.sys.createdAt,
          },
        };
      }),
      galleryPosts: galleryPosts.items.map((item) => {
        return {
          post: {
            title: item.fields.title,
            slug: item.fields.slug,
            seoDescription: item.fields.seoDescription
              ? item.fields.seoDescription
              : "",
            thumbnail: item.fields.thumbnail,
            images: item.fields.images,
          },
          metadata: {
            createdAt: item.sys.createdAt,
          },
        };
      }),
      schedule: {
        confession: schedule.fields.confession,
        devotions: schedule.fields.devotions,
        masses: schedule.fields.masses,
      },
      fields: {
        title: page.fields.title,
        seoDescription: page.fields.seoDescription,
      },
    },
  };
};

export default function Index({
  fields,
  intensionsPosts,
  announcementPosts,
  newsPosts,
  galleryPosts,
  schedule,
}: IndexProps) {
  return (
    <IndexView
      fields={fields}
      newsPosts={newsPosts}
      galleryPosts={galleryPosts}
      intensionsPosts={intensionsPosts}
      announcementPosts={announcementPosts}
      schedule={schedule}
    />
  );
}
