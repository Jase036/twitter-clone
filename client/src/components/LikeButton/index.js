import React from "react";
import styled from "styled-components";

import Heart from "./Heart";
import PoppingCircle from "./PoppingCircle";
import ScaleIn from "./ScaleIn";

const color='#E790F7'


const LikeButton = ({ size = 40, liked }) => {
  const heartSize = size * 0.6;
  return (
    <>
    <Wrapper>
      {/* Conditionally wrap the heart */}
      {liked ? (
        <ScaleIn>
          <Heart width={heartSize} isToggled={liked} />
        </ScaleIn>
      ) : (
        <Heart width={heartSize} isToggled={liked} />
      )}
    </Wrapper>
    {liked && <PoppingCircle size={size} color={color} />}
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LikeButton;
