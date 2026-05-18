import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { defineChain } from 'viem'
import { injected, coinbaseWallet } from 'wagmi/connectors'

export const arcTestnet = defineChain({
  id: 5042002,
  name: 'Arc Testnet',
  nativeCurrency: { name: 'USDC', symbol: 'USDC', decimals: 6 },
  rpcUrls: { default: { http: ['https://rpc.testnet.arc.network'] } },
  blockExplorers: { default: { name: 'ArcScan', url: 'https://testnet.arcscan.app' } },
  testnet: true,
})

export const wagmiConfig = createConfig({
  chains: [arcTestnet, sepolia],
  connectors: [injected(), coinbaseWallet({ appName: 'Adashe' })],
  transports: {
    [arcTestnet.id]: http(),
    [sepolia.id]: http(),
  },
})
