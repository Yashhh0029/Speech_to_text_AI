from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import uuid

# ── App setup ──────────────────────────────────────────────────────────────────
app = FastAPI(title="Premium Speech-to-Text API — Powered by Whisper")

# In production, set FRONTEND_URL env variable on Render to your Vercel URL
# e.g.  https://your-app.vercel.app
# Leave unset (or set to "*") during local development
FRONTEND_URL = os.environ.get("FRONTEND_URL", "*")
allowed_origins = ["*"] if FRONTEND_URL == "*" else [FRONTEND_URL]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Transcription engine setup ─────────────────────────────────────────────────
# If GROQ_API_KEY is set (production on Render), use Groq's free Whisper API
# — transcribes in ~2 seconds regardless of hardware.
# If no API key is set (local dev), fall back to local Whisper model.
MODEL_SIZE = os.environ.get("WHISPER_MODEL", "base")
GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")

if GROQ_API_KEY:
    from groq import Groq
    groq_client = Groq(api_key=GROQ_API_KEY)
    local_model = None
    print("[Whisper] Using Groq cloud API for transcription (fast mode).")
else:
    groq_client = None
    if os.environ.get("RENDER"):
        print(f"[Whisper] RENDER detected without GROQ_API_KEY. Skipping local model load to prevent deployment timeouts.")
        local_model = None
    else:
        import whisper
        print(f"[Whisper] No GROQ_API_KEY found. Loading local model: {MODEL_SIZE} ...")
        local_model = whisper.load_model(MODEL_SIZE)
        print(f"[Whisper] Local model ready.")

os.makedirs("temp", exist_ok=True)

# ── Routes ────────────────────────────────────────────────────────────────────
@app.get("/")
def read_root():
    return {
        "status": "Backend is running",
        "model": MODEL_SIZE,
        "engine": "OpenAI Whisper"
    }

@app.post("/api/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    """
    Accepts any audio file (webm, mp3, wav, mp4, m4a, ogg, flac).
    Whisper handles format conversion internally via ffmpeg.
    Returns: { text, language, status }
    """
    temp_filename = None
    try:
        # Prevent 100-second timeouts on Render free tier
        if not groq_client and os.environ.get("RENDER"):
            raise HTTPException(
                status_code=503, 
                detail="Missing GROQ_API_KEY in Render settings. Local AI transcription requires too much CPU and will exceed Render's free tier timeout. Please add your Groq API Key."
            )

        contents = await file.read()

        # Persist the upload to a temp file — Whisper needs a file path
        file_ext = os.path.splitext(file.filename or "audio")[1] or ".webm"
        temp_filename = f"temp/{uuid.uuid4()}{file_ext}"
        with open(temp_filename, "wb") as f:
            f.write(contents)

        if groq_client:
            # ── Fast path: Groq cloud API (~2 seconds) ──────────────────────
            with open(temp_filename, "rb") as audio_file:
                groq_result = groq_client.audio.transcriptions.create(
                    file=(os.path.basename(temp_filename), audio_file.read()),
                    model="whisper-large-v3-turbo",
                    response_format="verbose_json",
                )
            text = (groq_result.text or "").strip()
            language = getattr(groq_result, "language", "unknown") or "unknown"
        else:
            # ── Local path: on-device Whisper (local dev) ────────────────────
            result = local_model.transcribe(temp_filename, fp16=False)
            text = result.get("text", "").strip()
            language = result.get("language", "unknown")

        if not text:
            return {"text": "", "language": language, "status": "silent"}

        return {"text": text, "language": language, "status": "success"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        # Always clean up temp file
        try:
            if temp_filename and os.path.exists(temp_filename):
                os.remove(temp_filename)
        except Exception:
            pass  # Ignore cleanup errors (Windows file locks)

