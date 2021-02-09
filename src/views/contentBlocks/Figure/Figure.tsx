import React, { forwardRef, ReactNode } from "react";
import styled from "styled-components";
interface FigureProps {
  caption: string;
  children: ReactNode;
}

const Figure = forwardRef<HTMLElement, FigureProps>(
  ({ caption, children }, ref) => {
    return (
      <FigureLayout ref={ref}>
        {children}
        <FigCaption>{caption}</FigCaption>
      </FigureLayout>
    );
  }
);

const FigureLayout = styled.figure`
  margin: 32px 0;
`;

const FigCaption = styled.figcaption`
  ${(p) => p.theme.typography.body2}
  margin: 12px 0;
  color: ${(p) => p.theme.palette.text.secondary};
  text-align: center;
`;

export default Figure;
