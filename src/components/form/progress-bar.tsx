import { useBookingFlow } from '@/context/Booking-Flow-Context'
import { steps } from '@/data/steps'

type Props = {}

export default function ProgressBar({}: Props) {
  const {
    state: { step },
  } = useBookingFlow()
  const stepsLength = steps.length
  return (
    <div className='p-6 pb-4'>
      <div className='flex items-center justify-between mb-2'>
        <span className='text-sm font-medium text-white'>
          Step {step} of {stepsLength}
        </span>
        <span className='text-sm text-gray-400'>
          {Math.round((step / stepsLength) * 100)}% complete
        </span>
      </div>
      <div className='w-full bg-gray-700 rounded-full h-2'>
        <div
          className='bg-blue-600 h-2 rounded-full transition-all duration-300'
          style={{ width: `${(step / stepsLength) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}
