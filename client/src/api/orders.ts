import { GET, PATCH, POST } from "@/utils/axios";
import { useQuery } from "react-query";

// POST /orders 주문하기
export const postOrder = ({
  data,
}: {
  data: {
    productId: number;
    addressee: string;
    productOptionId?: number;
    amount: number;
    destination: string;
    price: number;
    request: string;
  };
}) => POST("/orders", { data });

// GET /orders/:orderNum 주문번호로 주문 가져오기
const getOrdersByOrderNum = (orderNum: number) => GET(`/orders/${orderNum}`);
export const useOrdersByOrderNum = (orderNum: number) =>
  useQuery(["orders", orderNum], () => getOrdersByOrderNum(orderNum));

// GET /orders 백오피스 주문리스트 보기
export const getOrders = () => GET("/orders");

// PATCH /orders/:id 백오피스 주문 상태 변경
export const patchOrders = ({ id, data }) => PATCH(`/orders/${id}`, data);

// GET /orders/:id 백오피스 주문 상세정보 보기
export const getOrder = ({ id }) => GET(`/orders/${id}`);

// POST /orders/:id 주문번호 넣기
export const postOrderNum = (id: number, orderNum: string) =>
  POST(`/orders/${id}`, { orderNum });
