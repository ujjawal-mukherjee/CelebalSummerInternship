import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './pages/Form';
import Details from './pages/Details';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/details" element={<Details />} />
        <Route />
      </Routes>
    </Router>
  )
}

export default App
