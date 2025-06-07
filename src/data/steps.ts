import {
  Calendar,
  Wallet,
  MapPin,
  Package2,
  Trash2,
  Shield,
  type LucideIcon,
} from 'lucide-react'

export const steps: StepsType = [
  {
    id: 1,
    title: 'Post Code',
    description: 'Please provide your address',
    icon: MapPin,
    active: false,
  },
  {
    id: 2,
    title: 'Waste Type',
    description: 'What type of waste are you disposing of?',
    icon: Trash2,
    active: false,
  },
  {
    id: 3,
    title: 'Choose Your Skip Size',
    description: 'Select the skip size that best suits your needs',
    icon: Package2,
    active: true,
  },
  {
    id: 4,
    title: 'Permit Check',
    description: 'Where will the skip be placed?',
    note: 'This helps us determine if you need a permit for your skip',
    icon: Shield,
    active: false,
  },
  {
    id: 5,
    title: 'Delivery Date',
    description: "We'll aim to deliver between 7am and 6pm on your chosen day",
    icon: Calendar,
    active: false,
  },
  {
    id: 6,
    title: 'Payment',
    description: 'Finalize your booking process',
    icon: Wallet,
    active: false,
  },
]

export type StepType = {
  id: number
  title: string
  description: string
  note?: string
  icon: LucideIcon
  active: boolean
}

export type StepsType = StepType[]
