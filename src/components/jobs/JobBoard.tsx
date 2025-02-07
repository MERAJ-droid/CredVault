'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Briefcase, Building2, DollarSign } from 'lucide-react'

interface Job {
  id: string
  title: string
  company: string
  salary: string
  location: string
  type: string
  requirements: string[]
}

export default function JobBoard() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    salary: '',
    company: '',
    type: ''
  })

  useEffect(() => {
    fetchJobs()
  }, [filters])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/jobs?' + new URLSearchParams(filters))
      const data = await response.json()
      setJobs(data.jobs)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Job Board</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SearchFilter
            icon={<Search />}
            placeholder="Search jobs..."
            value={filters.search}
            onChange={(value: string) => setFilters({...filters, search: value})}
          />
          <SearchFilter
            icon={<DollarSign />}
            placeholder="Salary range"
            value={filters.salary}
            onChange={(value: string) => setFilters({...filters, salary: value})}
          />
          <SearchFilter
            icon={<Building2 />}
            placeholder="Company"
            value={filters.company}
            onChange={(value: string) => setFilters({...filters, company: value})}
          />
          <SearchFilter
            icon={<Briefcase />}
            placeholder="Job type"
            value={filters.type}
            onChange={(value: string) => setFilters({...filters, type: value})}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white text-xl"
          >
            Loading jobs...
          </motion.div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}

const SearchFilter = ({ icon, placeholder, value, onChange }: { icon: React.ReactNode, placeholder: string, value: string, onChange: (value: string) => void }) => (
  <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-3">
    {icon}
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent border-none focus:outline-none text-white w-full"
    />
  </div>
)

const JobCard = ({ job }: { job: Job }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-[#FACC15]"
  >
    <h2 className="text-xl font-semibold text-white mb-2">{job.title}</h2>
    <p className="text-[#F8FAFC]/70 mb-4">{job.company}</p>
    <div className="flex items-center space-x-2 text-[#FACC15] mb-4">
      <DollarSign className="w-4 h-4" />
      <span>{job.salary}</span>
    </div>
    <div className="space-y-2">
      {job.requirements.map((req, index) => (
        <p key={index} className="text-[#F8FAFC]/60 text-sm">• {req}</p>
      ))}
    </div>
    <button className="mt-4 w-full py-2 bg-[#6D28D9] text-white rounded-lg hover:bg-[#FACC15] hover:text-[#1E1E2E] transition-all duration-300">
      Apply Now
    </button>
  </motion.div>
)
