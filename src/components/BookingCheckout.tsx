import React, { useState } from 'react';
import { Listing } from '../data/mockData';

interface BookingCheckoutProps {
  listing: Listing;
  onBack: () => void;
  onConfirmPayment: () => void;
}

export default function BookingCheckout({ listing, onBack, onConfirmPayment }: BookingCheckoutProps) {
  const [durationCount, setDurationCount] = useState<number>(3);
  const [includeSecurityDeposit] = useState<boolean>(true);

  // Exact Business Commission Structure: 12% for hotels, 15% for space listings
  const commissionRate = listing.category === 'Hotel' ? 0.12 : 0.15;
  const subtotal = listing.pricePerUnit * durationCount;
  const platformFee = subtotal * commissionRate;
  const securityDeposit = includeSecurityDeposit ? 50 : 0;
  const grandTotal = subtotal + platformFee + securityDeposit;

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto', padding: '24px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', fontFamily: 'sans-serif' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 600, cursor: 'pointer', marginBottom: '16px' }}>
        ← Back to Listings
      </button>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>Pre-Payment Selection Preview</h2>
      <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '0.9rem' }}>Please review your reservation details, pricing breakdown, and escrow conditions before proceeding.</p>

      <div style={{ display: 'flex', gap: '16px', background: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
        <img src={listing.image} alt={listing.title} style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px' }}>{listing.title}</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '4px' }}>Hosted by {listing.hostName}</p>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>{listing.area}, {listing.city}, {listing.country}</p>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px' }}>
          Rental Duration ({listing.pricePeriod}s):
        </label>
        <input 
          type="number" 
          min={1} 
          max={90}
          value={durationCount}
          onChange={(e) => setDurationCount(Math.max(1, parseInt(e.target.value) || 1))}
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
        />
      </div>

      <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>Payment & Escrow Breakdown</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
          <span>Subtotal ({durationCount} {listing.pricePeriod}s @ ${listing.pricePerUnit})</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: '#64748b' }}>
          <span>Platform Commission ({(commissionRate * 100)}%)</span>
          <span>${platformFee.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.9rem', color: '#64748b' }}>
          <span>Refundable Security Deposit</span>
          <span>${securityDeposit.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '12px', fontWeight: 'bold', fontSize: '1.1rem', color: '#0f172a' }}>
          <span>Total Due</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '20px', fontStyle: 'italic' }}>
        * Payments are held securely in escrow and only released to the host after physical property verification and check-in confirmation.
      </p>

      <button 
        onClick={onConfirmPayment}
        style={{ width: '100%', background: '#2563eb', color: '#ffffff', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
      >
        Confirm & Proceed to Secure Payment
      </button>
    </div>
  );
}
