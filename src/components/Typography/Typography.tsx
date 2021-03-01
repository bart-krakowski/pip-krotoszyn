import React, { ElementType, HTMLAttributes, forwardRef } from "react";
import styled, { DefaultTheme } from "styled-components";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant: keyof DefaultTheme["typography"];
  as?: ElementType<{ className: string }>;
  className?: string;
  color?: keyof DefaultTheme["palette"]["text"];
  center?: boolean;
}

const getElementTag = (variant: TypographyProps["variant"]) => {
  switch (variant) {
    case "body1":
      return "p";
    case "body2":
    case "h1":
      return "h1";
    case "h2":
      return "h2";
    case "h3":
      return "h3";
    case "h4":
      return "h4";
    case "h5":
      return "h5";
    case "h6":
      return "h6";

    default:
      return "div";
  }
};

const RawTypography = forwardRef<HTMLElement, TypographyProps>(
  ({ variant, as, ...rest }, ref) => {
    const Component: any = as ?? getElementTag(variant);
    return <Component ref={ref} {...rest} />;
  }
);

const Typography = styled(RawTypography)`
  ${({ theme, variant }) => theme.typography[variant]};
  color: ${({ theme, color = "primary" }) => theme.palette.text[color]};
  text-align: ${({ center }) => (center ? "center" : undefined)};

  ${({ theme }) => theme.breakpoints.down("desktop")} {
    ${({ theme, variant }) => (theme.typography[variant] as any)?.mobile ?? ""}
  }
`;

export default Typography;
