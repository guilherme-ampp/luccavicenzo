import styled, { css } from 'styled-components';

interface FormProps {
  hasError: boolean;
}

// JavaScript's template literals!
export const Title = styled.h1`
  font-size: 48px;
  max-width: 450px;
  line-height: 56px;
  margin-top: 50px;
  color: #3a3a3a;
`;

export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 100%;

  display: flex;

  .PhoneInput input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: solid;
    border-radius: 5px 0px 0px 5px;
    color: #3a3a3a;
    border-color: #fff;
    border-right: 0;

    ${(props) =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 120px;
    height: 70px;
    border-radius: 0px 5px 5px 0px;
    border: 0;
    color: #fff;
    font-weight: bold;
  }

  .PhoneInput {
    width: 80%;
    margin-bottom: 10px;
  }
`;

export const Message = styled.span`
  color: #3a3a3a;
  font: 16px Roboto, sans-serif;
  margin-left: 45px;
  margin-top: 10px;
`;
