import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import loaderImg from "../../assets/images/loader.png";

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;


const LoadImg = styled.img`
  width: 50px; /* Adjust the size as needed */
  height: auto;
  max-width: 100%;
  animation: ${spinAnimation} 3s linear infinite;
`;

const LoaderContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgb(106 142 178 / 80%);
  z-index: 9999;
`;


const Loader = () => {
  return (
    <LoaderContainer>
      {/* Add your loading spinner or animation here */}
      <LoadImg src={loaderImg} />
    </LoaderContainer>
  );
};

export default Loader;
