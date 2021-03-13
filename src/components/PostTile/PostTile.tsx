import React, { FC } from "react";
import styled, { css } from "styled-components";

import Typography from "components/Typography";
import { Asset } from "contentful";

interface PostTileProps {
  title: string;
  img: Asset;
  date: string;
  slug: string;
  variant?: "gallery" | "default";
}
const PostTile: FC<PostTileProps> = ({
  title,
  img,
  date,
  slug,
  variant = "default",
}) => (
  <Wrapper href={`/news/${slug}`}>
    <Img src={img.fields.file.url} />
    <Content variant={variant}>
      {variant === "default" && (
        <Typography variant="date">
          {new Date(date).toLocaleDateString()}
        </Typography>
      )}
      <Typography variant="h5">{title}</Typography>
    </Content>
  </Wrapper>
);

export default PostTile;

const Wrapper = styled.a`
  display: block;
  position: relative;
`;

const Img = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
  max-height: 228px;
`;

type ContentProps = {
  variant: "gallery" | "default";
};
const Content = styled.div<ContentProps>`
  position: absolute;
  background-color: ${({ theme }) => theme.palette.common.white};
  padding: 10px 19px;
  box-shadow: 0px 0px 10px rgba(118, 118, 118, 0.2);

  ${({ variant }) =>
    variant === "default" &&
    css`
      padding: 10px;
      right: -17px;
      bottom: -16px;
      max-width: 173px;
    `}

  ${({ variant }) =>
    variant === "gallery" &&
    css`
      padding: 30px;
      text-align: center;
      right: 50%;
      bottom: 0;
      width: 100%;
      max-width: calc(100% - 60px);
      transform: translate(50%, 50%);
    `}
`;
