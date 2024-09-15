import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Faq from './components/Faq';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/faqs" element={<Faq />} />

            </Routes>
        </Router>
    );
}

export default App;
