import React from 'react'
import { Header, Sidebar } from '../components'

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className='ml-[70px]'>
        <Header />
        <div className='2xl:max-w-[1400px] xl:max-w-[1200px] lg:max-w-[1024px] mx-auto'>
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout
