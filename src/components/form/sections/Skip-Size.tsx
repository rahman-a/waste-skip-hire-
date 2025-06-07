import { useGetAllSkips } from '@/service/hooks/skips'
import { Loader } from '../../loader'
import SkipRentalCard from '../../skip-card'
import React, { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useBookingFlow } from '@/context/Booking-Flow-Context'
import { toast } from 'sonner'

interface SkipSizeSelectorProps extends React.ComponentProps<'div'> {}

export default function SkipSizeSelector({ className }: SkipSizeSelectorProps) {
  const {
    state: { address, selectedSkip },
  } = useBookingFlow()

  const {
    data: skips,
    isFetching,
    isError,
    isSuccess,
    error,
  } = useGetAllSkips({
    postcode: address?.postcode as string,
    area: address?.city as string,
  })

  useEffect(() => {
    console.log('skips: ', skips)
    if (isError) {
      toast.error(error.message)
    }
  }, [isSuccess, isError])
  return (
    <div
      className={cn(
        'flex flex-1 justify-center',
        {
          'flex-col': selectedSkip?.id,
        },
        className
      )}
    >
      {/* Content */}
      {isFetching ? (
        <div className='w-full h-screen'>
          <Loader />
        </div>
      ) : (
        <div className='grid items-center justify-items-center sm:grid-cols-2 xl:grid-cols-3 gap-10 p-4 sm:p-6'>
          {skips?.length &&
            skips.map((skip) => <SkipRentalCard key={skip.id} skip={skip} />)}
        </div>
      )}
      {selectedSkip?.id && (
        <div className='relative w-full py-28 md:py-18'></div>
      )}
    </div>
  )
}
