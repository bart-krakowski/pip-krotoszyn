import React, { FC } from "react";
import styled from "styled-components";

import Typography from "components/Typography";
import List from "components/List";

const Footer: FC = () => (
  <Wrapper>
    <Column>
      <Typography variant="h4" color="secondary">
        Kontakt
      </Typography>
      <Typography variant="body1" color="secondary">
        Parafia Św. Ap. Piotra i Pawła
        <br />
        ul. Klasztorna 3<br />
        63-700 Krotoszyn
        <br />
        <br />
        <br />
        diecezja kaliska, dekanat krotoszyński,
        <br />
        woj. wielkopolskie
        <br />
        tel.: 663 043 083 (parafialny)
        <br />
        tel.: 62 725 27 66 (w godzinach urzędowania biura parafialnego)
        <br />
        <br />
        <br />
        Konto bankowe parafii: Bank Spółdzielczy w Krotoszynie:
        <br />
        51 8410 0003 2001 0002 5465 0001
        <br />
      </Typography>
    </Column>
    <Column>
      <Typography variant="h4" color="secondary">
        Słowo na dziś
      </Typography>
      <Typography variant="body1" color="secondary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu aliquet in
        etiam blandit. Ut velit amet nam fermentum lorem. Egestas id augue
        aliquam sit. Luctus odio feugiat curabitur in commodo pretium id aliquam
        nibh. Tincidunt lacus, lorem massa malesuada lorem sit.
      </Typography>
    </Column>
    <Column>
      <Typography variant="h4" color="secondary">
        Zobacz także:
      </Typography>
      <List items={["lorem", "ipsum"]} />
    </Column>
  </Wrapper>
);

export default Footer;

const Wrapper = styled.footer`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  background-color: ${({ theme }) => theme.palette.brand.primary};
  padding: 36px;
  gap: 72px;
`;

const Column = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 13px;
`;
