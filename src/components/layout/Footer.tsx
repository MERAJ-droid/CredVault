'use client'

import { Github, Twitter, MessageCircle, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-transparent to-[#1E1E2E] pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 text-[#F8FAFC]">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#FACC15]">CredVault</h3>
            <p className="text-sm opacity-75">
              Revolutionizing credential management with blockchain technology
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Github />} href="#" />
              <SocialIcon icon={<Twitter />} href="#" />
              <SocialIcon icon={<MessageCircle />} href="#" />
              <SocialIcon icon={<Mail />} href="#" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <FooterLinks 
              links={['Features', 'Security', 'Roadmap', 'Pricing']}
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <FooterLinks 
              links={['Documentation', 'API', 'Support', 'Community']}
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <FooterLinks 
              links={['About', 'Blog', 'Careers', 'Contact']}
            />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-[#F8FAFC]/60">
          <p>© 2024 CredVault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

const SocialIcon = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.1 }}
    className="w-10 h-10 rounded-full bg-[#6D28D9]/20 flex items-center justify-center
    hover:bg-[#FACC15] hover:text-[#1E1E2E] transition-colors duration-300"
  >
    {icon}
  </motion.a>
)

const FooterLinks = ({ links }: { links: string[] }) => (
  <ul className="space-y-2">
    {links.map((link) => (
      <li key={link}>
        <a
          href="#"
          className="text-sm opacity-75 hover:opacity-100 hover:text-[#FACC15] transition-colors duration-300"
        >
          {link}
        </a>
      </li>
    ))}
  </ul>
)
