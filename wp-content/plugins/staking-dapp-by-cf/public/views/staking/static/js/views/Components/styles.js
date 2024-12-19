import styled from "@emotion/styled"
import { Container, Grid, MenuItem } from "@mui/material"
import { css } from '@emotion/react';
// import Bg from "../../assets/images/lizabg.png"
const MenuItemDots = styled(MenuItem)`
color: #44C9C7!important;
border-radius: 8px;
 margin:10px 0;
 border: 0.5px solid rgba(68, 201, 199, 0.60);
:hover{
   background: #44C9C7;
   color: #fff !important;
}
`

const InputBalFetch = styled.input`
  background-color: transparent;
  border: none;
  width: 100%;
  font-size: 16px;

  &:focus {
    outline: none; // Remove the border around the input when focused
  }

  /* For WebKit browsers (Chrome, Safari) */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none; // Remove default appearance
    margin: 0; // Specify margins to hide the buttons
  }
`;

const MOdalWrapper = styled.div`
background: red;
`


const MenuWrap = styled.div`
padding: 10px 20PX;
display: flex;
align-items: center;
 background-color: #ffffff14;
`
const Addr = styled.div`
display: flex;
align-items: center;
justify-content: end;
font-size: 16px;
gap:10px;
font-weight: bolder;
`
const TokenDetail = styled.div`
display: flex;
font-weight: bolder;
align-items: center;
justify-content: end;
text-align:left;
font-size: 16px;
gap:10px;
@media screen and (max-width:599px){
  display: none;
}

`
const MainGrid = styled(Grid)`
   display: flex;
   align-items: center;
text-align: right;

`
const GridHeading = styled(Grid)`
text-align: left;
@media screen and (max-width:899px){
  display: none;
}
`
const LogoImg = styled.img`
display:flex;
align-items:center;
`
const Walletimg = styled.img`
display:flex;
align-items:center;
@media screen and (max-width:349px){
display: none;
}
`
const TokenLogo = styled.img`
display:flex;
align-items:center;
@media screen and (max-width:899px){
display: none;
}
`
const CoinLiza = styled.img`
width:100%;
height:auto;
max-width: 180px;

`
const MainHeading = styled.h2`
font-size: ${(props) => (props.fs ? props.fs : "26px")};
padding: ${(props) => (props.p ? props.p : "10px 0")};
margin: 0;
color: ${(props) => (props.color ? props.color : "#fff")};
text-align: ${(props) => (props.align ? props.align : "")};
`
const EthBtn = styled.div`
/* display: flex;
align-items: center;
padding: 0px 0 20px; */
@media screen and (max-width:699px){
   /* text-align: center;
   display: inline-block; */
}
`
const LargeiconWrap = styled.div`
 background-color: #ffffff0f;
 width: 80px;
 border-radius: 0px 0px 8px 8px;

`;
const ContainerDefault = styled(Container)`
/* padding-left: 100px  !important; */
padding: 24px;
`
const SideMenu = styled.div`
 width: 80px;
 position:absolute;
 background-color: #00000063;
 /* min-height: 100%; */
 display: flex;
 flex-direction: column;
 align-items: center;
 /* padding-top: 20px; */
 @media screen and (max-width:600px){
    display:none;
 }
`;

const MenuItems = styled.div`
 width: 100%;
 height: 60px;
 display: flex;
 justify-content: center;
 align-items: center;
 cursor: pointer;
 transition: background-color 0.3s ease;

 &:hover {
   background-color: #333333;
 }

 ${(props) =>
    props.large &&
    css`
     height: 80px;
   `}
`;
const P = styled.p`
font-size: ${(props) => (props.fs ? props.fs : "16px")};
 color: ${(props) => (props.color ? props.color : "#ffffff9c")};
 max-width: ${(props) => (props.maxWidth ? props.maxWidth : "100%")};
 text-align: ${(props) => (props.align ? props.align : "left")};
 margin: ${(props) => (props.m ? props.m : "0")};
 padding: ${(props) => (props.p ? props.p : "20px 0")};
`
const InputRadio = styled.input`
  float: right;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #49D9D9;
  &:checked {
    background-color: transparent;
  }

  &:checked::before {
    content: '';
    display: block;
    width: 12px; /* Adjust the size of the inner circle */
    height: 12px; /* Adjust the size of the inner circle */
    border-radius: 50%;
    background-color: #49D9D9;
    margin: 2px; /* Adjust the size of the transparent gap */
  }

  float: right;
`;
const Icon = styled.img`
 width: 30px;
 height: 30px;

 ${(props) =>
    props.large &&
    css`
     width: 40px;
     height: 40px;
   `}
`;
const Containerxx = styled.div`
 border-radius: 10px;
 overflow: hidden; /* Ensure the gradient border doesn't overflow */
`;
const CardWrap = styled.div`
 /* border: 2px solid transparent; */
 border-image: linear-gradient(434deg, transparent,transparent,#037dcf4f, #960b8885,transparent) 1;
 border-image-slice: 20; /* Adjust this value to control the fading */
 /* Other styles */
 background: linear-gradient(93deg, rgba(3, 125, 207, 0.06) 7%, rgba(150, 11, 136, 0.06) 81.71%);
 mix-blend-mode: screen;
 backdrop-filter: blur(0px);
border-radius: 10px;
border-top: 1px solid rgba(73, 217, 217, 0.00);
border-right: 1px solid rgba(73, 217, 217, 0.00);
border-left: 1px solid rgba(73, 217, 217, 0.00);
background: rgba(255, 255, 255, 0.02);
padding:0px 10px 20px 10px;
`
const Spliterr = styled.div`
display:flex;
justify-content: space-between;
align-items:center;
padding: ${(props) => (props.p ? props.p : "5px 0")};
margin: 0;
`
const SubHeading = styled.h4`
overflow-wrap: ${(props) => (props.ow ? props.ow : "")};
font-size: ${(props) => (props.fs ? props.fs : "20px")};
padding: ${(props) => (props.p ? props.p : "0")};
margin: 0;
color: ${(props) => (props.color ? props.color : "#fff")};
text-align: ${(props) => (props.align ? props.align : "")};
`
const SmallHeading = styled.h3`
padding: 0;
margin: 0;
font-size: ${(props) => (props.fs ? props.fs : "26px")};
color: ${(props) => (props.color ? props.color : "#49D9D9")};
`
const StakeWrap = styled.div`
margin: 24px 0 0 0;
padding: 22px;
border-radius: 10px;
/* border: 1px solid #D949CB; */
background: rgba(0, 0, 0, 0.30);
backdrop-filter: blur(10px);
`
const StartButton = styled.button`
background-color:#49D9D9;
border: none;
padding:8px 20px;
color:#fff;
border-radius: 8PX;
`
const StakeColWrap = styled.div`
display: flex;
flex-direction: column;
gap:20px;
`
const X = styled.img`
cursor: pointer;
`
const MaxWrap = styled.div`
background: rgba(3, 125, 207, 0.04);
padding: 7px 20px ;
margin: 10px 0px 20px;
border-radius: 8px;
`
const MaxButton = styled.button`
border-radius: 8px;

color: ${(props) => (props.color ? props.color : "#44C9C7")};
border: 0.5px solid #44C9C7;
background: transparent;
/* width: 100%; */
padding: 10px 40px;
`
const ApproveButton = styled.button`
 border-radius: 8px;
  cursor: pointer;
  border: 0.5px solid rgba(255, 255, 255, 0.15);
  /* background: transparent; */
  background: ${(props) => (props.getBalance > 0 ? '#49D9D9' : 'transparent')};
  color: ${(props) => (props.getBalance > 0 ? '#fff' : '#ffffff7a')};

  width: 100%;
  max-width: ${(props) => (props.MaxWidth ? props.MaxWidth : "")};
  padding: 10px 0;
`
const Connectbutton = styled.button`
background-color:#49D9D9;
border: none;
padding:8px 20px;
color:#fff;
border-radius: 8PX;
font-size: 16px;
font-weight: 600;
cursor: pointer;
`
const StakeButton = styled.button`
  border-radius: 8px;
  cursor: pointer;
  border: 0.5px solid rgba(255, 255, 255, 0.15);
  /* background: transparent; */
  background: ${(props) => (props.inputValue > 0 ? '#49D9D9' : 'transparent')};
  color: ${(props) => (props.inputValue > 0 ? '#fff' : '#ffffff7a')};

  width: 100%;
  max-width: ${(props) => (props.MaxWidth ? props.MaxWidth : "")};
  padding: 10px 0;
`
const StakeCard = styled.div`
  padding: 20px 30px;
  text-align: center;
  border-radius: 10px;
  /* Set the border image with a linear gradient */
  border: 1px solid transparent;
  border-image: linear-gradient(91deg,transparent,transparent, #037dcf4f,transparent,transparent, #960b8885,transparent,transparent) 1;
  border-image-slice: 10; /* Adjust this value to control the fading */
  min-height: 130px;
  /* Other styles */
  background: linear-gradient(93deg, rgba(3, 125, 207, 0.06) 7%, rgba(150, 11, 136, 0.06) 81.71%);
  mix-blend-mode: screen;
  backdrop-filter: blur(0px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  @media screen and (max-width:1260px){
    min-height: 189px;
    
  }
  & >div *{
    padding-bottom: 15px;
  }
  &.rows{
    min-height: unset;
    flex-direction: row;
    background: unset;

    & >div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
      padding-bottom: 0px;
      *{ padding-bottom: 0px; }
    }
    
    & >button{
        max-width: 150px;
    }
    @media screen and (max-width:599px){
      flex-direction: column;
      & >div{
        flex-direction: column;
      }
    }
  }
`;
const InnerSideWrapper = styled.div`
border: 0.1px solid #d949cb45;
background: linear-gradient(45deg, #037dcf12, #960b883d);
border-radius: 8px;
padding: 15px;

                                
`
const Wrapper = styled.div`
background: rgba(0, 0, 0, 0.30);
    -webkit-backdrop-filter: blur(7px);
    backdrop-filter: blur(7px);
    height: calc(100vh - 126px);
padding: 40px 10px 10px;
@media screen and (max-width:899px){
  height: UNSET;
  padding: 20px ;
}
`
const GridDefault = styled(Grid)`
@media screen and (max-width:899px){
flex-direction: column-reverse;
}
`
export {
  MenuItemDots,
  GridDefault,
  StakeCard,
  InnerSideWrapper,
  ApproveButton,
  StakeButton,
  InputBalFetch,
  Wrapper,
  MOdalWrapper,
  Connectbutton,
  MenuWrap,
  Addr,
  TokenDetail,
  MainGrid,
  TokenLogo,
  GridHeading,
  Walletimg,
  CoinLiza,
  MainHeading,
  EthBtn,
  LargeiconWrap,
  ContainerDefault,
  SideMenu,
  MenuItems,
  P,
  Icon,
  InputRadio,
  LogoImg,
  Containerxx,
  CardWrap,
  Spliterr,
  SubHeading,
  SmallHeading,
  StakeWrap,
  StartButton,
  StakeColWrap,
  X,
  MaxWrap,
  MaxButton,
}