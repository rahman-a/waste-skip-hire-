import React from 'react'
import { Button } from '../ui/button'
import { Menu, X } from 'lucide-react'
import Logo from '../logo'

type Props = {
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MobileHeader({ sidebarOpen, setSidebarOpen }: Props) {
  return (
    <div className='lg:hidden bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between'>
      <Logo />
      <Button
        variant='ghost'
        size='sm'
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className='lg:hidden text-gray-300 hover:text-white hover:bg-gray-700'
      >
        {sidebarOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
      </Button>
    </div>
  )
}
