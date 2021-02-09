import styled from "styled-components";

const HtmlStyledContent = styled.div`
  /* headings */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.palette.text.heading};
  }

  h1 {
    ${({ theme }) => theme.typography.h1}
    margin-top: 64px;
    margin-bottom: 32px;
  }

  h2 {
    ${({ theme }) => theme.typography.h2}
    margin-top: 64px;
    margin-bottom: 32px;
  }

  h3 {
    ${({ theme }) => theme.typography.h3}
    margin-top: 32px;
    margin-bottom: 8px;
  }

  h4 {
    ${({ theme }) => theme.typography.h4}
    margin-top: 32px;
    margin-bottom: 8px;
  }

  h5 {
    ${({ theme }) => theme.typography.h5}
    margin-top: 32px;
    margin-bottom: 8px;
  }

  h6 {
    ${({ theme }) => theme.typography.h6}
    margin-top: 32px;
    margin-bottom: 8px;
  }

  /* Lead */

  /* Paragraph */
  p {
    ${({ theme }) => theme.typography.body1};
    margin: 32px 0;
    color: ${({ theme }) => theme.palette.text.primary};
  }

  /* Quotes */
  blockquote {
    ${({ theme }) => theme.typography.body1};
    display: block;
    margin: 32px 0;
    padding: 6px 0 6px 34px;
    color: ${({ theme }) => theme.palette.text.primary};
    border-left: 2px ${({ theme }) => theme.palette.greys[200]} solid;

    p {
      margin: 0;
    }
  }

  /* Ordered list */
  ol {
    margin: 32px 0;
    padding-left: 36px;
    ${({ theme }) => theme.typography.body1};
    color: ${({ theme }) => theme.palette.text.primary};
    list-style: none;
    counter-reset: item;

    li {
      position: relative;
      margin-top: 8px;
      counter-increment: item;

      p {
        margin: 0;
      }

      :before {
        position: absolute;
        left: 0;
        color: ${({ theme }) => theme.palette.text.secondary};
        transform: translateX(calc(-100% - 8px));
        content: counter(item) ".";
      }
    }
  }

  /* Unordered list (bullet list) */
  ul {
    ${({ theme }) => theme.typography.body1};
    margin: 32px 0;
    padding: 0;
    color: ${({ theme }) => theme.palette.text.primary};
    list-style: none;

    li {
      position: relative;
      margin-bottom: 8px;
      padding-left: 36px;

      ul {
        margin: 8px 0 0;
      }

      &:last-of-type {
        margin-bottom: 0;
      }

      &::before {
        position: absolute;
        top: 16px;
        left: 12px;
        width: 4px;
        height: 4px;
        background: ${({ theme }) => theme.palette.text.secondary};
        border-radius: 50%;
        content: "";
      }
    }
  }

  /* Links */
  a {
    ${({ theme }) => theme.typography.body1};
    color: ${({ theme }) => theme.palette.text.secondary};
    text-decoration: underline;
  }

  /* HR - horizontal ruler */
  hr {
    height: 1px;
    margin: 64px 0;
    background: ${({ theme }) => theme.palette.greys[200]};
    border: 0;
  }

  /* Basic text styles (small, underscore, b etc.) */
  small {
    ${({ theme }) => theme.typography.body2}
  }

  b,
  strong {
    font-weight: 600;
  }

  /* Inline Code */
  code {
    ${({ theme }) => theme.typography.code}
    padding: 2px 4px;
    color: ${({ theme }) => theme.palette.text.secondary};
    background: ${({ theme }) => theme.palette.greys[100]};
    border: 1px solid ${({ theme }) => theme.palette.greys[200]};
    border-radius: 2px;
  }

  /* Figures with captions */
`;

export default HtmlStyledContent;
