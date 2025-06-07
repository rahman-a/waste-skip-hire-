import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from './ui/button'
import { X } from 'lucide-react'

interface Props extends React.ComponentProps<'div'> {
  isOverlay?: boolean
  setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Logo({ setSidebarOpen, isOverlay, className }: Props) {
  return (
    <div className={cn('p-6 pb-0', className)}>
      <div className='flex items-center gap-2'>
        <div className='w-6 h-6 bg-blue-600 rounded flex items-center justify-center'>
          <div className='w-3 h-3 bg-white rounded-sm transform rotate-12'></div>
        </div>
        <span className='text-xl font-semibold text-blue-400'>Rem Waste</span>
      </div>
      {isOverlay && setSidebarOpen && (
        <Button
          variant='ghost'
          size='sm'
          onClick={() => setSidebarOpen(false)}
          className='text-gray-300 hover:text-white hover:bg-gray-700'
        >
          <X className='w-5 h-5' />
        </Button>
      )}
    </div>
  )
}
