import React, { FC } from "react";
import styled from "styled-components";

import Footer from "components/Footer";
import { Navigation } from "components/Navigation";

const PageLayout: FC = ({ children }) => (
  <Wrapper>
    <NavigationSlot>
      <Navigation />
    </NavigationSlot>
    <ChildrenSlot>{children}</ChildrenSlot>
    <FooterSlot>
      <Footer />
    </FooterSlot>
  </Wrapper>
);

const Wrapper = styled.div``;

const NavigationSlot = styled.div`
  position: relative;
  z-index: 2;
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
