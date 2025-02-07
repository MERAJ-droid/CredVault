'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'

export const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <div
            {...(!mounted && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="px-6 py-3 bg-gradient-to-r from-[#6D28D9] to-[#1E1E2E] text-white rounded-lg
                    hover:from-[#FACC15] hover:to-[#FACC15] transition-all duration-300
                    shadow-lg hover:shadow-[#FACC15]/20 font-semibold
                    border border-transparent hover:border-[#FACC15]/50"
                  >
                    Connect Wallet
                  </button>
                )
              }
              return (
                <div className="flex items-center gap-4">
                  <button
                    onClick={openChainModal}
                    className="px-4 py-2 bg-[#1E1E2E] text-[#FACC15] rounded-lg
                    hover:bg-[#FACC15] hover:text-[#1E1E2E] transition-all duration-300
                    border border-[#FACC15]/50"
                  >
                    {chain.name}
                  </button>
                  <button
                    onClick={openAccountModal}
                    className="px-4 py-2 bg-gradient-to-r from-[#6D28D9] to-[#1E1E2E] text-white rounded-lg
                    hover:from-[#FACC15] hover:to-[#FACC15] transition-all duration-300"
                  >
                    {account.displayName}
                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
