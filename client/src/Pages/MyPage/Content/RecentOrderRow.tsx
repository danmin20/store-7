import styled from "styled-components";

import TableFrom from "../Table/tableForm";

type RecentOrderRowType = {
  date: string;
  number: string;
  url: string;
  title: string;
  price: number;
  status: string;
  count: number;
  reviewID: number;
};

const RecentOrderRow = ({
  date,
  number,
  url,
  title,
  price,
  count,
  status,
  reviewID,
}: RecentOrderRowType) => {
  const statusStyle = status === "completed" ? { color: "#2ac1bc" } : {};
  const statusStr = {
    shipping: "배송 중",
    completed: "배송 완료",
    return: "교환/환불 중",
  };

  return (
    <tr>
      <td>
        <TableFrom.Order orderDate={date} orderNumber={number} />
      </td>
      <td>
        <TableFrom.ProductOption url={url} title={title} />
      </td>
      <td>
        {price} / {count}
      </td>
      <td style={statusStyle}>{statusStr[status]}</td>
      <td>{reviewID ? "작성완료" : <ReviewBox />}</td>
    </tr>
  );
};

const ReviewBox = () => {
  return (
    <ReviewBoxWrapper>
      <div>미작성</div>
      <button>작성하기</button>
    </ReviewBoxWrapper>
  );
};

const ReviewBoxWrapper = styled.div`
  & > button {
    width: 100%;
    margin-top: 1rem;
    padding: 0.5rem 0;
    background: black;
    color: white;
    cursor: pointer;
    ${({ theme }) => theme.borderRadius.small};
  }
`;

export default RecentOrderRow;
