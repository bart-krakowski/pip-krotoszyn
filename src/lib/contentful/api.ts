import { createClient, Entry } from "contentful";
import {
  News,
  Navigation,
  Settings,
  Gallery,
  Intention,
  Announcement,
  Schedule,
} from "./models";
import { getAssetBlocks, imageToDataUrl } from "./utils";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_DELIVERY_API_TOKEN || "",
});

export interface GetNewsProps {
  perPage?: number;
  currentPage?: number;
  select?: string;
}

export const getNews = async ({
  perPage,
  currentPage = 1,
  select,
}: GetNewsProps) => {
  return await client.getEntries<News>({
    content_type: "news",
    order: "-sys.createdAt",
    limit: perPage,
    skip: perPage ? Math.abs(currentPage - 1) * perPage : 0,
    select: select,
  });
};

export interface GetSingleNewsParams {
  slug: string;
}
export const getSingleNews = async ({ slug }: GetSingleNewsParams) => {
  const response = await client.getEntries<News>({
    content_type: "news",
    limit: 1,
    "fields.slug[in]": slug,
  });

  const [post] = response.items;

  return post;
};

export interface GetGalleriesProps {
  perPage?: number;
  currentPage?: number;
  select?: string;
}

export const getGalleries = async ({
  perPage,
  currentPage = 1,
  select,
}: GetGalleriesProps) => {
  return await client.getEntries<Gallery>({
    content_type: "gallery",
    order: "-sys.createdAt",
    limit: perPage,
    skip: perPage ? Math.abs(currentPage - 1) * perPage : 0,
    select: select,
  });
};

export interface GetIntentionsProps {
  perPage?: number;
  currentPage?: number;
  select?: string;
}

export const getIntentions = async ({
  perPage,
  currentPage = 1,
  select,
}: GetIntentionsProps) => {
  return await client.getEntries<Intention>({
    content_type: "intention",
    order: "-sys.createdAt",
    limit: perPage,
    skip: perPage ? Math.abs(currentPage - 1) * perPage : 0,
    select: select,
  });
};

export interface GetAnnouncementsProps {
  perPage?: number;
  currentPage?: number;
  select?: string;
}

export const getAnnouncements = async ({
  perPage,
  currentPage = 1,
  select,
}: GetIntentionsProps) => {
  return await client.getEntries<Announcement>({
    content_type: "announcement",
    order: "-sys.createdAt",
    limit: perPage,
    skip: perPage ? Math.abs(currentPage - 1) * perPage : 0,
    select: select,
  });
};

export const getNavigation = async (slug: string) => {
  const response = await client.getEntries<Navigation>({
    content_type: "navigation",
    limit: 1,
    "fields.slug[in]": slug,
  });

  const [navigation] = response.items;

  return navigation;
};

export type GetImagesThumbnailsParams = {
  post: Entry<News>;
  thumbnailWidth?: number;
  thumbnailQuality?: number;
};

export type Thumbnails = {
  [id: string]: string;
};

/**
 * Gets all post images as base64 data url with specified width (Defaults to 22px)
 */
export const getImagesThumbnails = async ({
  post,
  thumbnailWidth = 22,
  thumbnailQuality = 20,
}: GetImagesThumbnailsParams): Promise<Thumbnails> => {
  const { fields } = post;

  type ThumbnailDefinition = [string, string];
  type ThumbnailsRequests = Array<Promise<ThumbnailDefinition>>;

  const assetsBlocks = getAssetBlocks(fields.content?.content ?? []);

  const thumbnailDescriptors = assetsBlocks.map((target) => {
    return {
      thumbnailUrl: `https:${target.fields.file.url}?fm=jpg&w=${thumbnailWidth}&q=${thumbnailQuality}`,
      imageId: target.sys.id,
    };
  });

  const thumbnailsRequests: ThumbnailsRequests =
    thumbnailDescriptors.reduce(
      (result, { thumbnailUrl, imageId }): ThumbnailsRequests => {
        const thumbnailRequest$ = imageToDataUrl({
          id: imageId,
          url: thumbnailUrl,
        });

        result.push(thumbnailRequest$);

        return result;
      },
      [] as ThumbnailsRequests
    ) ?? [];

  const thumbnailsResponse = await Promise.all(thumbnailsRequests);

  return thumbnailsResponse.reduce((thumbnails, [id, base64Url]) => {
    thumbnails[id] = base64Url;
    return thumbnails;
  }, {} as Thumbnails);
};

export const getSettings = async () => {
  const response = await client.getEntries<Settings>({
    content_type: "settings",
    limit: 1,
    "fields.slug[in]": "main",
  });

  const [settings] = response.items;

  return settings;
};

export const getSchedule = async () => {
  const response = await client.getEntries<Schedule>({
    content_type: "schedule",
    limit: 1,
    "fields.slug[in]": "main",
  });

  const [settings] = response.items;

  return settings;
};

export const getPage = async (slug: string) => {
  const response = await client.getEntries<Page>({
    content_type: "page",
    limit: 1,
    "fields.slug[in]": slug,
  });

  const [page] = response.items;
  return page;
};
