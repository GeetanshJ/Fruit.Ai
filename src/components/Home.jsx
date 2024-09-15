import React from 'react';
import '../css/Home.css';
import { Link } from 'react-router-dom';
function Home() {
    return (
        <div className="container">
            <h1>Fruit.Ai</h1>
            <p className="tagline">"Be Healthy!"</p>
            <p className="welcome">Welcome, Mr. User!</p>
            <div className="grid">
                <Link to="/chat" className="box chat">Chat</Link>
                <Link to="/translator" className="box translator">Translator</Link>
                <Link to="/faqs" className="box faqs">FAQs</Link>
                <Link to="/aboutUs" className="box about">About</Link>
                <Link to="/" className="box login">Login/Signup</Link>
            </div>
        </div>
    );
}

export default Home;
