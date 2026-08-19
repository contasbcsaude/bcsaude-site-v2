import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Diagnostico from './pages/Diagnostico'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/diagnostico" element={<Diagnostico />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
