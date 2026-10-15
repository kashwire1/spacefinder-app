import React, { useState } from 'react';

export default function HostSettings() {
  // Bank Account State
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [currency, setCurrency] = useState('NGN');
  const [isSaved, setIsSaved] = useState(false);

  // Default Listing Rates & Fees
  const [cleaningFee, setCleaningFee] = useState('0');
  const [customPricingEnabled, setCustomPricingEnabled] = useState(false);

  const handleSaveBankDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 font-sans">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Host Settings & Payout Preferences</h1>
      <p className="text-xs text-gray-500 mb-6">
        Configure your local bank account for direct payouts and set up custom space parameters.
      </p>

      {/* SUCCESS BANNER */}
      {isSaved && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm font-medium">
          ✓ Payout settings saved successfully! Payouts will be sent directly to this account.
        </div>
      )}

      {/* SECTION 1: BANK ACCOUNT FOR PAYOUTS */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">🏦 Bank Payout Account</h2>
        <p className="text-xs text-gray-500 mb-4">
          SpaceFinder transfers your net earnings directly to this account upon check-in verification.
        </p>

        <form onSubmit={handleSaveBankDetails} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Payout Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-2.5 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="NGN">NGN - Nigerian Naira (Paystack / Flutterwave)</option>
              <option value="EUR">EUR - Euros (SEPA Bank Transfer)</option>
              <option value="AED">AED - UAE Dirhams</option>
              <option value="USD">USD - US Dollar Account</option>
              <option value="GHS">GHS - Ghanaian Cedi</option>
              <option value="KES">KES - Kenyan Shilling</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Bank Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Zenith Bank, Access Bank, Revolut"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Account / IBAN Number</label>
              <input
                type="text"
                required
                placeholder="e.g. 0123456789 or IBAN"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Account Holder Name</label>
            <input
              type="text"
              required
              placeholder="Name matching your bank account"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-sm shadow-sm"
          >
            Save Payout Account Details
          </button>
        </form>
      </div>

      {/* SECTION 2: CUSTOM PRICING & FEES */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-1">⚙️ Space Pricing Settings</h2>
        <p className="text-xs text-gray-500 mb-4">
          SpaceFinder automatically deducts 12% (Standard Listings) or 15% (Hotel Bookings) on the backend.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Optional Cleaning Fee ($)</label>
            <input
              type="number"
              value={cleaningFee}
              onChange={(e) => setCleaningFee(e.target.value)}
              placeholder="0"
              className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">This fee will be combined into the final price guests see.</p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-sm font-semibold text-gray-800">Enable Weekend / Peak Pricing</p>
              <p className="text-xs text-gray-400">Allow automatic rate adjustments during high demand periods</p>
            </div>
            <input
              type="checkbox"
              checked={customPricingEnabled}
              onChange={(e) => setCustomPricingEnabled(e.target.checked)}
              className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
