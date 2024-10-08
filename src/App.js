import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Faq from './components/Faq';
import Login from './components/Login';
import Translator from './components/Translator';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/faqs" element={<Faq />} />
                <Route path="/" element={<Login />} />
                <Route path="/translator" element={<Translator />} />

            </Routes>
        </Router>
    );
}

export default App;
