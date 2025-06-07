'use client'

import type { SkipType } from '@/schema/skip'
import {
  ArrowRight,
  CheckCircle,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react'
import React, { useState } from 'react'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'
import { useBookingFlow } from '@/context/Booking-Flow-Context'

interface SkipRentalCard extends React.ComponentProps<'div'> {
  skip: SkipType
}

export default function SkipRentalCard({ skip }: SkipRentalCard) {
  const [isHovered, setIsHovered] = useState(false)
  const {
    state: { selectedSkip },
    setSelectedSkip,
  } = useBookingFlow()
  const isSelected = selectedSkip?.id === skip.id

  const selectSkipHandler = () => {
    if (skip.id === selectedSkip?.id) return setSelectedSkip(null)
    setSelectedSkip(skip)
    console.log('Selected Skip: ', skip)
  }
  return (
    <div className='relative max-w-sm'>
      <SkipCardContainer setIsHovered={setIsHovered}>
        {/* Image section */}
        <div className='relative overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10'></div>
          <img
            src='/images/skip.jpg'
            alt='5 Yard Skip Container'
            width={400}
            height={280}
            className={`w-full h-64 object-cover transition-all duration-700 ${
              isHovered ? 'scale-110 brightness-110' : 'scale-100'
            }`}
          />

          {/* Floating size badge */}
          <div
            className={`absolute top-6 right-6 z-20 transition-all duration-500 ${
              isHovered ? 'transform -translate-y-1 scale-105' : ''
            }`}
          >
            <div className='bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg backdrop-blur-sm border border-blue-400/30'>
              <span className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-white rounded-full animate-pulse'></div>
                {skip.size} Yards
              </span>
            </div>
          </div>

          {/* Floating icons */}
          <div
            className={`absolute bottom-4 left-4 flex flex-col gap-2 z-20 transition-all duration-700 ${
              isHovered
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <SkipCardBadge
              isHidden={skip.allowed_on_road}
              description='Not Allowed On The Road'
              Icon={TriangleAlert}
              className='bg-black text-yellow-500'
            />
            <SkipCardBadge
              isHidden={skip.allows_heavy_waste}
              description='Not Suitable for Heavy Waste'
              Icon={TriangleAlert}
              className='bg-black text-red-500'
            />
          </div>
        </div>

        {/* Content section */}
        <div className='p-6 space-y-6'>
          {/* Header */}
          <SkipCardHeader
            isHovered={isHovered}
            size={skip.size}
            hireDays={skip.hire_period_days}
          />

          {/* Features */}
          <SkipCardFeatures isHovered={isHovered} size={skip.size} />

          {/* Pricing */}
          <SkipCardPricing
            isHovered={isHovered}
            price={skip.price_before_vat}
            vat={skip.vat}
          />

          {/* CTA Button */}
          <SkipCardCTABtn
            isHovered={isHovered}
            isSelected={isSelected}
            selectSkipHandler={selectSkipHandler}
          />
        </div>
      </SkipCardContainer>
    </div>
  )
}

////////////////////////////////////////////////////////////////////
///////////////////////  SKIP CARD CONTAINER
interface SkipCardContainerProps extends React.ComponentProps<'div'> {
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>
}

function SkipCardContainer({ setIsHovered, children }: SkipCardContainerProps) {
  return (
    <>
      {/* Animated background blur */}

      <div className='absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse-slow'></div>

      <div
        className='relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700'></div>

        {/* Floating particles */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-float-1'></div>
          <div className='absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/40 rounded-full animate-float-2'></div>
          <div className='absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-cyan-400/20 rounded-full animate-float-3'></div>
        </div>
        {children}
      </div>
    </>
  )
}

////////////////////////////////////////////////////////////////////
///////////////////////  SKIP CARD PRICING
interface SkipCardPricingProps extends React.ComponentProps<'div'> {
  isHovered: boolean
  price: number
  vat: number
}

function SkipCardPricing({ isHovered, price, vat }: SkipCardPricingProps) {
  return (
    <div className='flex items-end justify-between'>
      <div className='space-y-1'>
        <div className='text-slate-400 text-xs uppercase font-semibold tracking-wide'>
          Total Price
        </div>
        <div className='flex items-baseline gap-2'>
          <span className='text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent'>
            £{price}
          </span>
          {/* <span className='text-slate-500 text-sm line-through'>
          £280
        </span> */}
        </div>
        <div className='text-green-400 text-xs font-medium'>
          VAT Included • {vat}
        </div>
      </div>

      <div
        className={`transition-all duration-500 ${
          isHovered ? 'scale-110 rotate-12' : ''
        }`}
      >
        <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full shadow-lg'>
          <div className='w-6 h-6 bg-white rounded-full flex items-center justify-center'>
            <span className='text-blue-600 text-xs font-bold'>%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

////////////////////////////////////////////////////////////////////
///////////////////////  SKIP CARD HEADER
interface SkipCardHeaderProps extends React.ComponentProps<'div'> {
  isHovered: boolean
  size: number
  hireDays: number
}

function SkipCardHeader({ isHovered, size, hireDays }: SkipCardHeaderProps) {
  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent'>
          {size} Yard Skip
        </h2>
        <div
          className={`transition-all duration-500 ${
            isHovered ? 'rotate-12 scale-110' : ''
          }`}
        >
          <CheckCircle className='text-green-400' size={24} />
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse'></div>
          <span className='text-slate-300 text-sm font-medium'>
            Available Now
          </span>
        </div>
        <div className='w-1 h-1 bg-slate-600 rounded-full'></div>
        <span className='text-slate-400 text-sm'>{hireDays} day hire</span>
      </div>
    </div>
  )
}

////////////////////////////////////////////////////////////////////
///////////////////////  SKIP CARD BADGE
interface SkipCardBadgeProps extends React.ComponentProps<'div'> {
  isHidden: boolean
  description: string
  Icon: LucideIcon
}

function SkipCardBadge({
  isHidden,
  description,
  Icon,
  className,
}: SkipCardBadgeProps) {
  return (
    <div
      className={cn('block backdrop-blur-sm rounded-lg', {
        hidden: isHidden,
      })}
    >
      <Badge variant='secondary' className={className}>
        <Icon />
        {description}
      </Badge>
    </div>
  )
}

////////////////////////////////////////////////////////////////////
///////////////////////  SKIP CARD FEATURES
interface SkipCardFeatureProps extends React.ComponentProps<'div'> {
  isHovered: boolean
  size: number
}

function SkipCardFeatures({ size, isHovered }: SkipCardFeatureProps) {
  return (
    <div
      className={`grid grid-cols-2 gap-3 transition-all duration-700 delay-100 ${
        isHovered ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-2'
      }`}
    >
      <div className='bg-slate-800/50 backdrop-blur-sm rounded-lg p-3 border border-slate-700/50'>
        <div className='text-blue-400 text-xs font-semibold uppercase tracking-wide mb-1'>
          Capacity
        </div>
        <div className='text-white text-sm font-medium'>{size} Cubic Yards</div>
      </div>
      <div className='bg-slate-800/50 backdrop-blur-sm rounded-lg p-3 border border-slate-700/50'>
        <div className='text-purple-400 text-xs font-semibold uppercase tracking-wide mb-1'>
          Delivery
        </div>
        <div className='text-white text-sm font-medium'>Next Day</div>
      </div>
    </div>
  )
}

////////////////////////////////////////////////////////////////////
///////////////////////  SKIP CARD CTA BUTTON
interface SkipCardCTABtnProps extends React.ComponentProps<'button'> {
  isHovered: boolean
  isSelected: boolean
  selectSkipHandler: (skip?: SkipType | null) => void
}

function SkipCardCTABtn({
  isHovered,
  isSelected,
  selectSkipHandler,
}: SkipCardCTABtnProps) {
  return (
    <button
      className={cn(
        `w-full relative overflow-hidden bg-gradient-to-r from-slate-950 
              via-slate-800 to-gray-700  text-white py-4 px-6 rounded-xl font-semibold 
              transition-all duration-500 shadow-lg hover:shadow-blue-500/25 group/btn cursor-pointer`,
        {
          'transform -translate-y-1': isHovered,
          'from-blue-600 via-blue-700 to-purple-700 hover:from-blue-500 hover:via-blue-600 hover:to-purple-600':
            isSelected,
        }
      )}
      onClick={() => selectSkipHandler()}
    >
      <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000'></div>
      <span className='relative flex items-center justify-center gap-3'>
        {isSelected ? <span>Selected</span> : <span>Select This Skip</span>}
        <ArrowRight
          size={20}
          className='group-hover/btn:translate-x-1 transition-transform duration-300'
        />
      </span>
    </button>
  )
}
