import React,{useState } from 'react';
import '../css/AboutUs.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function AboutUs() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <nav className={`navbar ${isOpen ? 'open' : ''}`}>
                <div className="navbar-container">
                    <i className='fas fa-apple-alt'></i>
                    <div className="menu-icon" onClick={toggleNavbar}>
                        &#9776;
                    </div>
                    <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                        <li><a href="/">Home</a></li>
                        <li><a href="#services">Chat</a></li>
                        <li><a href="#contact">Login</a></li>
                        <li><a href="#contact">Translator</a></li>
                        <li><a href="#contact">FAQ's</a></li>

                    </ul>
                </div>
            </nav>
            <div className="container">
                <h1>About Us</h1>
                <p className="tagline">"Our Journey and Mission"</p>
                <p className="welcome">Welcome to Fruit.Ai!</p>
                <div className="about-content">
                    <h2>Who We Are</h2>
                    <p>
                        At Fruit.Ai, we're passionate about promoting a healthy lifestyle through technology. Our team of dedicated professionals is committed to creating innovative solutions that help individuals make informed decisions about their nutrition and overall well-being.
                    </p>
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to make healthy eating easier and more enjoyable. By leveraging the power of artificial intelligence and data-driven insights, we provide users with personalized recommendations and valuable information about fruits and their benefits.
                    </p>
                    <h2>What We Do</h2>
                    <p>
                        Fruit.Ai offers a range of features designed to enhance your health journey. From detailed fruit information to interactive tools and resources, we're here to support you in making the best choices for your lifestyle.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
