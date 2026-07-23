import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Google Gemini Client Initialize
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Chat API Route
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const systemInstruction = "Aap Cryovix Fixify ke AI Assistant hain. Aapka kaam AC, Washing Machine, Refrigerator, Microwave, aur Electrician se judi samasyaon ka expert, chhota aur aasan bhasha mein solution dena hai.";

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${systemInstruction}\n\nUser Question: ${message}`
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Server error. Kripya dubara koshish karein." });
    }
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Cryovix Backend Running on http://localhost:${PORT}`);
});