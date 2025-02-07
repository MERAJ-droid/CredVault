'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { motion } from 'framer-motion'
import { Home, Award, FileCheck, Shield, Settings, Upload, QrCode, CheckCircle, Briefcase } from 'lucide-react'
import Link from 'next/link'
import JobBoard from '@/components/jobs/JobBoard'
import ResumeUpload from '@/components/resume/ResumeUpload'

export default function Dashboard() {
  const { address } = useAuth()
  const [activeSection, setActiveSection] = useState('home')

  const renderMainContent = () => {
    switch(activeSection) {
      case 'jobs':
        return <JobBoard />
      case 'resume':
        return <ResumeUpload />
      default:
        return (
          <>
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Welcome Back</h2>
              <p className="text-[#F8FAFC]/80">Wallet: {address?.slice(0,6)}...{address?.slice(-4)}</p>
              <div className="mt-4 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-[#FACC15]" />
                <span className="text-[#FACC15]">Verified User</span>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <QuickActionCard
                icon={<Upload />}
                title="Upload Credential"
                description="Add a new credential to your vault"
                onClick={() => setActiveSection('resume')}
              />
              <QuickActionCard
                icon={<Briefcase />}
                title="View Jobs"
                description="Browse available positions"
                onClick={() => setActiveSection('jobs')}
              />
              <QuickActionCard
                icon={<CheckCircle />}
                title="Request Verification"
                description="Get your credentials verified"
                onClick={() => {}} // Add an empty onClick handler
              />
            </div>

            {/* Credential Timeline */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Recent Credentials</h2>
              <div className="space-y-4">
                <CredentialCard
                  title="Bachelor's Degree"
                  issuer="University of Technology"
                  date="2023"
                  verified={true}
                />
                <CredentialCard
                  title="Web3 Development Certification"
                  issuer="Blockchain Academy"
                  date="2024"
                  verified={true}
                />
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E1E2E] to-[#6D28D9] flex">
      {/* Sidebar Navigation */}
      <nav className="w-64 bg-[#1E1E2E]/90 backdrop-blur-lg p-6 space-y-8">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-[#FACC15]" />
          <h1 className="text-2xl font-bold text-white">CredVault</h1>
        </div>
        
        <div className="space-y-4">
          <NavItem 
            icon={<Home />} 
            label="Home" 
            active={activeSection === 'home'} 
            onClick={() => setActiveSection('home')}
          />
          <NavItem 
            icon={<Briefcase />} 
            label="Jobs" 
            active={activeSection === 'jobs'} 
            onClick={() => setActiveSection('jobs')}
          />
          <NavItem 
            icon={<Award />} 
            label="My Credentials" 
            active={activeSection === 'credentials'} 
            onClick={() => setActiveSection('credentials')}
          />
          <NavItem 
            icon={<Upload />} 
            label="Upload Resume" 
            active={activeSection === 'resume'} 
            onClick={() => setActiveSection('resume')}
          />
          <NavItem 
            icon={<Settings />} 
            label="Settings" 
            active={activeSection === 'settings'} 
            onClick={() => setActiveSection('settings')}
          />
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {renderMainContent()}
      </main>
    </div>
  )
}

const NavItem = ({ icon, label, active = false, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors w-full ${
      active ? 'bg-[#6D28D9] text-white' : 'text-white/70 hover:bg-[#6D28D9]/50 hover:text-white'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
)
const QuickActionCard = ({ icon, title, description, onClick }: { icon: React.ReactNode; title: string; description: string; onClick: () => void }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    onClick={onClick}
    className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 hover:border-[#FACC15] transition-colors cursor-pointer"
  >
    <div className="text-[#FACC15] mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-[#F8FAFC]/70">{description}</p>
  </motion.div>
)
const CredentialCard = ({ title, issuer, date, verified }: { title: string; issuer: string; date: string; verified: boolean }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className="bg-white/5 backdrop-blur-lg p-4 rounded-lg border border-white/10"
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-white font-medium">{title}</h3>
        <p className="text-[#F8FAFC]/70">{issuer}</p>
        <p className="text-[#F8FAFC]/50 text-sm">{date}</p>
      </div>
      {verified && (
        <Shield className="w-5 h-5 text-[#FACC15]" />
      )}
    </div>
  </motion.div>
)