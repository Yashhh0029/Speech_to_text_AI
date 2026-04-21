import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Upload, Loader2, Copy, Download, Check } from 'lucide-react';
import gsap from 'gsap';

const ApplicationArea = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingTime, setProcessingTime] = useState(0);
  const [transcription, setTranscription] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);
  const [copied, setCopied] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isWakingUp, setIsWakingUp] = useState(false);
  
  const timerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const outputRef = useRef(null);
  const sectionRef = useRef(null);

  // Animate the output area when transcription appears
  useEffect(() => {
    if (transcription && outputRef.current) {
        gsap.fromTo(outputRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
    }
  }, [transcription]);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startRecording = async () => {
    setErrorStatus(null);
    setTranscription('');
    setDetectedLanguage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = handleProcessAudio;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access error:", err);
      setErrorStatus("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
          setErrorStatus(null);
          setTranscription('');
          uploadAudio(file);
      }
  };

  const handleProcessAudio = () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    const file = new File([audioBlob], "recording.webm", { type: "audio/webm" });
    uploadAudio(file);
  };

  const uploadAudio = async (file) => {
    setIsProcessing(true);
    setIsWakingUp(false);
    setErrorStatus(null);
    
    // If request takes longer than 5 seconds, Render is likely waking up
    const wakeUpTimer = setTimeout(() => {
        setIsWakingUp(true);
    }, 5000);

    const formData = new FormData();
    formData.append('file', file);

    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

    try {
      const response = await fetch(`${API_URL}/api/transcribe`, {
        method: 'POST',
        body: formData,
      });
      
      clearTimeout(wakeUpTimer);
      setIsWakingUp(false);

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.detail || 'Failed to process audio');
      
      if (!data.text) {
          setErrorStatus("Audio was too quiet or unintelligible. Try again.");
      } else {
          setTranscription(data.text);
          setDetectedLanguage(data.language || null);
      }
    } catch (err) {
      clearTimeout(wakeUpTimer);
      setIsWakingUp(false);
      console.error(err);
      
      if (err.message === 'Failed to fetch' || err.message.includes('Network Error')) {
          if (API_URL.includes('127.0.0.1') || API_URL.includes('localhost')) {
              setErrorStatus('Configuration Error: Expected a live backend but VITE_API_URL is pointing to localhost. Please set VITE_API_URL completely in your Vercel project settings and trigger a new deployment.');
          } else {
              setErrorStatus(`Network Error: Ensure your Render backend (${API_URL}) is live and allows cross-origin requests.`);
          }
      } else {
          setErrorStatus(err.message || 'An error occurred during transcription.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(transcription);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([transcription], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "transcription.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  const wordCount = transcription ? transcription.trim().split(/\s+/).length : 0;

  return (
    <section id="application-area" ref={sectionRef} className="container" style={{ padding: '8rem 2rem' }}>
      <div className="glass" style={{
        padding: '3rem', borderRadius: '24px', margin: '0 auto', maxWidth: '900px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Glow effect inside card */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, var(--primary), var(--accent))' }}></div>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.5rem' }}>AI Transcription Hub</h2>
            <p style={{ color: 'var(--text-muted)' }}>Capture your thoughts or upload files to extract intelligent insights instantly.</p>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* Record Area */}
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                
                {isProcessing ? (
                     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                         <Loader2 size={48} style={{ color: 'var(--primary)', animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
                         <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>Extracting intelligence...</span>
                         {isWakingUp && (
                             <span style={{ fontSize: '0.85rem', color: 'var(--accent)', marginTop: '0.75rem', maxWidth: '250px' }}>
                                 Server is waking up from sleep mode<br/>(This can take up to 50 seconds)
                             </span>
                         )}
                     </div>
                ) : (
                    <>
                        <button 
                            onClick={isRecording ? stopRecording : startRecording}
                            style={{ 
                                width: '80px', height: '80px', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                                background: isRecording ? 'rgba(236,72,153,0.1)' : 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                boxShadow: isRecording ? 'inset 0 0 0 2px var(--accent)' : '0 10px 25px rgba(99,102,241,0.4)',
                                color: isRecording ? 'var(--accent)' : 'white'
                            }}
                        >
                            {isRecording ? <Square size={32} /> : <Mic size={32} />}
                        </button>
                        
                        <div style={{ marginTop: '1.5rem', fontWeight: 600, fontSize: '1.25rem', fontFamily: 'monospace', color: isRecording ? 'var(--accent)' : 'var(--text-main)' }}>
                            {formatTime(recordingTime)}
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                            {isRecording ? 'Listening live...' : 'Click to dictate'}
                        </p>
                    </>
                )}
            </div>

            {/* Upload Area */}
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.15)', cursor: 'pointer', transition: 'background 0.2s', ...(!isProcessing && {":hover": { background: 'rgba(255,255,255,0.02)'}}) }}>
                <input 
                    type="file" 
                    accept="audio/*" 
                    onChange={handleFileUpload} 
                    style={{ display: 'none' }} 
                    id="audio-upload"
                    disabled={isProcessing}
                />
                <label htmlFor="audio-upload" style={{ cursor: isProcessing ? 'not-allowed' : 'pointer', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                        <Upload size={32} />
                    </div>
                    <span style={{ fontWeight: 500 }}>Upload Audio File</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Supports WAV, MP3, MP4</span>
                </label>
            </div>
        </div>

        {errorStatus && (
            <div style={{ marginTop: '2rem', padding: '1rem', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5', textAlign: 'center' }}>
                {errorStatus}
            </div>
        )}

        {/* Output Document Area */}
        {transcription && (
            <div ref={outputRef} style={{ marginTop: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Transcription Result</h3>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        {detectedLanguage && (
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', background: 'rgba(99,102,241,0.15)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '999px', border: '1px solid rgba(99,102,241,0.3)' }}>
                                🌐 {detectedLanguage}
                            </span>
                        )}
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '999px' }}>
                            {wordCount} words
                        </span>
                    </div>
                </div>
                
                <div style={{ 
                    padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', 
                    border: '1px solid rgba(255,255,255,0.08)', minHeight: '150px',
                    fontSize: '1.05rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)'
                }}>
                    {transcription}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                    <button onClick={handleCopy} className="btn btn-glass" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                        {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />} 
                        {copied ? 'Copied' : 'Copy Text'}
                    </button>
                    <button onClick={handleDownload} className="btn" style={{ background: 'var(--bg-card-hover)', color: 'var(--text-main)', padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                        <Download size={16} /> Download .txt
                    </button>
                </div>
            </div>
        )}
      </div>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
};

export default ApplicationArea;
