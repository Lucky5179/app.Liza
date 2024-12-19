import React, { useEffect, useState } from 'react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useBalance, useConnect, useContractRead, useContractReads, useContractWrite, useDisconnect, useNetwork } from 'wagmi'

import Box from '@mui/material/Box';
import { Divider, Grid, } from '@mui/material';
import CoinLizaImg from '../assets/images/coinimg.png';
import Eth from '../assets/images/ethereum.png';
import TopMenu from './Components/TopMenu';
import { Wrapper, MainHeading, P, Spliterr, SubHeading, StakeWrap, ContainerDefault, InnerSideWrapper, GridDefault } from './Components/styles';
import AprDays from './Components/apr-days';
import { chainId, pairA, pairB, pairC, pairD, stakingPoolABI, tokenContract, tokenStakingPoolABI, uniswapV2RouterABI, uniswapV2RouterContract, wrappedEth } from '../config/contract-abis';
import WalletConnect from './Components/walletConnect';
import { StakingBoard } from './Components/StakingBoard/StakingBoard';



const Staking = () => {
    const { open: connectWallet, connected, account } = useWeb3Modal()
    const stakingPairs = [pairA, pairB, pairC, pairD,]
    const { disconnect: disconnectWallet } = useDisconnect()
    const [showFirstMethod, setShowFirstMethod] = useState(true);
    const [getBalance, setBalance] = useState();

    const [stakerShares, setStakerShares] = useState(false);
    const { address: userWallet, isConnected } = useAccount()
    const { data: tokenData, } = useBalance({
        address: userWallet,
        token: tokenContract,
        chainId: chainId,
        watch: true,
    })
    const bigNumToNum = (arg) => arg ? parseInt(arg?.toString()) : null;

    const { data, isError, isLoading } = useContractReads({

        contracts: [
            {
                address: pairA?.stakingPool,
                abi: stakingPoolABI,
                functionName: 'stakerShares',
                args: [userWallet],
            },
            {
                address: pairB?.stakingPool,
                abi: stakingPoolABI,
                functionName: 'stakerShares',
                args: [userWallet],
            },
            {
                address: pairC?.stakingPool,
                abi: stakingPoolABI,
                functionName: 'stakerShares',
                args: [userWallet],
            },
            {
                address: pairD?.stakingPool,
                abi: stakingPoolABI,
                functionName: 'stakerShares',
                args: [userWallet],
            }
        ],
        watch: true,
    });

    const hasNonZeroShares = data?.some(i => i?.result && bigNumToNum(i?.result[0]));
    const [gettotalRewards, setTotalRewards] = useState(0);

    const test = gettotalRewards;
    const totalRewards = test?.toFixed(5);
    const PoolA = useContractRead({
        address: pairA?.stakingPool,
        abi: stakingPoolABI,
        functionName: 'totalRewards',
        watch: true,
        onError(error) {
            console.error('Error during reward:', error);
        },
        onSuccess(data) {
            console.log("data", data);
        },
    });

    const PoolB = useContractRead({
        address: pairB?.stakingPool,
        abi: stakingPoolABI,
        functionName: 'totalRewards',
        watch: true,
        onError(error) {
            console.error('Error during reward:', error);
        },
        onSuccess(data) {
        },
    });

    const PoolC = useContractRead({
        address: pairC?.stakingPool,
        abi: stakingPoolABI,
        functionName: 'totalRewards',
        watch: true,
        onError(error) {
            console.error('Error during reward:', error);
        },
        onSuccess(data) {
        },
    });

    const PoolD = useContractRead({
        address: pairD?.stakingPool,
        abi: stakingPoolABI,
        functionName: 'totalRewards',
        watch: true,
        onError(error) {
            console.error('Error during reward:', error);
        },
        onSuccess(data) {
        },
    });
    useEffect(() => {
           // Calculate the sum of rewards when any of the pool data changes
           const calculateTotalRewards = () => {
            const rewardsSum = PoolA?.data + PoolB?.data + PoolC?.data + PoolD?.data;
            setTotalRewards(bigNumToNum(rewardsSum) / 1e18);
        };

        // Check if all pool data is available before calculating the sum
        if (PoolA?.data && PoolB?.data && PoolC?.data && PoolD?.data) {
            calculateTotalRewards();
        }
        setBalance(() => {
            let bal = (tokenData?.formatted)
            return Math.round(bal * 100) / 100
        })
    }, [tokenData, stakerShares,PoolA?.data, PoolB?.data, PoolC?.data, PoolD?.data])

    return (
        <>
            <>
                <TopMenu
                    userWallet={userWallet}
                    isConnected={isConnected}
                    tokenData={tokenData}
                    getBalance={getBalance}
                    connectWallet={connectWallet}
                    disconnectWallet={disconnectWallet}
                />
                <>
                    <GridDefault container>
                        <Grid item xs={12} md={1.8}>
                            <Wrapper>
                                <InnerSideWrapper>
                                    <img src={Eth} />
                                    <MainHeading p="20px 0 10px" fs="18px">ETH Rewards</MainHeading>
                                    <P p="0px 0" fs="14px">Earn ETH by staking!</P>
                                    <MainHeading p="30px 0 10px" fs="18px">{totalRewards} ETH</MainHeading>
                                    <P p="0px 0" fs="14px">Total ETH rewarded</P>
                                </InnerSideWrapper>

                            </Wrapper>
                        </Grid>
                        <Grid item xs={12} md={10.2}>
                            <ContainerDefault maxWidth="xl">
                                <MainHeading fs="24px">Pool Size</MainHeading>
                                <P p="0 0 20px" fs="16px">Unlock the power of staking and experience the magic of compounding with $LIZA</P>
                                <Grid container spacing={2}>
                                    {pairA?.stakingPool && <AprDays defaultSelectedValue={pairA} pair={pairA} />}
                                    {pairB?.stakingPool && <AprDays defaultSelectedValue={pairB} pair={pairB} />}
                                    {pairC?.stakingPool && <AprDays defaultSelectedValue={pairC} pair={pairC} />}
                                    {pairD?.stakingPool && <AprDays defaultSelectedValue={pairD} pair={pairD} />}
                                </Grid>
                                <StakeWrap>
                                    <Spliterr>
                                        <SubHeading>My Stakes & Rewards</SubHeading>
                                    </Spliterr>

                                    <Divider style={{ background: '#ffffff1a', marginTop: 10 }} />

                                    <Box style={{ padding: '20px 0', textAlign: 'center' }}>
                                        {!isConnected && (
                                            <WalletConnect imgSrc={CoinLizaImg} connectWallet={connectWallet} />
                                        )}

                                        {isConnected && (
                                            <>
                                                {hasNonZeroShares ? (
                                                    <>
                                                        <StakingBoard
                                                            tokenData={tokenData}
                                                            userWallet={userWallet}
                                                            pair={pairA}
                                                        />

                                                        <StakingBoard
                                                            tokenData={tokenData}
                                                            userWallet={userWallet}
                                                            pair={pairB}
                                                        />

                                                        <StakingBoard
                                                            tokenData={tokenData}
                                                            userWallet={userWallet}
                                                            pair={pairC}
                                                        />

                                                        <StakingBoard
                                                            tokenData={tokenData}
                                                            userWallet={userWallet}
                                                            pair={pairD}
                                                        />
                                                    </>
                                                ) : (
                                                    <p>No Staking available</p>
                                                )}
                                            </>
                                        )}

                                    </Box>
                                </StakeWrap>
                            </ContainerDefault>
                        </Grid>
                    </GridDefault>
                </>
            </>
        </>

    )
}

export default Staking