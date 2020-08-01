import styled, { keyframes } from 'styled-components';

export interface AnimationProps {
  tailsIn: boolean;
  videoOut: boolean;
}

const appearFromTop = keyframes`
    from {
        opacity: 0;
        transform: translateY(-30px);
    },
    to {
        opacity: 1;
        transform: translateY(50px);
    }
`;

const disappearToTop = keyframes`
    from {
        opacity: 1;
        transform: translateY(0px);
    },
    to {
        opacity: 0;
        transform: translateY(-50px);
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

// JavaScript's template literals!
export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;
  margin-top: 80px;
`;

export const Form = styled.div<AnimationProps>`
  margin-top: 40px;
  min-width: 100%;
  text-align: center;
  min-height: 130px;
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
    color: #fff;
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
    height: 40px;
    font-weight: bold;
    font-size: medium;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .progress-bar {
    max-width: 100%;
    background-color: #14b1ab;
  }

  .div-progress {
    display: inline-grid;
  }

  img {
    max-height: 100%;
    animation: ${(props) => (props.tailsIn ? appearFromTop : disappearToTop)} 2s
      ease-in-out;
  }
`;

export const Video = styled.video<AnimationProps>`
  width: 100%;
  animation: ${(props) => (props.videoOut ? fadeOut : undefined)} 1s ease-out;
  visibility: ${(props) => (props.videoOut ? 'hidden' : 'visible')};
  transition: visibility 1s ease-out;
`;
