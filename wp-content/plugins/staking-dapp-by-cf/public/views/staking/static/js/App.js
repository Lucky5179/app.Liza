import './App.css';
import Staking from './views/staking';

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { goerli, mainnet } from 'viem/chains'

const projectId = '9d5543e928cdf4894661cc9647719820'

// 2. Create wagmiConfig
const metadata = {
  name: 'Liza Token',
  description: 'Liza Staking',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, goerli]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })


function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Staking />
    </WagmiConfig>
  );
}

export default App;
