'use client'

import { useState } from 'react'
import { CustomConnectButton } from '@/components/auth/ConnectButton'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Signup() {
  const [userType, setUserType] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add signup logic here
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
            />
          </div>

          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 rounded-lg bg-white/5 text-white border border-white/20"
            />
          </div>

          <CustomConnectButton />
          
          <button
            type="submit"
            className="w-full py-3 bg-[#6D28D9] text-white rounded-lg hover:bg-[#FACC15] hover:text-[#1E1E2E] transition-all duration-300"
          >
            Create Account
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
