import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// import pages
import Home from './Pages/Home'
import CountryWithInfo from './Pages/CountryWithInfo'

// import components
import Navbar from './Components/Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/country/:name' element={<CountryWithInfo />} />
      </Routes>
    </Router>
  )
}

export default App
