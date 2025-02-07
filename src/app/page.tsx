'use client'

import { CustomConnectButton } from '@/components/auth/ConnectButton'
import { Shield, Lock, CheckCircle, Key } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  const { signIn } = useAuth()
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/auth/signup')
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1E1E2E] to-[#6D28D9]">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-12"
        >
          <div className="flex items-center justify-center space-x-4">
            <Shield className="w-12 h-12 text-[#FACC15]" />
            <h1 className="text-6xl font-extrabold text-white font-sans">
              CredVault
            </h1>
          </div>
          
          <motion.p
            className="text-3xl text-[#F8FAFC] max-w-3xl mx-auto font-light"
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 2 }}
          >
            Secure. Verify. Trust.
            <span className="block mt-2 text-[#FACC15]">Welcome to CredVault</span>
          </motion.p>
          
          <div className="max-w-xs mx-auto transform hover:scale-105 transition-transform duration-300">
            <CustomConnectButton />
          </div>

          <div className="flex space-x-4 justify-center">
        <motion.button
          onClick={signIn}
          className="px-6 py-3 bg-[#6D28D9] text-white rounded-lg hover:bg-[#FACC15]"
        >
          Login
        </motion.button>
        
        <motion.button
          onClick={handleGetStarted}
          className="px-6 py-3 bg-[#FACC15] text-[#1E1E2E] rounded-lg hover:bg-[#6D28D9] hover:text-white"
        >
          Get Started
        </motion.button>
      </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <FeatureCard
              icon={<Lock className="w-8 h-8" />}
              title="dNFT Credentials"
              description="Dynamic NFT-based credential management"
            />
            <FeatureCard
              icon={<CheckCircle className="w-8 h-8" />}
              title="Encrypted Storage"
              description="Military-grade encryption for your credentials"
            />
            <FeatureCard
              icon={<Key className="w-8 h-8" />}
              title="Blockchain Verification"
              description="Immutable proof of authenticity"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-12 px-8 py-4 bg-[#6D28D9] text-white rounded-lg hover:bg-[#FACC15] hover:text-[#1E1E2E] transition-all duration-300"
          >
            Start Securing Your Credentials Today
          </motion.button>
        </motion.div>
      </div>
      <Footer />
    </main>
  )
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-[#FACC15] transition-all duration-300"
  >
    <div className="text-[#FACC15] mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-[#F8FAFC]/80">{description}</p>
  </motion.div>
)
