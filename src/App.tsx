// SpaceFinder Live App Entry

import React, { useState } from 'react';
import ListingDashboard from './components/ListingDashboard';
import BookingCheckout from './components/BookingCheckout';
import ChatRoom from './components/ChatRoom';
import AuthModal from './components/AuthModal';
import { Listing } from './data/mockData';

interface UserState {
  name: string;
  role: 'Guest' | 'Host';
  isVerified: boolean;
}

export default function App() {
  const [user, setUser] = useState<UserState | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'checkout' | 'chat'>('dashboard');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const handleSelectListing = (listing: Listing) => {
    setSelectedListing(listing);
    setCurrentView('checkout');
  };

  const handleConfirmBooking = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setCurrentView('chat');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Top Global Navigation Bar */}
      <nav style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setCurrentView('dashboard')}>
          <span style={{ fontSize: '1.5rem' }}>🏢</span>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#0f172a', letterSpacing: '-0.02em' }}>SpaceFinder</span>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {currentView !== 'dashboard' && (
            <button 
              onClick={() => setCurrentView('dashboard')}
              style={{ background: 'none', border: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}
            >
              Browse Spaces
            </button>
          )}

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, background: user.role === 'Host' ? '#fef3c7' : '#e0f2fe', color: user.role === 'Host' ? '#92400e' : '#075985', padding: '4px 10px', borderRadius: '12px' }}>
                {user.name} ({user.role}{user.isVerified ? ' ✓ Verified' : ''})
              </span>
              <button 
                onClick={() => setUser(null)}
                style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}
              >
                Log Out
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowAuthModal(true)}
              style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}
            >
              Sign Up / Log In
            </button>
          )}
        </div>
      </nav>

      {/* Main App Content View */}
      <main style={{ paddingBottom: '40px' }}>
        {currentView === 'dashboard' && (
          <ListingDashboard onSelectListingForBooking={handleSelectListing} />
        )}

        {currentView === 'checkout' && selectedListing && (
          <BookingCheckout 
            listing={selectedListing} 
            onBack={() => setCurrentView('dashboard')}
            onConfirmPayment={handleConfirmBooking}
          />
        )}

        {currentView === 'chat' && (
          <div style={{ padding: '24px' }}>
            <button 
              onClick={() => setCurrentView('dashboard')} 
              style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 600, cursor: 'pointer', marginBottom: '16px', display: 'inline-block' }}
            >
              ← Back to Marketplace
            </button>
            <ChatRoom 
              conversation_id={`conv-${selectedListing?.id || 'default'}`} 
              sender_id={user ? user.name : 'guest-user'} 
              sender_role={user ? user.role : 'Guest'} 
            />
          </div>
        )}
      </main>

      {/* Authentication & Host Camera KYC Modal */}
      {showAuthModal && (
        <AuthModal 
          onSuccessAuth={(authenticatedUser) => {
            setUser(authenticatedUser);
            setShowAuthModal(false);
            if (selectedListing && currentView === 'checkout') {
              setCurrentView('chat');
            }
          }}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
                   }
      
