import React, { FC } from "react";
import styled from "styled-components";
import Link from "next/link";

import Typography from "components/Typography";

interface HeroProps {
  title: string;
  image: string;
  date: string;
  category: {
    name: string;
    slug: string;
  };
}
const Hero: FC<HeroProps> = ({ title, image, date, category }) => (
  <Wrapper>
    <TopBar>
      <Typography variant="body1" color="secondary">
        {new Date(date).toLocaleDateString()}
      </Typography>
      <TopBarInner>
        <Link href={`/${category.slug}`} passHref>
          <StyledLink>{category.name}</StyledLink>
        </Link>
        <Typography variant="body1" color="secondary">
          / {title}
        </Typography>
      </TopBarInner>
    </TopBar>
    <HrLine />
    <TitleWrapper>
      <Typography variant="h2" color="secondary" center>
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
  min-height: 60vh;
  background-color: ${({ theme }) => theme.palette.brand.primary};
  padding: 65px 20px 0;

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

const TopBar = styled.div`
  display: grid;
  grid-column: content;
  grid-auto-flow: column;
  justify-content: space-between;
`;

const TopBarInner = styled.div`
  display: flex;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 200px;
  white-space: nowrap;
`;

const StyledLink = styled.a`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.palette.common.white};
`;

const HrLine = styled.hr`
  grid-column: content;
  width: 100%;
`;

const TitleWrapper = styled.div`
  grid-column: content;
`;
