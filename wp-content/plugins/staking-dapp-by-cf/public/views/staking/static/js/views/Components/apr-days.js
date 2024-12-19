import React from 'react'
import { CardWrap, Containerxx, P, SmallHeading, Spliterr, SubHeading } from './styles'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import styled from '@emotion/styled';
import { useContractRead } from 'wagmi';
import { chainId, pairA, pairB, stakingPoolABI, tokenStakingPoolABI } from '../../config/contract-abis';
import { Grid } from '@mui/material';
import StakingModal from './stakingModal';

const AprDays = ({ pair,defaultSelectedValue }) => {
    const { data: daysInSec } = useContractRead({
        address: pair?.stakingPool,
        abi: stakingPoolABI,
        functionName: 'lockupPeriod',
        chainId: chainId,
    });
    const { data: fixedAPR } = useContractRead({
        address: pair?.tokenStakingPool,
        abi: tokenStakingPoolABI,
        functionName: 'fixedAPR',
        chainId: chainId,
    })

    // Convert BigNumber to number
    const bigNumToNum = (arg) => arg ? parseInt(arg?.toString()) : null;

    // Convert second to days
    const lockupPeriodInDays = (arg) => arg ? bigNumToNum(arg) / 86400 : null;

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 5,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: "#ffffff4d",
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundImage: 'linear-gradient(190deg, #49D9D9 16%, #D949CB 36%)',
        },
    }));

    return (
        <Grid item xs={12} sm={6} md={3}>
            <StakingModal defaultSelectedValue={defaultSelectedValue} >
                <Containerxx>
                    <CardWrap>
                        <Spliterr p="10px 0 5px">
                            <SubHeading>{lockupPeriodInDays(daysInSec)} Days  </SubHeading>
                            <P fs="14px" p="10px 0px">{pair?.ethReward}% ETH</P>
                        </Spliterr>
                        <Spliterr p="15px 0 10px">
                            <SmallHeading>{bigNumToNum(fixedAPR)}% <span style={{ fontSize: "18px", color: "#49D9D9" }}>APR</span> </SmallHeading>
                        </Spliterr>
                        <BorderLinearProgress variant="determinate" value={0} />
                    </CardWrap>
                </Containerxx>
            </StakingModal>
        </Grid>
    )
}

export default AprDays