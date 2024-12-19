import { Box, Grid, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ApproveButton, Connectbutton, EthBtn, InputBalFetch, InputRadio, MaxButton, MaxWrap, P, Spliterr, StakeButton, SubHeading, X } from './styles'
import LizaLogo from "../../assets/images/lizatoken.png"
import { chainId, pairA, pairB, pairC, pairD, stakingPoolABI, tokenContract, TokenContractABI, tokenStakingPoolABI } from '../../config/contract-abis'
import { useAccount, useBalance, useContractRead, useContractWrite, useNetwork, useWaitForTransaction } from 'wagmi'
import Xicon from "../../assets/images/x.png"
import Loader from './loader'
import styled from '@emotion/styled'
import ConfirmationModal from './confirmationModal'
import { utils as ethersUtils } from 'ethers';

const StakingModal = ({buttonTitle, children, defaultSelectedValue }) => {
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const handleOpenConfirmationModal = () => {
        // Add any logic you need before opening the modal
        setConfirmationModalOpen(true);
    };

    const handleConfirmationCloseModal = () => {
        // Add any logic you need before closing the modal
        setConfirmationModalOpen(false);
    };
    const [openModal, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(defaultSelectedValue);
    const [inputValue, setInputValue] = useState('0');
    const [getBalance, setBalance] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [getApproved, setApproved] = useState(false);
    const { address: userWallet, isConnected } = useAccount();
    const [enabled, setEnabled] = useState(false);
    const [message, setmessage] = useState(" ");

    const [getEthFees, setEthFees] = useState(0);
    const { data: tokenData } = useBalance({
        address: userWallet,
        token: tokenContract,
        chainId: chainId,
    });
    // Convert BigNumber to number
    const bigNumToNum = (arg) => arg ? parseInt(arg?.toString()) : null;
    const truncateDecimal = (number, digits = 4) => {
        if (isNaN(number)) {
          return null; // or handle the case where the input is not a valid number
        }
      
        // Use toFixed to limit the number of digits after the decimal point
        const truncatedNumber = parseFloat(number)?.toFixed(digits);
      
        // Convert the result back to a number if needed
        return parseFloat(truncatedNumber);
      };
    useEffect(() => {
        setBalance(() => {
            let bal = tokenData?.formatted;
            return bal;
        });

        if (userWallet) { setEnabled(true) }
    }, [tokenData]);

    const handleMaxButtonClick = () => {
        setInputValue(getBalance?.toString());
    };

    const { chain } = useNetwork();
    const handleOpenModal = () => {
        if (chain?.id === chainId) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }; const handleCloseModal = () => setOpen(false);
    const handleChange = (newValue) => setSelectedValue(newValue);

    const radioStyle = (value) => ({
        display: 'inline-table',
        height: '60px',
        width: "100%",
        borderRadius: '10px',
        padding: '10px',
        textAlign: 'center',
        border: selectedValue === value ? '1px solid #49D9D9' : '1px solid #ffffff9c',
        color: selectedValue === value ? "#49D9D9" : "#ffffff9c",
        cursor: 'pointer'
    });

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
         max-width: 700px;
         padding: 20px 30px;
         margin: 0px 0px;
         @media screen and (max-width:699px){
             max-width: 400px;
            }
            @media screen and (max-width:499px){
             padding: 20px 20px;
             max-width: 300px;
         }
`;



    // const { data: fixedAPR } = useContractRead({
    const approveContract = useContractWrite({
        address: tokenContract,
        abi: TokenContractABI,
        chainId: chainId,
        functionName: 'approve',
        args: [selectedValue?.stakingPool, '1100000000000000000000000000000000000'],
        overrides: { from: userWallet },
        onError(error) {
            setIsLoading(false)
        },
        onSuccess(data) {
            setApproved(false)
            setIsLoading(true)
        },
    })
    const checkApprove = useContractRead({
        address: tokenContract,
        abi: TokenContractABI,
        chainId: chainId,
        functionName: 'allowance',
        args: [userWallet, selectedValue?.stakingPool],
        enabled: enabled,
        onSuccess(data) {
            if (parseInt(data?._hex) > 0) {
                setApproved(false)
            } else {
                setApproved(true)
            }
        },
        onError(error) {
            setApproved(true)
        },
    })

    const isValidInput = /^(\d*\.)?\d+$/.test(inputValue);

    let valueInWei;
    
    if (isValidInput) {
      // Convert the input value to a BigNumber using ethers utils
      valueInWei = ethersUtils?.parseUnits(inputValue, 18)?.toString();
    } else {
      // Handle the case where the input is not a valid number
      console.error('Invalid input value');
      // You may want to set a default value or take appropriate action
    }
    const EthFees = useContractRead({
        address: selectedValue?.stakingPool,
        abi: stakingPoolABI,
        functionName: 'getCurrentFeeInETH',
        watch: true,
        onError(error) {
            console.error('Error during getCurrentFeeInETH:', error);
        },
        onSuccess(data) {
            setEthFees(data);
        },
    });
    const stakeContract = useContractWrite({
        address: selectedValue?.stakingPool,
        abi: stakingPoolABI,
        functionName: 'stake',
        args: [valueInWei],
        account: userWallet,
        value: getEthFees,
        onError(error) {
            setIsLoading(false)
            console.error("Error in stakeContract:", error);
            setConfirmationModalOpen(true);
            setmessage("The Transaction have been rejected")
            // Handle the error as needed
        },
        onSuccess(data) {
            setOpen(false);
            setConfirmationModalOpen(true);
            setmessage("The staking is in process")
            setIsLoading(false)
            // Handle success if needed
        },
    });
    const [ApproveSuccess, setApproveSuccess] = useState(0);
    const [ApproveTrxHash, setApproveTrxHash] = useState(0);

    const ApproveTrxData = useWaitForTransaction({
        hash: ApproveSuccess,
        onSuccess(data) {
        },
        onError(data) {
            setIsLoading(false)
        }
    })
    const [StakingContSuccess, setStakingContSuccess] = useState(0);

    const StakingContTrxData = useWaitForTransaction({
        hash: StakingContSuccess,
        onSuccess(data) {
            setIsLoading(false)
        },
        onError(data) {
            setIsLoading(false)
        }
    })
    useEffect(() => {
        setStakingContSuccess(stakeContract?.data?.hash)
        setApproveTrxHash(ApproveTrxData?.data?.blockHash)
        setApproveSuccess(approveContract?.data?.hash)

    }, [StakingContTrxData, stakeContract, approveContract, ApproveTrxData]);

    const handleStake = async () => {
        setIsLoading(true);
        try {
            // Wait for approveContract.write() to complete
            await approveContract?.write();
        } catch (error) {
            console.error("Error while staking:", error);
        }
    };

    useEffect(() => {
        if (ApproveTrxHash && ApproveTrxHash?.length > 0) {
            setIsLoading(true);
            stakeContract?.write();
        }
    }, [ApproveTrxHash]); // Run the useEffect whenever TrxHash changes


    const { data: daysInSecA } = useContractRead({ address: pairA?.stakingPool, abi: stakingPoolABI, functionName: 'lockupPeriod', chainId: chainId });
    const { data: fixedAPRA } = useContractRead({ address: pairA?.tokenStakingPool, abi: tokenStakingPoolABI, functionName: 'fixedAPR', chainId: chainId })

    const { data: daysInSecB } = useContractRead({ address: pairB?.stakingPool, abi: stakingPoolABI, functionName: 'lockupPeriod', chainId: chainId });
    const { data: fixedAPRB } = useContractRead({ address: pairB?.tokenStakingPool, abi: tokenStakingPoolABI, functionName: 'fixedAPR', chainId: chainId })

    const { data: daysInSecC } = useContractRead({ address: pairC?.stakingPool, abi: stakingPoolABI, functionName: 'lockupPeriod', chainId: chainId });
    const { data: fixedAPRC } = useContractRead({ address: pairC?.tokenStakingPool, abi: tokenStakingPoolABI, functionName: 'fixedAPR', chainId: chainId })

    const { data: daysInSecD } = useContractRead({ address: pairD?.stakingPool, abi: stakingPoolABI, functionName: 'lockupPeriod', chainId: chainId });
    const { data: fixedAPRD } = useContractRead({ address: pairD?.tokenStakingPool, abi: tokenStakingPoolABI, functionName: 'fixedAPR', chainId: chainId })

    // Convert second to days
    const lockupPeriodInDays = (arg) => arg ? bigNumToNum(arg) / 86400 : null;

    return (
        <>
            <ConfirmationModal paragraph={message} confirmationModalOpen={confirmationModalOpen}
                handleConfirmationCloseModal={handleConfirmationCloseModal}
                handleOpenConfirmationModal={handleOpenConfirmationModal}
            />
            {/* Content inside your StakeButton */}
            {/* </ConfirmationModal> */}
            <StakeButton onClick={() => handleOpenModal()} style={{ border: buttonTitle ? "" : 0 }}>{buttonTitle ? buttonTitle : children}</StakeButton>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <WrapModal >
                    <Spliterr p="10px 0 20px">
                        <SubHeading>Select Staking Option</SubHeading>
                        <X onClick={handleCloseModal} src={Xicon} />
                    </Spliterr>
                    <EthBtn>
                        <Grid container spacing={4} >
                            <Grid item xs={5.7} md={2.9}>
                                <label style={radioStyle(pairA)} onClick={() => handleChange(pairA)}>
                                    <InputRadio type="radio" value={pairA} checked={selectedValue === pairA} onChange={() => { }} />
                                    <br />
                                    <SubHeading fs="16px" align="left">
                                        {lockupPeriodInDays(daysInSecA)} Days
                                    </SubHeading>

                                    <SubHeading align="left" p="10px 0">
                                        <span style={{ fontSize: "24px" }}>{bigNumToNum(fixedAPRA)}%</span> <span style={{ fontSize: "18px" }}>APR</span>
                                    </SubHeading>
                                </label>
                            </Grid>
                            <Grid item xs={5.7} md={2.9}>
                                <label style={radioStyle(pairB)} onClick={() => handleChange(pairB)}>
                                    <InputRadio type="radio" value={pairB} checked={selectedValue === pairB} onChange={() => { }} />
                                    <br />
                                    <SubHeading ow="anywhere" fs="16px" align="left">
                                        {lockupPeriodInDays(daysInSecB)} Days
                                    </SubHeading>

                                    <SubHeading align="left" p="10px 0">
                                        <span style={{ fontSize: "24px" }}>{bigNumToNum(fixedAPRB)}% </span> <span style={{ fontSize: "18px" }}>APR</span>
                                    </SubHeading>
                                </label>
                            </Grid>
                            <Grid item xs={5.7} md={2.9}>
                                <label style={radioStyle(pairC)} onClick={() => handleChange(pairC)}>
                                    <InputRadio type="radio" value={pairC} checked={selectedValue === pairC} onChange={() => { }} />
                                    <br />
                                    <SubHeading fs="16px" align="left">
                                        {lockupPeriodInDays(daysInSecC)} Days
                                    </SubHeading>

                                    <SubHeading align="left" p="10px 0">
                                        <span style={{ fontSize: "24px" }}>{bigNumToNum(fixedAPRC)}% </span> <span style={{ fontSize: "18px" }}>APR</span>
                                    </SubHeading>
                                </label>
                            </Grid>
                            <Grid item xs={5.7} md={2.9}>
                                <label style={radioStyle(pairD)} onClick={() => handleChange(pairD)}>
                                    <InputRadio type="radio" value={pairD} checked={selectedValue === pairD} onChange={() => { }} />
                                    <br />
                                    <SubHeading fs="16px" align="left">
                                        {lockupPeriodInDays(daysInSecD)} Days
                                    </SubHeading>
                                    <SubHeading align="left" p="10px 0">
                                        <span style={{ fontSize: "24px" }}>{bigNumToNum(fixedAPRD)}% </span> <span style={{ fontSize: "18px" }}>APR</span>
                                    </SubHeading>
                                </label>
                            </Grid>
                        </Grid>
                    </EthBtn>
                    <MaxWrap>
                        <Spliterr>
                            <InputBalFetch
                                autoFocus
                                type="Number"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <MaxButton onClick={handleMaxButtonClick}>Max</MaxButton>
                        </Spliterr>
                    </MaxWrap>
                    <Spliterr>
                        <div style={{ display: "flex", alignItems: "center", }}>
                            <img src={LizaLogo} />
                            <SubHeading p="0 0 0 10px"> LizaX Balance :</SubHeading>
                        </div>
                        <SubHeading p="0 0 0 10px"> {truncateDecimal(getBalance)} LizaX</SubHeading>

                    </Spliterr>
                    <Spliterr>
                        <P> You are staking {truncateDecimal(inputValue)} LizaX token.</P>
                        {isLoading ? <Loader />
                            :
                            <StakeButton disabled={inputValue > 0 ? false : true} MaxWidth="150px" onClick={handleStake} inputValue={inputValue} >Stake {truncateDecimal(inputValue)} LizaX</StakeButton>}
                    </Spliterr>
                </WrapModal>
            </Modal>
        </>
    )
}

export default StakingModal