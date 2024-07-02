import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Document from './pages/Document';
import About from './pages/About';
import './styles/App.css'


function App() {
  return (
    <Router>
      <Header />
        <main className="container mt-3">
          <Routes>
            <Route  path='/' element= {<Home />} />
            <Route path='/document' element= {<Document />} />
            <Route path='/contact' element= {<Contact />} />
            <Route path='/about' element= {<About />} />
          </Routes>
        </main>
      <Footer />
    </Router>
  )
}

export default App
