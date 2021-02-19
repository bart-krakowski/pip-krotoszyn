import { FC } from "react";
import styled from "styled-components";

const Footer: FC = () => (
  <Wrapper>
    <Column></Column>
    <Column></Column>
    <Column></Column>
  </Wrapper>
);

export default Footer;

const Wrapper = styled.footer`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  background-color: ${({ theme }) => theme.palette.brand.primary};
`;

const Column = styled.div``;
