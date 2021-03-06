import { Asset, Entry } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
export interface Author {
  name: string;
  image: Asset;
}

export interface News {
  title: string;
  slug: string;
  content?: RichTextDocument;
  author?: Author | null;
  seoDescription: string;
  thumbnail: Asset;
}

export interface Gallery {
  title: string;
  slug: string;
  seoDescription?: string;
  thumbnail: Asset;
  images: Array<Asset>;
}

export interface Intention {
  title: string;
  slug: string;
  seoDescription?: string;
  thumbnail: Asset;
  content: RichTextDocument;
}

export interface Announcement {
  title: string;
  slug: string;
  seoDescription?: string;
  thumbnail: Asset;
  content: RichTextDocument;
}

export interface Page {
  title: string;
  slug: string;
  thumbnail: Asset;
  seoDescription: string;
  content: RichTextDocument;
  subpages: Array<Entry<Page>>;
}

export interface SEOIndexFields {
  title: string;
  seoDescription: string;
}

export interface Navigation {
  elements: Array<Entry<Page>>;
}

export interface Settings {
  title: string;
  logo: Asset;
  description: RichTextDocument | undefined;
  postsPerPage: number;
  investor: string;
  ogImage: Asset;
  ogTwitter: string;
}

export interface Schedule {
  slug: string;
  confession: RichTextDocument;
  devotions: RichTextDocument;
  masses: RichTextDocument;
}

export interface Author {
  name: string;
  image: Asset;
}

export interface Subcategory {
  name: string;
}
