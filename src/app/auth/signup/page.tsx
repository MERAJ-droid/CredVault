'use client'

import { useState } from 'react'
import { CustomConnectButton } from '@/components/auth/ConnectButton'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function Signup() {
  const router = useRouter()
  const { address } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!address) {
      alert('Please connect your wallet first')
      setIsLoading(false)
      return
    }

    if (!userType || !formData.name || !formData.email) {
      alert('Please fill in all required fields')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          walletAddress: address,
          userType
        }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('credvault_token', data.token)
        router.push('/dashboard')
      } else {
        alert(data.message || 'Signup failed')
      }
    } catch (error) {
      console.error('Signup error:', error)
      alert('Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E1E2E] to-[#6D28D9] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Create Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2">Account Type</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/5 text-white border border-white/20"
              required
            >
              <option value="">Select Type</option>
              <option value="individual">Individual</option>
              <option value="institution">Institution</option>
              <option value="verifier">Verifier</option>
            </select>
          </div>

          <div>
            <label className="block text-white mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 rounded-lg bg-white/5 text-white border border-white/20"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 rounded-lg bg-white/5 text-white border border-white/20"
              required
            />
          </div>

          <CustomConnectButton />
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#6D28D9] text-white rounded-lg hover:bg-[#FACC15] hover:text-[#1E1E2E] transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
          
          <p className="text-center text-white">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#FACC15] hover:underline">
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}
