import styled from "styled-components";
import Button from "@/Components/Button";
import QuestionBox from "./QuestionBox";
import QuestionModal from "./QuestionModal";
import { qnas } from "@/shared/dummy";
import { useSetRecoilState } from "recoil";
import { modalState } from "@/store/state";

const Question = () => {
  const setIsModalOpened = useSetRecoilState(modalState);

  const handleModalOpen = (val: boolean) => {
    if (!val) {
      const submit = window.confirm(
        "작성하고 있던 내용이 유실됩니다. 정말 다른 페이지로 이동하시겠어요?"
      );
      if (submit) setIsModalOpened(val);
    } else setIsModalOpened(val);
  };

  return (
    <div>
      <Header>
        <div>
          상품문의 <span className="total">{qnas.length}</span>
        </div>

        <Button onClick={() => handleModalOpen(true)} primary>
          문의하기
        </Button>
      </Header>
      {qnas.map((qna, idx) => (
        <QuestionBox {...qna} key={idx} />
      ))}

      <QuestionModal {...{ handleModalOpen }} />
    </div>
  );
};

const Header = styled.div`
  ${({ theme }) => theme.flexCenter};
  ${({ theme }) => theme.font.xlarge};
  justify-content: space-between;
  .total {
    color: ${({ theme }) => theme.color.primary1};
  }
`;

export default Question;
