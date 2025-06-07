import { steps } from '@/data/steps'
import React from 'react'
import Step from './step'
import Logo from '../logo'

type Props = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MobileSidebarOverlay({ setSidebarOpen }: Props) {
  return (
    <div
      className='lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50'
      onClick={() => setSidebarOpen(false)}
    >
      <div
        className='bg-gray-800 w-80 h-full p-6'
        onClick={(e) => e.stopPropagation()}
      >
        <Logo setSidebarOpen={setSidebarOpen} isOverlay />
        <div className='space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide pr-2'>
          {steps.map((step) => (
            <Step
              id={step.id}
              title={step.title}
              description={step.description}
              Icon={step.icon}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
