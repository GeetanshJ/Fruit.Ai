import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/faq.css';

const Faq = () => {
    const [faqs, setFaqs] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [image, setImage] = useState(null);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        try {
            const response = await axios.get('https://fruit-ai-b.onrender.com/faqs');
            console.log(response.data)
            setFaqs(response.data);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        }
    };

    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('question', question);
        formData.append('answer', answer);
        if (image) formData.append('image', image);

        try {
            // if (editingId) {
            //     await axios.put(`https://fruit-ai-b.onrender.com/faqs/${editingId}`, formData);
            // } else {
                await axios.post('https://fruit-ai-b.onrender.com/faqs', formData);
                console.log(formData)
            // }
            resetForm();
            fetchFaqs();
        } catch (error) {
            console.error('Error submitting FAQ:', error);
        }
    };

    const resetForm = () => {
        setQuestion('');
        setAnswer('');
        setImage(null);
        setEditingId(null);
    };

    const editFaq = (faq) => {
        setQuestion(faq.question);
        setAnswer(faq.answer);
        setImage(null);
        setEditingId(faq._id);
    };

    const deleteFaq = async (id) => {
        try {
            await axios.delete(`https://fruit-ai-b.onrender.com/faqs/${id}`);
            fetchFaqs();
        } catch (error) {
            console.error('Error deleting FAQ:', error);
        }
    };

    return (
        <div className="faq-container">
            <form onSubmit={submitForm}>
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
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">{editingId ? 'Update FAQ' : 'Add FAQ'}</button>
            </form>
            <div className="faq-list">
                {faqs.map(faq => (
                    <div key={faq._id} className="faq-item">
                        <h3>{faq.question}</h3>
                        <p>{faq.answer}</p>
                        {faq.image && <img style={{width:"200px",height:"200px",padding:"10px"}} src={`http://localhost:5000/uploads/${faq.image}`} alt="FAQ" />}
                        <button onClick={() => editFaq(faq)}>Edit</button>
                        <button onClick={() => deleteFaq(faq._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faq;
