import { steps } from '@/data/steps'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProgressBar from './progress-bar'
import Step from './step'
import { useBookingFlow } from '@/context/Booking-Flow-Context'
import { useBookingFormNavigation } from '@/hooks/useBookingFormNavigation'

type Props = {}

export default function MobileSteps({}: Props) {
  const { handleNextStep, handlePrevStep, horizontalScrollRef } =
    useBookingFormNavigation()
  const {
    state: { step },
  } = useBookingFlow()
  const stepsLength = steps.length
  return (
    <div className='lg:hidden bg-gray-800 border-b border-gray-700 p-4'>
      <ProgressBar />

      {/* Mobile Steps Horizontal Scroll */}
      <div className='relative'>
        {/* Left scroll indicator */}
        <button
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-80 p-1 rounded-full text-gray-300 hover:text-white ${
            step <= 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handlePrevStep}
          disabled={step <= 1}
        >
          <ChevronLeft className='w-5 h-5' />
        </button>

        <div
          className='overflow-x-auto scrollbar-hide px-6'
          ref={horizontalScrollRef}
        >
          <div className='flex gap-3 pb-2' style={{ width: 'max-content' }}>
            {steps.map((stepItem) => (
              <Step
                key={stepItem.id}
                id={stepItem.id}
                title={stepItem.title}
                description={stepItem.description}
                Icon={stepItem.icon}
              />
            ))}
          </div>
        </div>

        {/* Right scroll indicator */}
        <button
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-80 p-1 rounded-full text-gray-300 hover:text-white ${
            step >= stepsLength ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleNextStep}
          disabled={step >= stepsLength}
        >
          <ChevronRight className='w-5 h-5' />
        </button>
      </div>
    </div>
  )
}
