import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'

interface TokenPayload {
  exp: number
}

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('access')
        if (!token) {
          router.push('/login')
          return
        }

        const decodedToken = jwtDecode<TokenPayload>(token)

        if (decodedToken.exp * 1000 < Date.now()) {
          router.push('/login')
          return
        }

        setLoading(false)
      } catch (error) {
        console.error('Authentication error:', error)
        router.push('/login')
      }
    }

    checkAuth()
  }, [])

  return loading ? <div>Loading...</div> : <>{children}</>
}

export default PrivateRoute
