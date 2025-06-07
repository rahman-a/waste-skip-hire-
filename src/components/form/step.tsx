import { useBookingFlow } from '@/context/Booking-Flow-Context'
import { type LucideIcon } from 'lucide-react'

type Props = {
  id: number
  title: string
  description: string
  Icon: LucideIcon
}

export default function Step({ id, title, description, Icon }: Props) {
  const {
    setStep,
    state: { step },
  } = useBookingFlow()
  const isActive = id === step
  const isCompleted = id < step
  return (
    <div
      key={id}
      className='flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors'
      onClick={() => setStep(id)}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${
          isActive
            ? 'bg-white border-white'
            : isCompleted
            ? 'bg-gray-600 border-gray-500'
            : 'bg-gray-800 border-gray-600'
        }`}
      >
        <Icon
          className={`w-4 h-4 ${isActive ? 'text-gray-900' : 'text-gray-300'}`}
        />
      </div>
      <div className='flex-1 pt-1.5'>
        <h3
          className={`font-medium text-sm ${
            isActive ? 'text-white' : 'text-gray-300'
          }`}
        >
          {title}
        </h3>
        <p className='text-xs text-gray-500 mt-0.5'>{description}</p>
      </div>
    </div>
  )
}
