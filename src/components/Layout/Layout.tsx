import React, { FC } from "react";
import styled from "styled-components";

import Footer from "components/Footer";

const PageLayout: FC = ({ children }) => (
  <Wrapper>
    <NavigationContainer></NavigationContainer>
    <ChildrenSlot>{children}</ChildrenSlot>
    <FooterSlot>
      <Footer />
    </FooterSlot>
  </Wrapper>
);

const Wrapper = styled.div``;

const NavigationContainer = styled.div`
  width: calc(${({ theme }) => theme.breakpoints.values.max}px + 20px);
  max-width: 100%;
  margin: 0 auto;
  padding: 0 40px;

  ${(p) => p.theme.breakpoints.up("desktop")} {
    padding: 0px;
  }
`;

const FooterSlot = styled.div``;

const ChildrenSlot = styled.div`
  min-height: 100vh;
  margin: auto;

  ${({ theme }) => theme.breakpoints.up("desktop")} {
    grid-template-rows: auto 1fr auto;
  }
`;

export default PageLayout;
