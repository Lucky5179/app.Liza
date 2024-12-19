import { Modal } from '@mui/material';
import React, { useState } from 'react';
import { Connectbutton, P, Spliterr, StakeButton, SubHeading, X } from './styles';
import Xicon from "../../assets/images/x.png";
import styled from '@emotion/styled';

const ConfirmationModal = ({paragraph , confirmationModalOpen, handleConfirmationCloseModal }) => {
    const [modalOpen, setModalOpen] = useState(false);

 
  const WrapModal = styled.div`
  border-radius: 10px;
   border: 0.1px solid #d949cb45;
   background: linear-gradient(45deg, #037dcf12, #960b883d);
   backdrop-filter: blur(35px);
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   width: 100%;
   max-width: 500px;
   height:200px;
   padding: 10px 20px;
   margin: 0px 0px;
   @media screen and (max-width:699px){
       max-width: 400px;
      }
      @media screen and (max-width:499px){
       padding: 20px 20px;
       max-width: 300px;
   }
`;

  return (
    <>
      <Modal
       open={confirmationModalOpen}
       onClose={handleConfirmationCloseModal}
       aria-labelledby="parent-modal-title"
       aria-describedby="parent-modal-description"
    
      >
        <WrapModal>
          <Spliterr p="10px 0 20px">
            <X onClick={handleConfirmationCloseModal} src={Xicon} />
            <SubHeading></SubHeading>
          </Spliterr>
          <SubHeading align="center">{paragraph}</SubHeading>
          <Spliterr p="50px 0 20px">
          <P></P>
          <Connectbutton onClick={handleConfirmationCloseModal}>Close</Connectbutton>
          </Spliterr>
        </WrapModal>
      </Modal>
    </>
  );
}

export default ConfirmationModal;
