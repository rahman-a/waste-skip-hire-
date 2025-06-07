import { useRef, useEffect } from 'react'
import { steps } from '@/data/steps'
import { useBookingFlow } from '@/context/Booking-Flow-Context'
import PostCode from '@/components/form/sections/Post-Code'
import WasteType from '@/components/form/sections/Waste-Type'
import SkipSizeSelector from '@/components/form/sections/Skip-Size'
import PermitCheck from '@/components/form/sections/Permit-Check'
import DeliveryDate from '@/components/form/sections/Delivery-Date'
import Payment from '@/components/form/sections/Payment'

export const useBookingFormNavigation = () => {
  const horizontalScrollRef = useRef<HTMLDivElement>(null)

  const {
    state: { step },
    setStep,
  } = useBookingFlow()

  const FormSections = {
    1: PostCode,
    2: WasteType,
    3: SkipSizeSelector,
    4: PermitCheck,
    5: DeliveryDate,
    6: Payment,
  }

  // Scroll to active step when currentStep changes
  useEffect(() => {
    if (horizontalScrollRef.current) {
      const activeStepElement = horizontalScrollRef.current.querySelector(
        `[data-step="${step}"]`
      )
      if (activeStepElement) {
        const containerWidth = horizontalScrollRef.current.offsetWidth
        const activeElementLeft = (activeStepElement as HTMLElement).offsetLeft
        const activeElementWidth = (activeStepElement as HTMLElement)
          .offsetWidth

        // Center the active step in the container
        horizontalScrollRef.current.scrollLeft =
          activeElementLeft - containerWidth / 2 + activeElementWidth / 2
      }
    }
  }, [step])

  const handleNextStep = () => {
    if (step < steps.length) {
      setStep(step + 1)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return {
    FormSections,
    horizontalScrollRef,
    handleNextStep,
    handlePrevStep,
  }
}
