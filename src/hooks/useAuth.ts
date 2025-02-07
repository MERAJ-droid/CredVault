import { useState, useCallback } from 'react'
import { SiweMessage } from 'siwe'
import { useAccount, useSignMessage } from 'wagmi'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const signIn = useCallback(async () => {
    try {
      const nonce = Math.random().toString(36).substring(2, 10);
    
    const message = new SiweMessage({
      domain: window.location.host,
      address: address,
      statement: 'Sign in with Ethereum to CredVault',
      uri: window.location.origin,
      version: '1',
      chainId: 1,
      nonce: nonce

      })

      const signature = await signMessageAsync({
        message: message.prepareMessage()
      })

      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: address, signature })
      })

      const data = await response.json()
      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setIsAuthenticated(true)
        router.push('/dashboard')
        return true
      }
      return false
    } catch (error) {
      console.error('Error signing in:', error)
      return false
    }
  }, [address, signMessageAsync, router])

  const signUp = async (userData: any) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userData, walletAddress: address })
      })

      const data = await response.json()
      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setIsAuthenticated(true)
        router.push('/dashboard')
        return true
      }
      return false
    } catch (error) {
      console.error('Error signing up:', error)
      return false
    }
  }

  return {
    isAuthenticated,
    signIn,
    signUp,
    address
  }
}