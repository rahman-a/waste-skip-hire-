import { ArrowRight, Rocket } from 'lucide-react'
import { Button } from './ui/button'
import { steps } from '@/data/steps'
import { useBookingFlow } from '@/context/Booking-Flow-Context'
import { useBookingFormNavigation } from '@/hooks/useBookingFormNavigation'
import { cn } from '@/lib/utils'
import type React from 'react'

type Props = {}

export default function DetailsCTAFooter({}: Props) {
  const {
    state: { step, selectedSkip },
  } = useBookingFlow()

  const { handleNextStep, handlePrevStep } = useBookingFormNavigation()

  const activeStep = steps.find((s) => s.id === step)

  const visiblityControlHandler = () => {
    if (step === 3) {
      return !!selectedSkip?.id
    }
    return true
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 lg:fixed lg:left-80 lg:right-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg border-b border-gray-700 transition-all duration-300 ease-in-out',
        {
          'translate-y-0 h-auto px-6 py-5': visiblityControlHandler(),
          'translate-y-full h-0 px-0 py-0 overflow-hidden':
            !visiblityControlHandler(),
        }
      )}
    >
      <div className='max-w-7xl mx-auto'>
        {/* Top disclaimer text - full width and centered */}
        {step === 3 && (
          <div className='w-full mb-2 px-4'>
            <p className='text-gray-400 text-xs sm:text-sm text-center font-light tracking-tight'>
              Imagery and information shown throughout this website may not
              reflect the exact shape or size specification, colours may vary,
              options and/or accessories may be featured at additional cost.
            </p>
          </div>
        )}

        {/* Subtle divider */}
        <div className='h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-2 opacity-70'></div>

        {/* Bottom section with skip info and buttons */}
        <div className='flex flex-wrap  md:flex-nowrap items-center justify-between gap-4'>
          {/* Left section */}
          <div
            className={cn('flex flex-col justify-center gap-1', {
              hidden: step === 3,
            })}
          >
            <h3 className='font-medium'>{activeStep?.title}</h3>
            <p className='text-sm text-gray-400'>{activeStep?.description}</p>
          </div>
          {step === 3 && (
            <SkipDetails
              size={selectedSkip?.size}
              price={selectedSkip?.price_before_vat}
              hire_period={selectedSkip?.hire_period_days}
            />
          )}

          {/* Right section - Action buttons */}
          <div className='flex items-center gap-4 ml-auto'>
            {step > 1 && (
              <Button
                variant='outline'
                className='bg-gray-800/30 border-gray-700 text-gray-200 hover:bg-gray-700 hover:text-white transition-all duration-200'
                onClick={handlePrevStep}
              >
                Back
              </Button>
            )}
            <div>
              {step < steps.length ? (
                <Button
                  className='bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 h-10 transition-all duration-200 shadow-md hover:shadow-blue-500/20'
                  onClick={handleNextStep}
                >
                  Continue
                  <div>
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </div>
                </Button>
              ) : (
                <Button className='bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 h-10 transition-all duration-200 shadow-md hover:shadow-blue-500/20'>
                  Submit
                  <div>
                    <Rocket className='ml-2 h-4 w-4' />
                  </div>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface SkipDetailsProps extends React.ComponentProps<'div'> {
  size?: number
  price?: number
  hire_period?: number
  vat?: number
}

function SkipDetails({ size, price, hire_period }: SkipDetailsProps) {
  return (
    <div className='flex items-center justify-between w-full md:w-auto gap-5'>
      <div className='bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700'>
        <span className='text-white font-medium'>{size} Yard Skip</span>
      </div>
      <div className='flex flex-col'>
        <span className='text-blue-400 text-2xl font-bold'>£{price}</span>
        <span className='text-gray-400 text-xs'>{hire_period} day hire</span>
      </div>
    </div>
  )
}
