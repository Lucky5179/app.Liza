import React from 'react'
import { Addr, Connectbutton, GridHeading, LogoImg, MainGrid, MainHeading, MenuWrap, TokenDetail, TokenLogo, Walletimg } from './styles'
import { Grid } from '@mui/material'
import Logo from "../../assets/images/lizalogo.png"
import Wallimg from "../../assets/images/wallet.png"
import logoutimg from "../../assets/images/logout.png"

import styled from '@emotion/styled'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { chainId } from '../../config/contract-abis'

const TopMenu = ({ userWallet, isConnected, tokenData, getBalance, connectWallet, disconnectWallet }) => {
    const LogoGrid = styled(Grid)`
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 20px;
    `
    const WalletGrid = styled(Grid)`
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 20px;
    `

    const MainHeadingEx = styled(MainHeading)`
        @media screen and (max-width:699px){display:none;}
    `
    const Logoutbutton = styled(Connectbutton)`
    max-width: ${(props) => (props.MaxWidth ? props.MaxWidth : "190px")};
        img{
            width: 20px;
            height: auto;
            display: none;
            @media screen and (max-width:699px){display:block;}
        }
        span{
            font-size: 16px;
            @media screen and (max-width:699px){display:none;}
        }
    `
    const { chain } = useNetwork();
    const { switchNetwork } = useSwitchNetwork();

    return (
        <MenuWrap>
            <MainGrid container>
                <LogoGrid item xs={3} >
                    <LogoImg src={Logo} />
                    <MainHeadingEx>Staking </MainHeadingEx>
                </LogoGrid>
                <WalletGrid item xs={9}>
                    {!isConnected && (<Connectbutton MaxWidth="190px" onClick={() => connectWallet()}>Connect Wallet</Connectbutton>)}
                    {isConnected && (
                        <>
                            {chain?.id === chainId ? (
                                <>
                                    <TokenDetail > {isConnected && <><TokenLogo src={Logo} />   <div style={{ display: "flex", flexDirection: "column" }}>      <span style={{ color: "#ffffff9c", fontSize: "14px", fontWeight: "300" }}>{tokenData?.symbol} Token</span>{getBalance}$ {tokenData?.symbol}</div></>}
                                    </TokenDetail>
                                    <Addr >
                                        {isConnected && <>  <Walletimg src={Wallimg} /></>}
                                        {isConnected && <div>{userWallet?.slice(0, 6)}...{userWallet?.substr(38 - 0)}</div>}
                                    </Addr>
                                    <Logoutbutton onClick={() => disconnectWallet()}>
                                        <span>Disconnect Wallet</span>
                                        <img src={logoutimg} />
                                    </Logoutbutton>
                                </>
                            ) : (
                                <>
                                    <Connectbutton MaxWidth="190px" onClick={() => switchNetwork?.(chainId)}>
                                        Switch network
                                    </Connectbutton>
                                </>
                            )}
                        </>
                    )}

                </WalletGrid>
            </MainGrid>
        </MenuWrap>
    )
}

export default TopMenu