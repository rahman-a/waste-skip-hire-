'use client'

import { useState } from 'react'
import MobileHeader from './mobile-header'
import MobileSteps from './mobile-steps'
import DesktopSidebar from './desktop-sidebar'
import MobileSidebarOverlay from './mobile-sidebar-overlay'
import DetailsCTAFooter from '../details-cta-footer'
import { useBookingFormNavigation } from '@/hooks/useBookingFormNavigation'
import { useBookingFlow } from '@/context/Booking-Flow-Context'

export default function BookingForm() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const {
    state: { step },
  } = useBookingFlow()

  const { FormSections } = useBookingFormNavigation()

  const Section = FormSections[step as keyof typeof FormSections]

  return (
    <div className='min-h-screen bg-gray-900'>
      {/* Mobile Header */}
      {/* <MobileHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

      {/* Mobile Steps Progress */}
      <MobileSteps />

      <div className='flex h-screen lg:h-auto'>
        {/* Desktop Sidebar */}
        <DesktopSidebar />

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <MobileSidebarOverlay setSidebarOpen={setSidebarOpen} />
        )}

        {/* Main Content */}
        <div className='relative flex-1 flex flex-col lg:ml-80'>
          {Section ? <Section /> : null}

          {/* Footer with CTA Button - Fixed on mobile, normal on desktop */}
          <DetailsCTAFooter />
        </div>
      </div>
    </div>
  )
}
