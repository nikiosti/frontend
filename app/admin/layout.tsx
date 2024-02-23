'use client'

import PrivateRoute from '@/routes/private/PrivateRoute'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <PrivateRoute>{children}</PrivateRoute>
}

export default Layout
