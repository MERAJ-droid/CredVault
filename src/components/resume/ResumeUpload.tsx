'use client'

import { useState } from 'react'
import { Upload, File, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [ipfsHash, setIpfsHash] = useState('')

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      setIpfsHash(data.ipfsHash)
    } catch (error) {
      console.error('Error uploading resume:', error)
    }
    setUploading(false)
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-6">Upload Resume</h2>
      
      <div className="space-y-6">
        <div 
          className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-[#FACC15] transition-colors"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            setFile(e.dataTransfer.files[0])
          }}
        >
          {file ? (
            <div className="flex items-center justify-center space-x-3">
              <File className="w-6 h-6 text-[#FACC15]" />
              <span className="text-white">{file.name}</span>
            </div>
          ) : (
            <div className="text-white/70">
              <Upload className="w-12 h-12 mx-auto mb-4" />
              <p>Drag and drop your resume or click to browse</p>
            </div>
          )}
        </div>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="hidden"
          id="resume-upload"
          accept=".pdf,.doc,.docx"
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full py-3 bg-[#6D28D9] text-white rounded-lg hover:bg-[#FACC15] hover:text-[#1E1E2E] transition-all duration-300 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload Resume'}
        </motion.button>

        {ipfsHash && (
          <div className="flex items-center space-x-2 text-[#FACC15]">
            <CheckCircle className="w-5 h-5" />
            <span>Resume uploaded to IPFS</span>
          </div>
        )}
      </div>
    </div>
  )
}
