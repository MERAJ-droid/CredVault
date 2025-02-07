'use client'

import { CustomConnectButton } from '@/components/auth/ConnectButton'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Login() {
  const { signIn, address } = useAuth()
  const router = useRouter()

  const handleLogin = async () => {
    await signIn()
    if (address) {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E1E2E] to-[#6D28D9] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Login to CredVault</h1>
        
        <div className="space-y-6">
          <CustomConnectButton />
          
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-[#6D28D9] text-white rounded-lg hover:bg-[#FACC15] hover:text-[#1E1E2E] transition-all duration-300"
          >
            Sign In with Wallet
          </button>
          
          <p className="text-center text-white">
            New to CredVault?{' '}
            <Link href="/auth/signup" className="text-[#FACC15] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
