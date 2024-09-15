import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/faq.css';
import { generateUploadButton } from '@uploadthing/react';

const uploadButton = generateUploadButton({
    url: 'https://fruit-ai-b.onrender.com/api/uploadthing',
});

const Faq = () => {
    const [faqs, setFaqs] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [image, setImage] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [fileInput, setFileInput] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        loadFaqs();
    }, []);

    const loadFaqs = async () => {
        try {
            const response = await axios.get('https://fruit-ai-b.onrender.com/faqs');
            setFaqs(response.data);
        } catch (error) {
            console.error('Failed to fetch FAQs:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('question', question);
        formData.append('answer', answer);
        if (image) formData.append('image', image);

        try {
            if (editingId) {
                await axios.put(`https://fruit-ai-b.onrender.com/faqs/${editingId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post('https://fruit-ai-b.onrender.com/faqs', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            resetForm();
            loadFaqs();
        } catch (error) {
            console.error('Failed to submit FAQ:', error);
        }
    };

    const resetForm = () => {
        setQuestion('');
        setAnswer('');
        setImage(null);
        setEditingId(null);
        if (fileInput) fileInput.value = '';
    };

    const handleEdit = (faq) => {
        setQuestion(faq.question);
        setAnswer(faq.answer);
        setImage(null);
        setEditingId(faq._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://fruit-ai-b.onrender.com/faqs/${id}`);
            loadFaqs();
        } catch (error) {
            console.error('Failed to delete FAQ:', error);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const { data } = await uploadButton({ file });
                setImage(data.url);
            } catch (error) {
                console.error('Failed to upload file:', error);
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
                        <li><a href="">Translator</a></li>
                        <li><a href="/faqs">FAQ's</a></li>
                    </ul>
                </div>
            </nav>
            <div className="faq-container">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                    />
                    <input
                        type="file"
                        onChange={handleFileChange}
                        ref={(input) => setFileInput(input)}
                    />
                    <button type="submit">{editingId ? 'Update FAQ' : 'Add FAQ'}</button>
                </form>
                <div className="faq-list">
                    {faqs.map(faq => (
                        <div key={faq._id} className="faq-item">
                            <h3>{faq.question}</h3>
                            <p>{faq.answer}</p>
                            {faq.image && <img style={{ width: "200px", height: "200px", padding: "10px" }} src={`https://utfs.io/f/${faq.image}`} alt="FAQ" />}
                            <button onClick={() => handleEdit(faq)}>Edit</button>
                            <button onClick={() => handleDelete(faq._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;
