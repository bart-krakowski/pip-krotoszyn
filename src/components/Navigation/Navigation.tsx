import { useNavigation } from "contexts/navigationContext";
import NextLink from "next/link";
import React, { FC } from "react";
import styled from "styled-components";

const Footer: FC = () => {
  const items = useNavigation();

  return (
    <Wrapper>
      <Inner>
        <List>
          {items.map((el) => (
            <Item>
              <NextLink passHref href={el.slug}>
                <Link>{el.title}</Link>
              </NextLink>
            </Item>
          ))}
        </List>
      </Inner>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.nav`
  display: grid;
  background-color: ${({ theme }) => theme.palette.brand.primary};
  grid-column: full;
  grid-template-columns:
    [full-start] minmax(0, 1fr) [content-start] minmax(
      0,
      ${({ theme }) => theme.breakpoints.values.max}px
    )
    [content-end] minmax(0, 1fr) [full-end];
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;

const Inner = styled.div`
  grid-column: content;
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  padding: 15px 36px;
  gap: 72px;
`;

const List = styled.ul`
  list-style-type: none;
  display: grid;
  grid-auto-flow: column;
  gap: 20px;
  padding: 0;
  margin-left: auto;
`;

const Item = styled.li``;

const Link = styled.a`
  ${({ theme }) => theme.typography.menu};
  color: ${({ theme }) => theme.palette.common.white};
`;
