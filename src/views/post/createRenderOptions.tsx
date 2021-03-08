import type { Options as RichTextRenderOptions } from "@contentful/rich-text-react-renderer";
import { Asset } from "contentful";
import React from "react";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import Image from "views/contentBlocks/Image";

interface CreateRenderOptionsParams {
  thumbnail: string;
}

interface CreateRenderOptions {
  (options: CreateRenderOptionsParams): RichTextRenderOptions;
}

const createRenderOptions: CreateRenderOptions = ({ thumbnails }) => ({
  renderMark: {
    [MARKS.CODE]: (text) => <code className="cypress-exclude">{text}</code>,
  },
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const imageData: Asset = node.data.target;
      return (
        <Image
          src={imageData.fields.file.url}
          caption={imageData.fields.description}
          alt={imageData.fields.description}
          thumbnail={thumbnails[imageData.sys.id]}
          width={imageData.fields.file.details.image?.width ?? 0}
          height={imageData.fields.file.details.image?.height ?? 0}
        />
      );
    },
  },
});

export default createRenderOptions;
