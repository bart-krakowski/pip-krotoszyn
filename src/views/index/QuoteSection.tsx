import Typography from "components/Typography";
import React from "react";
import styled from "styled-components";

const QuoteSection = () => (
  <Wrapper>
    <Container>
      <Inner>
        <Typography variant="h2" color="secondary" center>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst
          diam, etiam dictumst ultricies at.
        </Typography>
      </Inner>
      <Img src="/images/church_02.png" />
    </Container>
  </Wrapper>
);

export default QuoteSection;

const Wrapper = styled.section`
  grid-column: full;
  margin-bottom: 88px;
  padding: 85px 25px;
  background: linear-gradient(
      0deg,
      rgba(12, 43, 85, 0.8),
      rgba(12, 43, 85, 0.8)
    ),
    url("/images/church_01.png");
  background-size: cover;
  background-position: center;
`;

const Container = styled.div`
  position: relative;
  max-width: ${({ theme }) => theme.breakpoints.values.max}px;
  margin: auto;
  padding-right: 220px;
`;

const Inner = styled.div`
  padding-right: 54px;
`;

const Img = styled.img`
  position: absolute;
  max-width: 220px;
  top: 37px;
  right: 0;
`;
