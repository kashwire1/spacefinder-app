/**
 * API Contract / Schema Alignment:
 * - id: string
 * - conversation_id: string
 * - sender_id: string
 * - sender_role: 'Guest' | 'Host'
 * - message_body: string (max 2000 chars)
 * - is_flagged: boolean
 * - flag_reason: string | null
 * - created_at: string
 */

import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_role: 'Guest' | 'Host';
  message_body: string;
  is_flagged: boolean;
  flag_reason: string | null;
  created_at: string;
}

interface ChatRoomProps {
  conversation_id?: string;
  sender_id?: string;
  sender_role?: 'Guest' | 'Host';
  initialMessages?: Message[];
}

const MODERATION_PATTERNS = {
  email: /([a-zA-Z0-9._%+-]+(?:\s*@\s*|\s*[at]\s*|\s*at\s*)[a-zA-Z0-9.-]+(?:\s*\.\s*|\s*[dot]\s*|\s*dot\s*)[a-zA-Z]{2,})/gi,
  phone: /(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}|\b(?:\d[\s.-]*){7,11}\d\b/g,
  mediaExtension: /\.(jpg|jpeg|png|gif|webp|bmp|mp4|mov|avi|mkv|webm|pdf)$/i,
  mediaDataUri: /^data:(image|video)\/[a-zA-Z]+;base64,/i
};

export default function ChatRoom({
  conversation_id = "conv-default",
  sender_id = "user-default",
  sender_role = "Guest",
  initialMessages = []
}: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [warningBanner, setWarningBanner] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<'idle' | 'loading' | 'sending' | 'error'>('loading');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Array.isArray(initialMessages)) {
        setMessages(initialMessages);
        setLoadingState('idle');
      } else {
        setLoadingState('error');
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [initialMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loadingState]);

  const validateAndSanitize = (text: string): boolean => {
    if (
      MODERATION_PATTERNS.mediaExtension.test(text) || 
      MODERATION_PATTERNS.mediaDataUri.test(text) ||
      MODERATION_PATTERNS.phone.test(text) ||
      MODERATION_PATTERNS.email.test(text)
    ) {
      setWarningBanner("Message blocked: Personal contact details and media files are not allowed.");
      return false;
    }
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= 2000) {
      setInputText(val);
      if (warningBanner) setWarningBanner(null);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData('text');
    const items = e.clipboardData.items;
    
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1 || items[i].type.indexOf('video') !== -1) {
        e.preventDefault();
        setWarningBanner("Message blocked: Personal contact details and media files are not allowed.");
        return;
      }
    }

    if (!validateAndSanitize(pastedText)) {
      e.preventDefault();
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    if (!validateAndSanitize(trimmed)) {
      return;
    }

    setWarningBanner(null);
    setLoadingState('sending');

    const tempMessage: Message = {
      id: `msg-${Date.now()}`,
      conversation_id,
      sender_id,
      sender_role,
      message_body: trimmed,
      is_flagged: false,
      flag_reason: null,
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, tempMessage]);
      setInputText("");
      setLoadingState('idle');
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="chatroom-container">
      <style>{`
        .chatroom-container {
          display: flex;
          flex-direction: column;
          height: 600px;
          max-width: 650px;
          margin: 0 auto;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          font-family: system-ui, -apple-system, sans-serif;
        }
        @media (prefers-color-scheme: dark) {
          .chatroom-container {
            background-color: #0f172a;
            border-color: #334155;
            color: #f8fafc;
          }
        }
        .chat-header {
          padding: 16px;
          background-color: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          font-weight: 600;
          font-size: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        @media (prefers-color-scheme: dark) {
          .chat-header {
            background-color: #1e293b;
            border-bottom-color: #334155;
          }
        }
        .warning-banner {
          background-color: #fff1f2;
          color: #be123c;
          padding: 12px 16px;
          font-size: 0.875rem;
          border-left: 4px solid #f43f5e;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        @media (prefers-color-scheme: dark) {
          .warning-banner {
            background-color: #4c0519;
            color: #ffe4e6;
          }
        }
        .messages-area {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background-color: #f8fafc;
        }
        @media (prefers-color-scheme: dark) {
          .messages-area {
            background-color: #020617;
          }
        }
        .message-bubble {
          max-width: 75%;
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 0.9rem;
          line-height: 1.4;
          word-break: break-word;
        }
        .message-guest {
          background-color: #2563eb;
          color: #ffffff;
          align-self: flex-end;
          border-bottom-right-radius: 2px;
        }
        .message-host {
          background-color: #dcfce7;
          color: #166534;
          align-self: flex-start;
          border-bottom-left-radius: 2px;
        }
        @media (prefers-color-scheme: dark) {
          .message-host {
            background-color: #064e3b;
            color: #ecfdf5;
          }
        }
        .message-meta {
          font-size: 0.7rem;
          margin-bottom: 2px;
          opacity: 0.8;
          display: flex;
          gap: 6px;
        }
        .chat-input-area {
          padding: 12px 16px;
          background-color: #ffffff;
          border-top: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        @media (prefers-color-scheme: dark) {
          .chat-input-area {
            background-color: #0f172a;
            border-top-color: #334155;
          }
        }
        .input-row {
          display: flex;
          gap: 8px;
        }
        textarea {
          flex: 1;
          resize: none;
          padding: 10px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 0.9rem;
          outline: none;
          height: 42px;
        }
        @media (prefers-color-scheme: dark) {
          textarea {
            background-color: #1e293b;
            border-color: #475569;
            color: #f8fafc;
          }
        }
        button {
          background-color: #2563eb;
          color: white;
          border: none;
          padding: 0 18px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }
        button:disabled {
          background-color: #94a3b8;
          cursor: not-allowed;
        }
        .char-counter {
          font-size: 0.7rem;
          text-align: right;
          color: #64748b;
        }
      `}</style>

      <div className="chat-header">
        <span>SpaceFinder Secure Chat</span>
        <span style={{ fontSize: '0.75rem', fontWeight: 400, opacity: 0.8 }}>Role: {sender_role}</span>
      </div>

      {warningBanner && (
        <div className="warning-banner">
          <span>⚠️ {warningBanner}</span>
          <button onClick={() => setWarningBanner(null)} style={{ background: 'transparent', color: 'inherit', fontWeight: 'bold' }}>&times;</button>
        </div>
      )}

      <div className="messages-area">
        {loadingState === 'loading' ? (
          <div style={{ textAlign: 'center', marginTop: '40px', color: '#64748b' }}>Loading messages...</div>
        ) : loadingState === 'error' ? (
          <div style={{ textAlign: 'center', marginTop: '40px', color: '#e11d48' }}>
            Failed to load messages. <button onClick={() => setLoadingState('idle')} style={{ padding: '4px 8px', marginLeft: '8px' }}>Try again</button>
          </div>
        ) : messages.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '40px', color: '#64748b' }}>No messages yet. Start the conversation safely below.</div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender_id === sender_id;
            const bubbleClass = msg.sender_role === 'Guest' ? 'message-guest' : 'message-host';
            return (
              <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                <div className="message-meta">
                  <span>{msg.sender_role}</span>
                  <span>•</span>
                  <span>{msg.created_at}</span>
                </div>
                <div className={`message-bubble ${bubbleClass}`}>
                  {msg.message_body}
                </div>
              </div>
            );
          })
        )}
        
        {loadingState === 'sending' && (
          <div className="message-bubble message-guest" style={{ opacity: 0.7 }}>
            Sending...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <form onSubmit={handleSendMessage} className="input-row">
          <textarea
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            placeholder="Type your message here... (No emails, phones, or media)"
            rows={1}
          />
          <button type="submit" disabled={loadingState === 'sending' || !inputText.trim()}>
            Send
          </button>
        </form>
        <div className="char-counter">{inputText.length} / 2000</div>
      </div>
    </div>
  );
                             }
    
