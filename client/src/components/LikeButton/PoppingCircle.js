import React from "react";
import styled, { keyframes } from "styled-components";

const PoppingCircle = ({size, color}) => {
    // console.log(color)
    return (
        <Wrapper size={size} color={color}></Wrapper>
    )  
    
}

const popCircle = keyframes`
  15% {
      opacity: 0;
      transform: scale(0);
  }
  40% {
      opacity: 0.8;
      transform: scale(1);
  }
  100% {
      opacity: 0;
      transform: scale(1);
  }
    `;

const Wrapper = styled.div`
  opacity: 0;
  z-index:0;
  animation: ${popCircle} 500ms forwards;
  position: absolute;
  left:0;
  top:0;
  border-radius: 50%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => props.color};
  `;



//   /* 25% to delay-activate popping effect until only after heart color fills in red */
//   const scale = keyframes`
//     25% {
//       transform: scale(0)
//     }
//     100% {
//       transform: scale(1)
//     }
//   `;
  
//   const fade = keyframes`
//     0% {
//       opacity: 0;
//     }
//     50% {
//       opacity: 0.65;
//     }
//     100% {
//       opacity: 0;
//     }
//   `;


export default PoppingCircle;