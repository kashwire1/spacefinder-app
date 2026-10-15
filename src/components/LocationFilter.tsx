import { Country, State, City } from 'country-state-city';
import { useState } from 'react';

export default function LocationFilter() {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');

  const countries = Country.getAllCountries();
  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
  const cities = selectedState 
    ? City.getCitiesOfState(selectedCountry, selectedState) 
    : selectedCountry 
    ? City.getCitiesOfCountry(selectedCountry) 
    : [];

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Country</label>
        <select 
          className="w-full p-2 border rounded-md"
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            setSelectedState('');
          }}
        >
          <option value="">All Countries</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Region / State</label>
        <select 
          className="w-full p-2 border rounded-md"
          disabled={!selectedCountry}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">All Regions / States</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">City / Urban Area</label>
        <select className="w-full p-2 border rounded-md" disabled={!selectedCountry}>
          <option value="">All Cities & Areas</option>
          {cities.map((city, index) => (
            <option key={index} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
