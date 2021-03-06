import { Link, moveTo } from "@/Router";

import styled from "styled-components";
import { PageWrapper } from "@/shared/styled";
import { gap, media } from "@/styles/theme";

import LoginSection from "./LoginSection";
import { Input, Button } from "@/Components/Common";

import useInput from "@/hooks/useInput";

import { Back, HeaderLogo } from "@/assets";

const LoginPage = () => {
  const orderNum = useInput("");
  const checkLookupable = (): boolean => {
    return orderNum.value.length > 0;
  };

  return (
    <LoginPageWrapper>
      <LoginContent>
        <Link to="/">
          <img className="logo" src={HeaderLogo} alt="헤더 로고" />
        </Link>
        <LoginSection />
        <Form>
          <Title>비회원 주문조회 하기</Title>
          <Input
            placeholder="주문번호"
            value={orderNum.value}
            onChange={orderNum.onChange}
          />
          <Button
            disabled={!checkLookupable()}
            onClick={() => moveTo(`/result/${orderNum.value}`)}
          >
            조회하기
          </Button>
          <span>
            주문번호와 비밀번호를 잊으신 경우, 고객센터로 문의하여 주시기
            바랍니다.
          </span>
        </Form>
      </LoginContent>
      <Link to="/">
        <Back />
      </Link>
    </LoginPageWrapper>
  );
};

const LoginPageWrapper = styled(PageWrapper)`
  box-sizing: border-box;
  margin: auto;
  padding: 10rem;

  input {
    ${({ theme }) => theme.font.medium}
    color: ${({ theme }) => theme.color.body};
    box-sizing: border-box;
    height: 4rem;
    width: 100%;
    padding: 0px 1rem;
    background: ${({ theme }) => theme.color.off_white};
    border-radius: 0.5rem;

    ::placeholder {
      color: ${({ theme }) => theme.color.grey2};
    }
  }

  .login-form__footer {
    padding-bottom: 5rem;
    margin-bottom: 5rem;
    border-bottom: 1px solid ${({ theme }) => theme.color.light_grey2};
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    a {
      text-align: center;
      width: 100%;
      border-right: 1px solid ${({ theme }) => theme.color.light_grey2};
    }

    a:last-child {
      border: none;
    }

    ${media.mobile} {
      margin-top: 5rem;
      a {
        ${({ theme }) => theme.font.medium};
      }
    }
  }
  & > a {
    display: none;
  }
  ${media.mobile} {
    padding: 10rem 5rem;

    & > a {
      display: block;
      position: fixed;
      padding: 2rem;
      left: 0;
      top: 0;
    }
  }
`;

const LoginContent = styled.div`
  padding: 3rem 14.5rem;
  margin: auto;
  width: 30rem;
  ${media.tablet} {
    padding: 0;
  }
  ${media.mobile} {
    padding: 0;
    width: 100%;
  }
  a {
    ${({ theme }) => theme.flexCenter};
    margin-bottom: 4rem;
  }
  .logo {
    height: 5rem;
  }
`;

const Title = styled.h3`
  text-align: center;
  ${({ theme }) => theme.font.large}
  ${media.mobile} {
    padding: 0;
    width: 100%;
  }
`;

const Form = styled.form`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding-top: 6rem;
  border-top: 1px solid ${({ theme }) => theme.color.light_grey2};
  ${gap("2rem", "column")} ${media.mobile} {
    ${gap("4rem", "column")}
  }
`;

export default LoginPage;
