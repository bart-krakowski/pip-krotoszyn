import { FC } from "react";
import styled from "styled-components";

interface ListProps {
  items: Array<string>;
}
const List: FC<ListProps> = ({ items }) => (
  <Wrapper>
    {items.map((el) => (
      <Item key={el}>{el}</Item>
    ))}
  </Wrapper>
);

export default List;

const Wrapper = styled.ul`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.palette.text.secondary};
  padding: 0 16px;
  margin: 0;
`;

const Item = styled.li``;
