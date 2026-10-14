import React, { useState } from 'react';
import { INITIAL_LISTINGS, COUNTRIES_DATA, Listing } from '../data/mockData';

interface ListingDashboardProps {
  onSelectListingForBooking: (listing: Listing) => void;
}

export default function ListingDashboard({ onSelectListingForBooking }: ListingDashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedArea, setSelectedArea] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const availableCities = selectedCountry !== 'All' && COUNTRIES_DATA[selectedCountry] ? Object.keys(COUNTRIES_DATA[selectedCountry]) : [];
  const availableAreas = selectedCountry !== 'All' && selectedCity !== 'All' && COUNTRIES_DATA[selectedCountry]?.[selectedCity] ? COUNTRIES_DATA[selectedCountry][selectedCity] : [];

  const filteredListings = INITIAL_LISTINGS.filter(item => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (selectedCountry !== 'All' && item.country !== selectedCountry) return false;
    if (selectedCity !== 'All' && item.city !== selectedCity) return false;
    if (selectedArea !== 'All' && item.area !== selectedArea) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#1e293b', fontSize: '2rem', marginBottom: '8px' }}>SpaceFinder Global Marketplace</h1>
        <p style={{ color: '#64748b' }}>Explore verified apartments, hotel bookings, offices, and event spaces across multiple countries.</p>
      </header>

      {/* Filter Toolbar */}
      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Search Title</label>
          <input 
            type="text" 
            placeholder="Search spaces..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Category</label>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
          >
            <option value="All">All Categories</option>
            <option value="Apartment">Residential Apartments</option>
            <option value="Hotel">Hotel Bookings</option>
            <option value="Office">Office Spaces</option>
            <option value="Event Space">Event Spaces</option>
            <option value="Studio">Studios</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Country</label>
          <select 
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setSelectedCity('All');
              setSelectedArea('All');
            }}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
          >
            <option value="All">All Countries</option>
            {Object.keys(COUNTRIES_DATA).map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>City</label>
          <select 
            value={selectedCity}
            disabled={selectedCountry === 'All'}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setSelectedArea('All');
            }}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', opacity: selectedCountry === 'All' ? 0.6 : 1 }}
          >
            <option value="All">All Cities</option>
            {availableCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Urban Area / District</label>
          <select 
            value={selectedArea}
            disabled={selectedCity === 'All'}
            onChange={(e) => setSelectedArea(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', opacity: selectedCity === 'All' ? 0.6 : 1 }}
          >
            <option value="All">All Areas</option>
            {availableAreas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Listings Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {filteredListings.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#64748b' }}>
            No listings found matching your selected filters. Try broadening your criteria.
          </div>
        ) : (
          filteredListings.map(listing => (
            <div key={listing.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
              <img src={listing.image} alt={listing.title} style={{ height: '180px', width: '100%', objectFit: 'cover' }} />
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, background: '#eff6ff', color: '#2563eb', padding: '4px 8px', borderRadius: '4px' }}>
                      {listing.category}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#eab308', fontWeight: 'bold' }}>★ {listing.rating}</span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '6px', color: '#0f172a' }}>{listing.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '12px' }}>{listing.area}, {listing.city}, {listing.country}</p>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                  <div>
                    <span style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#0f172a' }}>${listing.pricePerUnit}</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}> / {listing.pricePeriod}</span>
                  </div>
                  <button 
                    onClick={() => onSelectListingForBooking(listing)}
                    style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
                 }
                         
