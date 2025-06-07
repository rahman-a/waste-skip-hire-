import { steps } from '@/data/steps'
import Step from './step'
import ProgressBar from './progress-bar'

type Props = {}

export default function DesktopSidebar({}: Props) {
  return (
    <div className='hidden lg:flex lg:flex-col fixed left-0 top-0 w-80 bg-gray-800 border-r border-gray-700 h-screen z-40'>
      {/* Progress Bar */}
      <ProgressBar />

      {/* Steps - Full height container */}
      <div className='flex-1 px-6 pb-6 overflow-hidden'>
        <div className='h-full overflow-y-auto scrollbar-hide pr-2'>
          <div className='space-y-4'>
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
    </div>
  )
}
