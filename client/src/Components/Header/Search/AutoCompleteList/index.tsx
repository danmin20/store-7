import { useKeywords } from "@/api/search";
import useThrottle from "@/hooks/useThrottle";
import { hideScroll } from "@/styles/theme";
import { useEffect } from "react";
import styled from "styled-components";

const AutoList = ({ keyword, handleSearch }) => {
  const handleClick = (v) => {
    handleSearch(v);
  };
  const throttledSearchInput = useThrottle<string>(keyword, 200);
  const { data: autoList, status } = useKeywords(throttledSearchInput);

  const generateAutoList = autoList?.map((value, idx) => (
    <li key={idx} onClick={() => handleClick(value)}>
      {value}
    </li>
  ));
  return (
    <AutoListWrapper>
      {autoList?.length ? (
        generateAutoList
      ) : (
        <div className="no-list">관련 상품이 없습니다</div>
      )}
    </AutoListWrapper>
  );
};

const AutoListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  max-height: 16rem;
  overflow-y: scroll;
  ${hideScroll}
  li {
    color: ${({ theme }) => theme.color.grey1};
    padding: 1rem;
    max-width: 100%;
    cursor: pointer;
    &:hover {
      background: ${({ theme }) => theme.color.background};
    }
  }

  .no-list {
    padding: 0.7rem 0;
    color: ${({ theme }) => theme.color.grey2};
  }
`;

export default AutoList;
