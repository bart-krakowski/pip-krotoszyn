import React, { FC, useMemo } from "react";
import styled from "styled-components";

interface RawHtmlProps {
  children: string;
  aspectRatio?: string;
}

const aspectRatioPattern = /(\d+):(\d+)/;

const RawHtml: FC<RawHtmlProps> = ({ children, aspectRatio }) => {
  const html = useMemo(() => ({ __html: children }), [children]);
  const results = aspectRatio ? aspectRatioPattern.exec(aspectRatio) : null;
  if (results) {
    const width = parseInt(results[1], 10);
    const height = parseInt(results[2], 10);

    return (
      <RelativeContainer
        paddingBottom={`${(height / width) * 100}%`}
        dangerouslySetInnerHTML={html}
      />
    );
  }

  return <div dangerouslySetInnerHTML={html} />;
};

const RelativeContainer = styled.div<{ paddingBottom: string }>`
  position: relative;
  height: 0;
  padding-bottom: ${(p) => p.paddingBottom};
  overflow: hidden;

  > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default RawHtml;
