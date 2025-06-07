import { cn } from '@/lib/utils'
import type React from 'react'

interface PostCodeProps extends React.ComponentProps<'div'> {}

export default function PostCode({ className }: PostCodeProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center min-h-[150px] sm:min-h-[200px] p-4 sm:p-6 md:p-8',
        className
      )}
    >
      <div className='text-center w-full max-w-md'>
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-light text-gray-500 tracking-wide px-4'>
          Post Code Section
        </h2>
        <div className='w-12 sm:w-16 h-0.5 bg-gray-300 mx-auto mt-3 sm:mt-4'></div>
      </div>
    </div>
  )
}
