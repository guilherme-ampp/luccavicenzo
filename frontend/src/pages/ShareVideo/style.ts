import styled from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

// JavaScript's template literals!
export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;

  margin-top: 80px;
`;

export const Form = styled.form`
  margin-top: 40px;
  max-width: 700px;
  text-align: center;

  display: flex;

  input {
    flex: 1;
    /* height: 70px; */
    padding: 0 24px;
    border: 0;
    color: #3a3a3a;
    border: 2px solid #fff;
    border-right: 0;

    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;

    & + label {
      width: 210px;
      height: 70px;
      border-radius: 5px;
      font-size: 1.25em;
      font-weight: 700;
      color: #fff;
      background: #04d361;
      display: inline-block;
      margin: 10px;
      vertical-align: middle;
      cursor: pointer; /* "hand" cursor */
    }

    & + label:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }

  button {
    width: 210px;
    height: 70px;
    background: #04d361;
    border-radius: 5px;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;
    margin: 10px;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Video = styled.video`
  width: 80%;
`;
