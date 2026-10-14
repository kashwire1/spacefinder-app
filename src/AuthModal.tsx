import React, { useState, useRef } from 'react';

interface AuthModalProps {
  onSuccessAuth: (user: { name: string; role: 'Guest' | 'Host'; isVerified: boolean }) => void;
  onClose: () => void;
}

export default function AuthModal({ onSuccessAuth, onClose }: AuthModalProps) {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [role, setRole] = useState<'Guest' | 'Host'>('Host');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [step, setStep] = useState<'credentials' | 'kyc_camera'>('credentials');
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      alert("Unable to access camera. Please allow camera permissions.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const width = videoRef.current.videoWidth || 300;
      const height = videoRef.current.videoHeight || 225;
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, width, height);
        const dataUrl = canvasRef.current.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        
        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
        setCameraActive(false);
      }
    }
  };

  const handleSubmitCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (authMode === 'signup' && !name)) {
      alert("Please fill in all required fields.");
      return;
    }

    if (role === 'Host' && authMode === 'signup') {
      setStep('kyc_camera');
      setTimeout(() => startCamera(), 300);
    } else {
      onSuccessAuth({ name: name || 'User', role, isVerified: role === 'Host' });
    }
  };

  const handleCompleteKYC = () => {
    if (!capturedImage) {
      alert("Please capture your verification photo first.");
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onSuccessAuth({ name, role: 'Host', isVerified: true });
    }, 1200);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, fontFamily: 'sans-serif' }}>
      <div style={{ background: '#ffffff', width: '100%', maxWidth: '450px', borderRadius: '12px', padding: '24px', position: 'relative', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
        
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#64748b' }}>
          &times;
        </button>

        {step === 'credentials' ? (
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
              <button 
                type="button"
                onClick={() => setAuthMode('signup')}
                style={{ flex: 1, background: authMode === 'signup' ? '#2563eb' : '#f1f5f9', color: authMode === 'signup' ? '#fff' : '#475569', border: 'none', padding: '8px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
              >
                Sign Up
              </button>
              <button 
                type="button"
                onClick={() => setAuthMode('login')}
                style={{ flex: 1, background: authMode === 'login' ? '#2563eb' : '#f1f5f9', color: authMode === 'login' ? '#fff' : '#475569', border: 'none', padding: '8px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
              >
                Log In
              </button>
            </div>

            <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '16px', color: '#0f172a' }}>
              {authMode === 'signup' ? 'Create Your SpaceFinder Account' : 'Welcome Back'}
            </h2>

            <form onSubmit={handleSubmitCredentials}>
              {authMode === 'signup' && (
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Full Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter your legal name"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              )}

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>I am joining as a:</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', cursor: 'pointer' }}>
                    <input type="radio" name="role" checked={role === 'Host'} onChange={() => setRole('Host')} /> Host (List Spaces)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', cursor: 'pointer' }}>
                    <input type="radio" name="role" checked={role === 'Guest'} onChange={() => setRole('Guest')} /> Guest (Book Spaces)
                  </label>
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="name@example.com"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <button 
                type="submit" 
                style={{ width: '100%', background: '#2563eb', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                {authMode === 'signup' && role === 'Host' ? 'Continue to Host KYC Verification →' : 'Continue'}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px', color: '#0f172a' }}>Host Identity Verification (KYC)</h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
              To maintain platform security, all SpaceFinder hosts must capture a live photo to verify their identity before listing properties.
            </p>

            <div style={{ background: '#f8fafc', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '220px', marginBottom: '16px' }}>
              {cameraActive && (
                <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              )}
              {capturedImage && (
                <img src={capturedImage} alt="Captured KYC" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              )}
              {!cameraActive && !capturedImage && (
                <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Camera preview will appear here</span>
              )}
            </div>

            <canvas ref={canvasRef} style={{ display: 'none' }} />

            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              {cameraActive ? (
                <button 
                  type="button" 
                  onClick={capturePhoto} 
                  style={{ flex: 1, background: '#16a34a', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Capture Photo
                </button>
              ) : (
                <button 
                  type="button" 
                  onClick={startCamera} 
                  style={{ flex: 1, background: '#475569', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  {capturedImage ? 'Retake Photo' : 'Start Camera'}
                </button>
              )}
            </div>

            <button 
              type="button"
              disabled={!capturedImage || isVerifying}
              onClick={handleCompleteKYC}
              style={{ width: '100%', background: capturedImage ? '#2563eb' : '#94a3b8', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {isVerifying ? 'Verifying Identity...' : 'Complete Host Verification & Launch'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
    }
        
