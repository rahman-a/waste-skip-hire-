import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import React from 'react'

type ILoaderProps = React.ComponentPropsWithRef<'div'> & {
  variant?: 'default' | 'full' | 'medium' | 'small'
  className?: string
  show?: boolean
}

const Loader = ({
  variant,
  className,
  show = true,
  ref,
  ...props
}: ILoaderProps) => {
  return (
    <div
      {...props}
      ref={ref}
      style={{ display: show ? 'grid' : 'none' }}
      className={cn(loaderContainerVariants({ variant }), className)}
    >
      <div className={loaderVariants({ variant })}>
        {variant === 'full' && <Loader2 className='w-20 h-20' />}
      </div>
    </div>
  )
}

const loaderContainerVariants = cva('w-full grid place-content-center z-10', {
  variants: {
    variant: {
      default:
        'h-full absolute top-0 left-0 bg-slate-500/30 dark:bg-slate-900/85',
      full: 'min-h-screen',
      medium:
        'h-full absolute top-0 left-0 bg-slate-500/30 dark:bg-slate-900/85',
      small:
        'h-full absolute top-0 left-0 bg-slate-500/30 dark:bg-slate-900/85',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const loaderVariants = cva(
  'animate-spin rounded-full  border-b-2 border-gray-900 dark:border-gray-100',
  {
    variants: {
      variant: {
        default: 'h-24 w-24',
        full: 'h-32 w-32',
        medium: 'h-16 w-16',
        small: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

Loader.displayName = 'Loader'

export { Loader }
