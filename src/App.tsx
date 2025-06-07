import SkipBookingForm from './components/form'
import { BookingFlowProvider } from './context/Booking-Flow-Context'

function App() {
  return (
    <div>
      <BookingFlowProvider>
        <SkipBookingForm />
      </BookingFlowProvider>
    </div>
  )
}

export default App
