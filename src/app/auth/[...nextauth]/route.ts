import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { SiweMessage } from 'siwe'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Ethereum',
      credentials: {
        message: { label: "Message", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(JSON.parse(credentials?.message || '{}'))
          const fields = await siwe.verify({ signature: credentials?.signature || '' })
          
          const nonce = await fetch('/api/auth/nonce').then(res => res.text())
          if (fields.data.nonce !== nonce) {
            return null
          }

          return {
            id: fields.data.address,
            address: fields.data.address,
          }
        } catch (e) {
          return null
        }
      }    })
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.address = token.sub
      session.user.address = token.sub
      return session
    }  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' }
}

const handler = NextAuth({
  ...authOptions,
  session: { strategy: 'jwt' as const }
})
export { handler as GET, handler as POST }
