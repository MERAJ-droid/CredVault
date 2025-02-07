import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'viem'
import { avalancheFuji } from 'viem/chains'

if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID) {
  throw new Error('You need to provide a NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID env variable')
}

export const wagmiConfig = getDefaultConfig({
  appName: 'CredVault',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains: [avalancheFuji],
  transports: {
    [avalancheFuji.id]: http()
  },
})

export const chains = [avalancheFuji]