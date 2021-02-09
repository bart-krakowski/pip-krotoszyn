import { Asset, Entry } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
export interface Author {
  name: string;
  image: Asset;
}

export interface BlogPost {
  title: string;
  slug: string;
  excerpt?: string;
  content?: RichTextDocument;
  author?: Author;
  seoDescription: string;
}

export interface Page {
  title: string;
  slug: string;
}

export interface SinglePage {
  title: string;
  slug: string;
  headline: string;
  content: RichTextDocument | undefined;
  seoDescription: string;
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

export interface Author {
  name: string;
  image: Asset;
}

export interface Subcategory {
  name: string;
}
