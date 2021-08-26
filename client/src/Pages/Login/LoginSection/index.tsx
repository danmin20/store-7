import useInput from "@/hooks/useInput";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { loginState } from "@/store/state";
import { signIn } from "@/api/auth";
import APIButton from "@/Components/APIButton";
import OAuthLoginSection from "../OAuthLoginSection";
import { gap, media } from "@/styles/theme";
import Input from "@/Components/Input";
import properties from "@/config/properties";

const LoginSection = () => {
  const email = useInput("");
  const password = useInput("");
  const setLoginState = useSetRecoilState(loginState);

  const handleSignin = async (isDemo) => {
    await signIn({
      email: isDemo ? properties.demo.email : email.value,
      password: isDemo ? properties.demo.password : password.value,
    });

    setLoginState(true);
  };

  const checkSignupable = (): boolean => {
    //TODO: validion Check하기(?)
    return email.value.length > 0 && password.value.length > 0;
  };

  return (
    <Form onSubmit={() => handleSignin(true)}>
      <h3>회원 로그인</h3>
      <Input
        className="login-input"
        placeholder="이메일 입력"
        defaultValue={email.value}
        onChange={email.onChange}
      />
      <Input
        className="login-input"
        placeholder="비밀번호 입력"
        defaultValue={password.value}
        type="password"
        onChange={password.onChange}
      />
      <APIButton
        className="login-form__login"
        api={() => handleSignin(false)}
        primary
        disabled={!checkSignupable()}
      >
        로그인
      </APIButton>
      <APIButton api={() => handleSignin(true)} className={"login-form__demo"}>
        시연용 아이디로 로그인
      </APIButton>
      <OAuthLoginSection />
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 6rem;
  ${gap("2rem", "column")}

  h3 {
    text-align: center;
    ${({ theme }) => theme.font.large}
  }

  .login-form__login {
    height: 5rem;
  }

  .login-form__demo {
    height: 5rem;
    color: ${({ theme }) => theme.color.primary3};
    &:disabled {
      background-color: ${({ theme }) => theme.color.light_grey1};
    }
  }
  ${media.mobile} {
    .login-input {
      height: 5rem;
      padding: 0 2rem;
      border: 1px solid ${({ theme }) => theme.color.light_grey1};
    }
  }
`;

export default LoginSection;
