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
    !localStorage.getItem('access') && router.push('/login')
    setLoading(false)
  }, [])

  return loading ? <div></div> : <>{children}</>
}

export default PrivateRoute
