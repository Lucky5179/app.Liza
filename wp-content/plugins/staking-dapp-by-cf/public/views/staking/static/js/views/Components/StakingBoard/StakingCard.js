import styled from '@emotion/styled'
import { P, StakeCard, SubHeading } from '../styles';
import { Box, Grid } from '@mui/material';

const StakeImg = styled.img`
width: 100%;
max-width:35px;
height:35px;
`

const StakeButton = styled.button`
  border-radius: 8px;
  color: ${(props) => (props.color ? props.color : "#ffffff7a")};
  border: 0.5px solid rgba(255, 255, 255, 0.15);
  background: transparent;
  width: 100%;
  padding: 10px 0;
`

const Containerxx = styled.div`
  border-radius: 10px;
  overflow: hidden; /* Ensure the gradient border doesn't overflow */
`;


const StakingCard = (props) => {
 
    return (
      <Grid item xs={12} sm={6} md={2.4}>
        <StakeCard>
            <Box>
              <StakeImg src={props.stakingImg} />
              <SubHeading>{props.stakingAPR}</SubHeading>
              <P p="0" align="center">{props.stakingDaysLock}</P>
            </Box>
        </StakeCard>
      </Grid>
    )
}

export default StakingCard