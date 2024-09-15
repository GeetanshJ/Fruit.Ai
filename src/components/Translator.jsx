import { useEffect, useState } from 'react';
import "../css/Translator.css"
import lang from './../languages';

function Translator() {
    const [fromText, setFromText] = useState('');
    const [toText, setToText] = useState('');
    const [fromLanguage, setFromLanguage] = useState('en-GB');
    const [toLanguage, setToLanguage] = useState('hi-IN');
    const [languages, setLanguages] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLanguages(lang);
    }, []);

    const copyContent = (text) => {
        navigator.clipboard.writeText(text);
    };

    const utterText = (text, language) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        synth.speak(utterance);
    };

    const handleExchange = () => {
        let tempValue = fromText;
        setFromText(toText);
        setToText(tempValue);

        let tempLang = fromLanguage;
        setFromLanguage(toLanguage);
        setToLanguage(tempLang);
    };

    const handleTranslate = () => {
        setLoading(true);
        const apiUrl = process.env.REACT_APP_TRANSLATE_API_URL;
        let url = `${apiUrl}?q=${fromText}&langpair=${fromLanguage}|${toLanguage}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setToText(data.responseData.translatedText);
                setLoading(false);
            });
    };

    const handleIconClick = (target, id) => {
        if (!fromText || !toText) return;

        if (target.classList.contains('copy-icon')) {
            if (id === 'from') {
                copyContent(fromText);
            } else {
                copyContent(toText);
            }
        } else {
            if (id === 'from') {
                utterText(fromText, fromLanguage);
            } else {
                utterText(toText, toLanguage);
            }
        }
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
                        <li><a href="/home">Home</a></li>
                        <li><a href="">Chat</a></li>
                        <li><a href="/">Login</a></li>
                        <li><a href="/faqs">FAQ's</a></li>

                    </ul>
                </div>
            </nav>
            <div className="translator-wrapper">
                <div className="translator-input">
                    <textarea
                        name="from"
                        className="source-text"
                        placeholder="Enter Text"
                        id="from"
                        value={fromText}
                        onChange={(e) => setFromText(e.target.value)}
                    ></textarea>
                    <textarea
                        name="to"
                        className="target-text"
                        id="to"
                        value={toText}
                        readOnly
                    ></textarea>
                </div>
                <ul className="translator-controls">
                    <li className="control-row source">
                        <div className="control-icons">
                            <i id="from" className="fa-solid fa-volume-high speak-icon" onClick={(e) => handleIconClick(e.target, 'from')}></i>
                            <i id="from" className="fa-solid fa-copy copy-icon" onClick={(e) => handleIconClick(e.target, 'from')}></i>
                        </div>
                        <select value={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)}>
                            {Object.entries(languages).map(([code, name]) => (
                                <option key={code} value={code}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </li>
                    <li className="exchange-icon" onClick={handleExchange}><i className="fa-solid fa-arrow-right-arrow-left"></i></li>
                    <li className="control-row target">
                        <select value={toLanguage} onChange={(e) => setToLanguage(e.target.value)}>
                            {Object.entries(languages).map(([code, name]) => (
                                <option key={code} value={code}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <div className="control-icons">
                            <i id="to" className="fa-solid fa-copy copy-icon" onClick={(e) => handleIconClick(e.target, 'to')}></i>
                            <i id="to" className="fa-solid fa-volume-high speak-icon" onClick={(e) => handleIconClick(e.target, 'to')}></i>
                        </div>
                    </li>
                </ul>
            </div>
            <button onClick={handleTranslate} disabled={loading}>
                {loading ? 'Translating...' : 'Translate Text'}
            </button>
        </div>
    );
}

export default Translator;
