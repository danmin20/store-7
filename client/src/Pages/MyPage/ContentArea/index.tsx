import styled from "styled-components";
import contents from "./contents";

export interface ContentAreaProps {
  current: string;
}

const ContentArea = ({ current }: ContentAreaProps) => {
  const Content = contents[current];
  return (
    <Wrapper data-testid="test__content-area">
      <Content />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
`;

export default ContentArea;
