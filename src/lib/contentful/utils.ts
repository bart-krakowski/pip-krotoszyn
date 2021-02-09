import { TopLevelBlock } from "@contentful/rich-text-types";
import { Asset } from "contentful";

export const arrayBufferToBase64 = ({
  arrayBuffer,
  contentType,
}: {
  arrayBuffer: ArrayBuffer;
  contentType: string;
}) => {
  const base64Data = Buffer.from(arrayBuffer).toString("base64");
  return `data:${contentType};base64,${base64Data}`;
};

export const imageToDataUrl = async ({
  id,
  url,
}: {
  id: string;
  url: string;
}) => {
  try {
    const response = await fetch(url);

    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") ?? "image/jpeg";
    const base64Url = arrayBufferToBase64({ arrayBuffer, contentType });

    return [id, base64Url] as [string, string];
  } catch (e) {
    console.warn(`Failed to pre-load image: ${id}. Using external url.`);
    console.warn(`Reason: ${e}`);
    return [id, url] as [string, string];
  }
};

export const getAssetBlocks = (topLevelBlocks: TopLevelBlock[]) => {
  return topLevelBlocks
    .filter(({ nodeType }) => {
      return nodeType === "embedded-asset-block";
    })
    .map(
      (record): Asset => {
        return record.data.target;
      }
    );
};
