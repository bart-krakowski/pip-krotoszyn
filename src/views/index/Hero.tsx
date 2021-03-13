import React, { FC, useMemo } from "react";
import styled from "styled-components";

import Typography from "components/Typography";
import type { Document as RichTextDocument } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Tabs from "components/Tabs";

interface HeroProps {
  schedule: {
    confession: RichTextDocument;
    devotions: RichTextDocument;
    masses: RichTextDocument;
  };
}
const Hero: FC<HeroProps> = ({ schedule }) => {
  const confessionContent = useMemo(
    () =>
      schedule.confession
        ? documentToReactComponents(schedule.confession)
        : null,
    []
  );
  const devotionsContent = useMemo(
    () =>
      schedule.confession
        ? documentToReactComponents(schedule.confession)
        : null,
    []
  );
  const massesContent = useMemo(
    () =>
      schedule.confession
        ? documentToReactComponents(schedule.confession)
        : null,
    []
  );

  return (
    <Wrapper>
      <Container>
        <Typography variant="h1" color="secondary" center>
          Parafia pw. św. Apotostołów
          <br /> Piotra i Pawła w Krotoszynie
        </Typography>
      </Container>
      <TabsWrapper>
        <Tabs>
          <Tabs.Item image="/images/pulpit.jpg">{confessionContent}</Tabs.Item>
          <Tabs.Item image="/images/pulpit.jpg">{devotionsContent}</Tabs.Item>
          <Tabs.Item image="/images/pulpit.jpg">{massesContent}</Tabs.Item>
        </Tabs>
      </TabsWrapper>
    </Wrapper>
  );
};

export default Hero;

const Wrapper = styled.header`
  display: grid;
  grid-column: full;
  grid-template-columns:
    [full-start] minmax(0, 1fr) [content-start] minmax(
      0,
      ${({ theme }) => theme.breakpoints.values.max}px
    )
    [content-end] minmax(0, 1fr) [full-end];
`;

const Container = styled.div`
  position: relative;
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  height: 100%;
  background: linear-gradient(
      0deg,
      rgba(12, 43, 85, 0.85),
      rgba(12, 43, 85, 0.85)
    ),
    url("/images/church_03.jpg");
  background-size: cover;
  background-position: center;
  grid-column: full;
  min-height: 100vh;
`;

const TabsWrapper = styled.div`
  position: relative;
  grid-column: content;
  max-width: ${({ theme }) => theme.breakpoints.values.max}px;
`;
