import React from 'react'

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">CredVault</h2>
          <p className="mt-2 text-sm text-gray-600">Secure Credential Management</p>
        </div>
        {children}
      </div>
    </div>
  )
}
