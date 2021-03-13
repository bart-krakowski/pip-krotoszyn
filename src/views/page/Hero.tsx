import React, { FC } from "react";
import styled from "styled-components";

import Typography from "components/Typography";

interface HeroProps {
  title: string;
  image: string;
}
const Hero: FC<HeroProps> = ({ title, image }) => (
  <Wrapper>
    <TitleWrapper>
      <Typography variant="h2" color="secondary">
        {title}
      </Typography>
    </TitleWrapper>
    <Image src={image} />
  </Wrapper>
);

export default Hero;

const Wrapper = styled.header`
  position: relative;
  grid-column: full;
  display: grid;
  grid-template-columns:
    [full-start] minmax(0, 1fr) [content-start] minmax(
      0,
      ${({ theme }) => theme.breakpoints.values.max}px
    )
    [content-end] minmax(0, 1fr) [full-end];
  row-gap: 20px;
  background-color: ${({ theme }) => theme.palette.brand.primary};
  padding: 65px 40px 0;

  ::after {
    position: absolute;
    bottom: -1px;
    left: 0;
    height: 70px;
    width: 100%;
    background-color: ${({ theme }) => theme.palette.common.white};
    content: "";
  }
`;

const Image = styled.img`
  position: relative;
  grid-column: content;
  width: 100%;
  z-index: 1;
`;

const TitleWrapper = styled.div`
  grid-column: full;
`;
