import { Box, Grid, IconButton } from '@mui/material'
import Menu from '@mui/material/Menu';
import React, { useEffect, useState } from 'react'
import StakingCard from './StakingCard'
import ThreeDots from '../../../assets/images/dots.png';
import Eth from '../../../assets/images/ethereum.png';
import Discount from '../../../assets/images/discount.png';
import LizaStake from '../../../assets/images/lizaStake.png';
import { MenuItemDots, StakeCard } from '../styles';
import { useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { chainId, pairA, stakingPoolABI, tokenContract, tokenStakingPoolABI, uniswapV2RouterABI, uniswapV2RouterContract, wrappedEth } from '../../../config/contract-abis';
import styled from '@emotion/styled';
import Loader from '../loader';
import ConfirmationModal from '../confirmationModal';

export const StakingBoard = ({ userWallet, tokenData, pair, toggleGrid }) => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [timerEnded, setTimerEnded] = useState(false);
    const [getimeRemaining, setTimeRemaining] = useState();
    const [getClaimableReward, setClaimableReward] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [stakerShares, setStakerShares] = useState(false);
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [TrxHash, setTrxHash] = useState(0);
    const [TrncValue, setTrncValue] = useState(0);
    const [UserTimer, setUserTimer] = useState(0);
    const [getEthFees, setEthFees] = useState(0);
    
    const [message, setmessage] = useState(" ");

    const handleOpenConfirmationModal = () => {
        // Add any logic you need before opening the modal
        setConfirmationModalOpen(true);
    };

    const handleConfirmationCloseModal = () => {
        // Add any logic you need before closing the modal
        setConfirmationModalOpen(false);
    };

    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const ITEM_HEIGHT = 48;

    const bigNumToNum = (arg) => arg ? parseInt(arg?.toString()) : null;

    const lizaReward = useContractWrite({
        address: pair?.tokenStakingPool,
        abi: tokenStakingPoolABI,
        functionName: 'claimRewards',
        onError(error) {

            setIsLoading(false)
            console.error('Error during lizaReward:', error);
            // Handle the error as needed
        },
        onSuccess(data) {
            setTrxHash(data?.hash);
            setIsLoading(false)
            // Handle success if needed
        },
    });
    const handleLizaReward = async () => {
        try {
            handleClose();
            setIsLoading(true);
            await lizaReward?.write();
        } catch (error) {
            setIsLoading(false);
            console.error('Error during lizaReward:', error);
        }
    };


    const { data: fixedAPR } = useContractRead({
        address: pair?.tokenStakingPool,
        abi: tokenStakingPoolABI,
        functionName: 'fixedAPR',
        chainId: chainId,
        watch:true,
    })
    const { data: stakerSharesData } = useContractRead({
        address: pair?.stakingPool,
        abi: stakingPoolABI,
        functionName: 'stakerShares',
        args: [userWallet],
        overrides: { from: userWallet },
        watch:true,
        onSuccess(data) {
            if (bigNumToNum(data[0])) { setStakerShares(data[0]) }
            if (bigNumToNum(data[1])) { setUserTimer(bigNumToNum(data[1])) }
        }
    });
    const { data: EthClaim } = useContractRead({
        address: pair?.stakingPool,
        abi: stakingPoolABI,
        functionName: 'getUnpaid',
        chainId: chainId,
        args: [userWallet],
        watch:true,
        onSuccess(data) {
            if (bigNumToNum(data)) {
                setEnabled(true)
            }
            else {
                setEnabled(false)
            }
        },
    })
    const EthClaimss = bigNumToNum(EthClaim) / 1e18;
    const EthClaims = EthClaimss?.toFixed(6);

    
    const { data: stakerrewardOf } = useContractRead({
        address: pair?.tokenStakingPool,
        abi: tokenStakingPoolABI,
        functionName: 'rewardOf',
        args: [userWallet],
        watch:true,
        // Additional options if needed
    });
    const { data: daysInSec } = useContractRead({
        address: pair?.stakingPool,
        abi: stakingPoolABI,
        functionName: 'lockupPeriod',
        chainId: chainId,
        watch:true,
    });
    // Convert second to days
    const lockupPeriodInDays = (arg) => arg ? bigNumToNum(arg) / 86400 : null;

    const EthFees = useContractRead({
        address: pair?.stakingPool,
        abi: stakingPoolABI,
        functionName: 'getCurrentFeeInETH',
        watch:true,
        onError(error) {
            console.error('Error during getCurrentFeeInETH:', error);
        },
        onSuccess(data) {
           setEthFees(data);
        },
    });
    const UniwapConCall = useContractRead({
        address: uniswapV2RouterContract,
        abi: uniswapV2RouterABI,
        functionName: 'getAmountsOut',
        args: [
            // Assuming EthClaim is a BigNumber and wrappedEth, tokenContract are addresses
            bigNumToNum(EthClaim),
            [wrappedEth, tokenContract],
        ],
        enabled: enabled,
        watch:true,
        onError(error) {
            console.error('Error during getting price:', error);
        },
        onSuccess(data) {
            // Assuming you want the second element of the array, which is amountOut
            setClaimableReward(bigNumToNum(data[1]));
        },
    });
    const ninetySevenPercent = (97 / 100) * getClaimableReward;
    // const completeValue = ninetySevenPercent?.toString()?.replace('.', '');
    const completeValue = bigNumToNum(ninetySevenPercent * 1e18);

    const CompoundETHRelock = useContractWrite({
        address: pair?.stakingPool,
        abi: stakingPoolABI,
        functionName: 'claimReward',
        args: [true, completeValue],
        onError(error) {
            setIsLoading(false)
            console.error('Error during claimReward true:', error);
        },
        onSuccess(data) {
            setTrxHash(data?.hash);
            setIsLoading(false)
        },
    });
    const handleCompoundETHRelock = async () => {
        try {
            handleClose();
            await CompoundETHRelock?.write();
            setIsLoading(true);
        } catch (error) {
            console.error('Error during relock true:', error);
        }

    };
    const ClaimETHRelock = useContractWrite({
        address: pair?.stakingPool,
        abi: stakingPoolABI,
        functionName: 'claimReward',
        args: [false, ninetySevenPercent],
        onError(error) {
            setIsLoading(false)
            console.error('Error during claimReward False:', error);
        },
        onSuccess(data) {
            setTrxHash(data?.hash);
            setIsLoading(false)
        },
    });
    const handleClaimETHRelock = async () => {
        try {
            handleClose();
            await ClaimETHRelock?.write();
            setIsLoading(true);
        } catch (error) {
            console.error('Error during claimReward False:', error);
        }

    };
    const UnstakePool = useContractWrite({
        address: pair?.stakingPool,
        abi: stakingPoolABI,
        functionName: 'unstake',
        args: [stakerShares],
        account: userWallet,
        value: getEthFees,
        enabled: false,
        // Additional options if needed
        onError(error) {
            setIsLoading(false)
            console.error('Error during unstaking:', error);
            // Handle the error as needed
        },
        onSuccess(data) {
            setIsLoading(false)
            setConfirmationModalOpen(true);
            setmessage("The unstaking is in the process")
            setTrxHash(data?.hash);
            // Handle success if needed
        },
    });
    const handleUnstake = async () => {
        try {
            handleClose();
            await UnstakePool?.write();
            setIsLoading(true);
        } catch (error) {
            console.error('Error during unstaking:', error);
        }
    };

    const stakerreward = bigNumToNum(stakerrewardOf) / 1e18;
    const StakersRewards = Math?.round(stakerreward * 100) / 100;

    const TrxData = useWaitForTransaction({
        hash: TrxHash,
        onSuccess(data) {
            setIsLoading(false)
        },
        onError(data) {
            setIsLoading(false)
        }
    })
    useEffect(() => {
        const stakerSharesValue = stakerSharesData?.[0]?.toString() / 1e18;
        const truncatedValue = Math?.round(stakerSharesValue * 100) / 100;
        setTrncValue(truncatedValue);
        
        // Assuming timer is the staker's start time in seconds
        const timer = UserTimer;
        // Assuming timePeriod is the time it takes to complete the cycle in seconds
        const timePeriod = bigNumToNum(daysInSec);

        // Calculate the time remaining in seconds
        const calculateTimeRemaining = () => {
            const currentTimeEpoch = Math.floor(Date.now() / 1000);
            const timeRemaining = timer + timePeriod - currentTimeEpoch;
            setTimeRemaining(timeRemaining);

            // If the timer has ended, set the state variable

            // Convert seconds to human-readable format (days, hours, minutes, seconds)
            const calculatedDays = Math.floor(timeRemaining / (60 * 60 * 24));
            const calculatedHours = Math.floor((timeRemaining % (60 * 60 * 24)) / (60 * 60));
            const calculatedMinutes = Math.floor((timeRemaining % (60 * 60)) / 60);
            const calculatedSeconds = timeRemaining % 60;

            // Update state variables
            setDays(calculatedDays);
            setHours(calculatedHours);
            setMinutes(calculatedMinutes);
            setSeconds(calculatedSeconds);

        };

        // Call the function to calculate time remaining immediately
        calculateTimeRemaining();
        // Update the countdown every second
        const intervalId = setInterval(() => {
            calculateTimeRemaining();
            // Check if the timer has ended within the interval
            if (getimeRemaining <= 0 || getimeRemaining === undefined) {
                setTimerEnded(true);
                clearInterval(intervalId);
            }else{
                setTimerEnded(false);
            }
        }, 1000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);

    }, [UserTimer, daysInSec, getimeRemaining]);

    return (
        <>
            <ConfirmationModal paragraph={message} confirmationModalOpen={confirmationModalOpen}
                handleConfirmationCloseModal={handleConfirmationCloseModal}
                handleOpenConfirmationModal={handleOpenConfirmationModal}
            />
            {isLoading ? <Loader />
                : <>
                    {stakerSharesData && bigNumToNum(stakerSharesData[0]) &&
                        <StakeCard style={{ marginBottom: 20, borderRadius: 8 }}>
                            <Grid container>
                                <Grid item xs={11.8} container spacing={2}>
                                    <StakingCard toggle={toggleGrid} stakingImg={Discount} stakingAPR={bigNumToNum(fixedAPR) + "% APR"} stakingDaysLock={lockupPeriodInDays(daysInSec) + " Days Lockup"} />
                                    <StakingCard toggle={toggleGrid} stakingImg={LizaStake} stakingAPR={TrncValue + " $" + tokenData?.symbol} stakingDaysLock="Staked" />
                                    <StakingCard toggle={toggleGrid} stakingImg={Eth} stakingAPR={EthClaims + " ETH"} stakingDaysLock="Unclaimed ETH" />
                                    <StakingCard
                                        toggle={toggleGrid}
                                        stakingImg={LizaStake}
                                        stakingAPR={StakersRewards}
                                        stakingDaysLock="Earned $Liza"
                                        callingFunc={handleLizaReward}
                                        isDisable={StakersRewards > 0 ? false : false}

                                    />
                                    <>
                                        {timerEnded ? (
                                            <StakingCard
                                                toggle={toggleGrid}
                                                stakingImg={LizaStake}
                                                stakingAPR="Unlock"
                                                stakingDaysLock="Unstake Now"

                                            />
                                        ) : (
                                            <StakingCard
                                                toggle={toggleGrid}
                                                stakingImg={LizaStake}
                                                stakingAPR={days + "D " + hours + "H " + minutes + "M " + seconds + "S "}
                                                stakingDaysLock="Lock Remaining"

                                            />
                                         )}  
                                    </>
                                </Grid>
                                {/* <MenuStyle> */}
                                <Grid item xs={0.2}>
                                    <IconButton
                                        color="secondary"
                                        aria-label="more"
                                        id="long-button"
                                        aria-controls={open ? 'long-menu' : undefined}
                                        aria-expanded={open ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                    >
                                        <img src={ThreeDots} />
                                    </IconButton>
                                    <Menu
                                        id="long-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'long-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        PaperProps={{
                                            style: {
                                                maxHeight: ITEM_HEIGHT * 6.5,
                                                width: '40ch',
                                                color: 'black',
                                                borderRadius: "15px",
                                                border: "0.775px solid rgba(255, 255, 255, 0.00)",
                                                background: "#28282e47",
                                                boxShadow: "0px 4px 64px 0px rgba(0, 0, 0, 0.25)",
                                                backdropFilter: "blur(120.92500305175781px)",
                                                padding: "5px 10px",
                                            },
                                        }}
                                    >
                                        <MenuItemDots disabled={EthClaims > 0 ? false : true} onClick={() => handleCompoundETHRelock()}>Compound ETH & Relock</MenuItemDots>
                                        <MenuItemDots disabled={EthClaims > 0 ? false : true} onClick={() => handleClaimETHRelock()}>Claim ETH & Relock</MenuItemDots>
                                        <MenuItemDots disabled={StakersRewards > 0 ? false : true} onClick={() => handleLizaReward()}>Claim $LIZA Rewards</MenuItemDots>
                                        <MenuItemDots disabled={timerEnded ? false : true} onClick={() => handleUnstake()}>Unstake</MenuItemDots>
                                    </Menu>
                                </Grid>
                            </Grid>
                        </StakeCard>
                    }
                </>}
        </>
    )
}
