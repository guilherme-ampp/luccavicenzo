import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export interface AnimationProps {
  videoOut: boolean;
  uploadDone: boolean;
}

const appearFromBottom = keyframes`
    from {
        opacity: 0;
    },
    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// JavaScript's template literals!
export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 700px;
  line-height: 56px;
  margin-top: 50px;
`;

export const Form = styled.div<AnimationProps>`
  margin-top: 40px;
  min-width: 100%;
  text-align: center;
  min-height: 120px;
  /* display: flex; */
  display: block;
  align-items: center;
  text-align: center;

  input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  span {
    width: 100%;
    color: #3a3a3a;
    font-weight: bold;
    font-size: medium;
  }

  button {
    min-width: 100%;
    height: 70px;
    border-radius: 5px;
    border: 0;
    color: #fff;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .progress {
    width: 100%;
    height: 70px;
    font-weight: bold;
    font-size: medium;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .progress-bar {
    max-width: 100%;
    background-color: ${(props) => (props.uploadDone ? '#2fcc83' : '#14b1ab')};
  }

  .div-progress {
    display: inline-grid;
  }

  img {
    max-height: 100%;
    animation: ${appearFromBottom} 1s ease-in-out;
    position: absolute;
  }
`;

export const Video = styled.video<AnimationProps>`
  width: 100%;
  animation: ${(props) => (props.videoOut ? fadeOut : fadeIn)} 1s ease-in-out;
  visibility: ${(props) => (props.videoOut ? 'hidden' : 'visible')};
  transition: visibility 1s ease-in-out;
`;

export const ExitButton = styled.button`
  background-color: coral;
  max-height: 80px;
  border-radius: 5px;
  border: 0;
  color: #fff;
  padding: 5px;
  font-weight: bold;

  &:hover {
    background: ${shade(0.2, 'coral')};
  }
`;

export const Message = styled.span`
  color: #3a3a3a;
  font: 16px Roboto, sans-serif;
`;
