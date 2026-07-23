document.addEventListener('DOMContentLoaded', () => {
    const chatBody = document.getElementById('chatBody');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const voiceBtn = document.getElementById('voiceBtn');
    const actionBtns = document.querySelectorAll('.action-btn');

    // Backend URL
    const SERVER_URL = "http://localhost:5000/api/chat";

    async function sendMessage(text) {
        const messageText = text || userInput.value.trim();
        if (!messageText) return;

        appendMessage(messageText, 'user-message');
        if (!text) userInput.value = '';

        const typingDiv = appendMessage("Thinking...", 'bot-message');

        try {
            // Node.js Backend ko call karna
            const response = await fetch(SERVER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: messageText })
            });

            const data = await response.json();
            
            if (data.reply) {
                typingDiv.innerHTML = formatText(data.reply);
            } else {
                typingDiv.innerText = "Kripya dubara koshish karein.";
            }
        } catch (error) {
            console.error("Error:", error);
            typingDiv.innerText = "Server connect nahi ho pa raha hai.";
        }

        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function appendMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = className;
        msgDiv.innerHTML = formatText(text);
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
        return msgDiv;
    }

    function formatText(text) {
        return text
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }

    sendBtn.addEventListener('click', () => sendMessage());

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    actionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sendMessage(btn.innerText.trim());
        });
    });
});

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Gemini AI Initialize
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Chat Route
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const systemInstruction = "Aap Cryovix Fixify ke AI Assistant hain. Aapka kaam AC, Washing Machine, Refrigerator, Microwave, aur Electrician se judi samasyaon ka expert, chhota aur simple bhasha mein solution dena hai.";

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${systemInstruction}\n\nUser Question: ${message}`
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server Error. Kripya dubara koshish karein." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});