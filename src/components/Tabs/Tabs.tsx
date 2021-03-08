import { FC, useRef, useState } from "react";
import styled from "styled-components";

const Tabs: FC & { Item: typeof Item } = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Tabs;

interface ItemProps {
  image: string;
}
const Item: FC<ItemProps> = ({ image, children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const height = wrapperRef.current ? wrapperRef.current.scrollHeight : 0;
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ItemWrapper onClick={clickHandler}>
      <ItemHeader image={image} />
      <ItemBody ref={wrapperRef} scrollHeight={height} isOpen={isOpen}>
        <ItemBodyInner>{children}</ItemBodyInner>
      </ItemBody>
    </ItemWrapper>
  );
};

const Wrapper = styled.ul`
  z-index: 1;
  list-style-type: none;
  padding: 0;
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  width: 100%;
  padding: 0 15px;
  cursor: pointer;

  ${(p) => p.theme.breakpoints.up("desktop")} {
    position: absolute;
    top: calc(100% - 75px);
    left: 0;
  }
`;

const ItemWrapper = styled.li`
  position: relative;
`;

interface ItemHeaderProps {
  image: string;
}
const ItemHeader = styled.div<ItemHeaderProps>`
  box-shadow: 0px 0px 10px rgba(118, 118, 118, 0.2);
  border-radius: 10px;
  padding: 10px;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  min-height: 150px;
  box-shadow: 0px 0px 10px rgba(118, 118, 118, 0.2);
`;

interface ItemBodyProps {
  isOpen: boolean;
  scrollHeight: number;
}
const ItemBody = styled.div<ItemBodyProps>`
  height: ${({ isOpen, scrollHeight }) =>
    isOpen ? `${scrollHeight}px` : "0px"};
  overflow: hidden;
  /* position: absolute; */
  width: 100%;
  background-color: ${({ theme }) => theme.palette.common.white};
  box-shadow: 0px 0px 10px rgba(118, 118, 118, 0.2);
  border-radius: 0 0 10px 10px;
  transition: height 0.3s;

  h4 {
    ${({ theme }) => theme.typography.h4};
  }

  p {
    ${({ theme }) => theme.typography.h5};
  }
`;

const ItemBodyInner = styled.div`
  padding: 15px;
`;

Tabs.Item = Item;
