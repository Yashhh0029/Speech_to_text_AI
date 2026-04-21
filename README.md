# 🎙️ Nexus Speech AI  
### A Premium, Blazing-Fast, Multi-Lingual Speech-to-Text Intelligence Engine

> **Nexus is not just another transcription tool.**  
> It is a high-performance, edge-designed web application that transforms spoken words into actionable intelligence with unparalleled accuracy, speed, and aesthetic fluidity.

---

## 🌌 Vision

Nexus Speech AI is a **next-generation transcription platform** engineered at the intersection of **heavy AI computing and premium UX design**.

Unlike traditional dictation apps, Nexus:
- Understands context, silence, and over **90+ global languages**.
- Processes audio using OpenAI's state-of-the-art Whisper AI under the hood.
- Guarantees data privacy by keeping the transcription pipeline fully server-side without relaying audio to big-tech APIs.
- Features a jaw-dropping glassmorphic interface, powered by hardware-accelerated animations and ultra-smooth scrolling.

This project is built with **production-grade architecture**, designed to seamlessly detach high-speed frontend aesthetics from intensive backend machine-learning workloads.

---

## 🧠 Core Design Philosophy

| Principle | Description |
|---------|------------|
| Absolute Aesthetics | A glassmorphism-first UI, leveraging GSAP parallax & Lenis smooth scrolling |
| Local AI Processing | Utilizes OpenAI Whisper locally on the backend for zero-dependency transcription |
| Zero-Friction Input | Support for live microphone dictation or drag-and-drop file upload |
| Multi-Lingual Intelligence | Auto-detects the spoken language and tags it dynamically in the UI |
| Explainable & Exportable | Word counts and one-click exports directly to your clipboard or .txt files |
| Scalable Architecture | Strict separation of Vite/React frontend and FastAPI/Python backend |

---

## 🏗️ System Architecture (High Level)

```text
User Input (Mic / File Upload)
   ↓
Vite + React Glassmorphic UI (GSAP/Lenis)
   ↓
FastAPI Async Gateway (CORS Protected)
   ↓
FFmpeg Audio Normalization Engine
   ↓
OpenAI Whisper Engine (Cognitive Transcription)
   ↓
JSON Payload (Text + Language Tag + Status)
   ↓
Rendered Live on Dashboard
```

---

## 🚀 Key Features

### 🎧 Intelligence Capture
- Live ambient recording right in the browser.
- Background noise adjustment formatting.
- File upload support for legacy formats (MP3, M4A, WAV, OGG, WEBM).

### 🧠 OpenAI Whisper Core
- Zero cold-start latency — Model is cached into server RAM on startup.
- Unmatched accuracy using the robust Whisper `base` (or `tiny`/`small`) parameterization.
- Multi-lingual auto-detection and transcription.

### 🔮 Premium UI / UX
- Hardware-accelerated GSAP ScrollTriggers.
- Inertia-based momentum scrolling for a native app feel (Lenis).
- Dynamic CSS glassmorphism, animated gradients, and interactive hover states.

### 📦 Seamless Export
- Live word-count tracking.
- Instant copy-to-clipboard functionality.
- Direct download as a formatted `.txt` document.

---

## 🧩 Project Structure

```text
Speech-To-Text-AI/
├── backend/
│   ├── main.py                  # FastAPI Application + Whisper Pipeline
│   ├── requirements.txt         # Server Dependencies
│   ├── Procfile                 # Production WSGI/ASGI Runner
│   └── temp/                    # Ephemeral audio processing directory
├── frontend/
│   ├── index.html               # Entry point
│   ├── package.json             # Node dependencies
│   ├── vite.config.js           # Build settings
│   ├── .env.example             # Environment variable template
│   └── src/
│       ├── App.jsx              # Core React Router/Layout
│       ├── main.jsx             # React DOM entry
│       ├── index.css            # Global variables, Glassmorphism CSS
│       └── components/          
│           ├── Hero.jsx           # Landing page hero
│           ├── Features.jsx       # Grid layouts
│           ├── ApplicationArea.jsx# The core recording logic & UI 
│           ├── HowItWorks.jsx     # App flow steps
│           ├── ParallaxShowcase.jsx# Advanced GSAP animations
│           └── Footer.jsx
├── .gitignore                   # Global ignores (models/deps)
└── README.md                    # You are here
```

---

## 🛠️ Technology Stack

| Category | Technology |
|--------|------------|
| Subsystem & ML | Python, OpenAI Whisper, FFmpeg |
| Backend Server | FastAPI, Uvicorn, Pydub |
| Frontend Core | React 19, Vite |
| Styling & UX | Vanilla CSS, Glassmorphism, CSS Variables |
| Animation | GSAP (GreenSock), Lenis Smooth Scrolling |
| Icons | Lucide React |

---

## ▶️ How to Run Locally

### 1. Start the Backend
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. Start the Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
*(Make sure to copy `frontend/.env.example` to `frontend/.env` to point to `http://127.0.0.1:8000`)*

---

## 🌩️ Deployment 

The project is structured to deploy effortlessly on free-tier cloud platforms.

- **Backend:** Designed for deployment on **Render**. (Requires `ffmpeg` build command: `apt-get install -y ffmpeg && pip install -r requirements.txt`).
- **Frontend:** Designed for deployment on **Vercel** or Netlify. Connects to backend via the `VITE_API_URL` environment variable.

---

## 🔮 Future Advancements

Nexus is designed as a foundational intelligence pipeline. Future development involves integrating live-streaming sockets and broader intelligence layers.

- **Diarization** – Identify *who* is speaking, separating speakers in the transcript.
- **WebSocket Streaming** – Real-time word-by-word streaming instead of waiting for the recording to finish.
- **Translation Engine** – Not just transcription, but real-time translation into the user's native language.
- **LLM Summarization** – Post-processing the transcript automatically through a conversational LLM to extract key action items and meeting minutes.

> *“Nexus isn't just about hearing words.  
It is about truly listening, processing, and understanding the signal in the noise.”*

---

## 👨‍💻 Author

**Yash Kadam**  
AI & ML Engineer | Builder of Human-Centric, Emotion-Aware AI Systems  

> “I didn’t want to build just another transcription script.  
> I wanted to build an experience that feels alive.”
