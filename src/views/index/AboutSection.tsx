import Typography from "components/Typography";
import React from "react";
import styled from "styled-components";

const AboutSection = () => (
  <Wrapper>
    <Column>
      <ImgWrapper>
        <Img src="/images/church_01.png" />
        <Decor src="/images/decor_01.svg" />
      </ImgWrapper>
    </Column>
    <Column>
      <TypographyGrid>
        <TypographyContainer>
          <Typography variant="h5" color="tertiary">
            O naszej parafii
          </Typography>
          <Typography variant="h3" color="tertiary">
            O naszej Parafii słów kilka...
          </Typography>
        </TypographyContainer>
        <Typography variant="body1" color="quaternary">
          Według legendy o początkach Krotoszyna miał on powstać z połączenia
          się dwóch osad, jedna z nich należała do rycerza Krota, a druga do
          jego syna i tak z połączenia tych dwóch osad powstał Krotoszyn.
          Pierwsza znana historykom wzmianka o wsi Crothoszino pochodzi z 1405
          roku. Była to znaczna wioska leżąca na terenie dzisiejszej ulicy
          Koźmińskiej. Posiadała własny kościół pw. św. Marii Magdaleny. Żyjący
          na przełomie XIV i XV wieku Wierzbięta z Krotoszyna był bogatym i
          poważanym rycerzem.
        </Typography>
      </TypographyGrid>
    </Column>
  </Wrapper>
);

export default AboutSection;

const Wrapper = styled.section`
  grid-column: content;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  column-gap: 120px;
  row-gap: 50px;
  align-items: center;
  padding: 58px 20px;
`;

const Column = styled.div``;

const ImgWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Img = styled.img``;

const TypographyGrid = styled.div`
  display: grid;
  gap: 15px;
`;

const TypographyContainer = styled.div``;

const Decor = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(40%, 40%);
  z-index: -1;
`;
