import type { Entry, EntryCollection } from "contentful";
import type { BlogPost, Navigation, Settings } from "../models";

import blogPostsResponse from "./blogPostResponse.json";
import navigationResponse from "./navigationResponse.json";
import blogPostResponse from "./blogPostResponse.json";
import settingsResponse from "./settingsResponse.json";

export const createEntry = <T>(data: any): Entry<T> => {
  return {
    ...data,
    update: () =>
      new Promise(() => {
        throw new Error("update() is not implemented");
      }),
  } as Entry<T>;
};

export const createEntryCollection = <T>(data: any): EntryCollection<T> => {
  return {
    ...data,
    stringifySafe: () => {
      throw new Error("stringifySafe() is not implemented");
    },
    toPlainObject: () => blogPostResponse,
  } as EntryCollection<T>;
};

export const postsData = createEntryCollection<BlogPost>(blogPostsResponse);
export const getPosts = async (): Promise<EntryCollection<BlogPost>> => {
  return postsData;
};

export const navigationData = createEntry<Navigation>(navigationResponse);
export const getNavigation = async (
  slug: string
): Promise<Entry<Navigation>> => {
  if (slug !== "main") {
    throw new Error("Slug must be 'main'");
  }

  return navigationData;
};

export const postData = createEntry<BlogPost>(blogPostResponse);
export const getPost = async (slug: string): Promise<Entry<BlogPost>> => {
  if (slug !== "main") {
    throw new Error("Slug must be 'main'");
  }

  return postData;
};

export const settingsData = createEntry<Settings>(settingsResponse);
export const getSettings = async (): Promise<Entry<Settings>> => {
  return settingsData;
};
