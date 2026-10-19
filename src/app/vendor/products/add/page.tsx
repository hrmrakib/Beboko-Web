"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function VendorAddProductsPage() {
  const [productName, setProductName] = useState('Fresh Strawberry');
  const [price, setPrice] = useState('$100');
  const [currency, setCurrency] = useState('$90');
  const [deliveryFee, setDeliveryFee] = useState('$9');
  const [category, setCategory] = useState('Foods');
  const [subCategory, setSubCategory] = useState('Fruits');
  const [quantity, setQuantity] = useState('500-600gm');
  const [description, setDescription] = useState('');

  // Image Upload Slots
  const [images, setImages] = useState<(string | null)[]>([null, null, null]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleImageUpload = (index: number) => {
    // Demo image picker placeholder simulation
    const demoImages = [
      '/images/pickup.jpg',
      '/images/vendor.jpg',
      '/images/hero-phone.png',
    ];
    const newImages = [...images];
    newImages[index] = demoImages[index % demoImages.length];
    setImages(newImages);
    setToastMsg(`Image ${index + 1} uploaded successfully.`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleRemoveImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setToastMsg('Data refreshed.');
      setTimeout(() => setToastMsg(null), 2500);
    }, 600);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) {
      setToastMsg('Please provide a product name.');
      return;
    }
    setToastMsg(`"${productName}" has been successfully published to your store!`);
    setTimeout(() => setToastMsg(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-stone-900/95 text-white text-sm font-semibold shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in">
          <span className="w-2 h-2 rounded-full bg-[#E05A27] animate-ping" />
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="ml-2 text-stone-400 hover:text-white p-1">
            ✕
          </button>
        </div>
      )}

      {/* Header Bar (Matches Image 3) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <Link
            href="/vendor"
            className="p-1 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            title="Back to Dashboard"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-800 tracking-tight">
            Total Order
          </h1>
        </div>

        {/* Action Controls: Data Refresh Button + Timestamp */}
        <div className="flex flex-wrap items-center gap-3 self-end sm:self-auto text-xs sm:text-sm">
          <button
            type="button"
            onClick={handleRefresh}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 font-semibold text-stone-700 shadow-2xs transition-all active:scale-95"
          >
            <span>Data Refresh</span>
            <svg
              className={`w-3.5 h-3.5 text-indigo-600 ${isRefreshing ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>

          <span className="text-stone-600 font-medium whitespace-nowrap">
            March 25,2024 10:43 Am
          </span>
        </div>
      </div>

      <form onSubmit={handlePublish} className="space-y-6">
        {/* Section 1: Upload Product Image (3 dashed border boxes) */}
        <div>
          <h2 className="text-xs sm:text-sm font-medium text-stone-600 mb-3">
            Upload Product Image
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => handleImageUpload(idx)}
                className="relative h-44 sm:h-48 rounded-2xl border-2 border-dashed border-stone-300 hover:border-[#85A72C] bg-stone-50/50 hover:bg-stone-50 flex flex-col items-center justify-center p-4 transition-all cursor-pointer group shadow-2xs"
              >
                {img ? (
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <img src={img} alt="Product" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={(e) => handleRemoveImage(idx, e)}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      title="Remove Image"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Gallery / Image Icon */}
                    <div className="w-12 h-12 rounded-xl bg-white border border-stone-200/80 flex items-center justify-center text-stone-400 group-hover:text-[#85A72C] group-hover:scale-105 transition-all shadow-2xs">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.8} />
                        <circle cx="8.5" cy="8.5" r="1.5" strokeWidth={1.8} />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 15l-5-5L5 21" />
                      </svg>
                    </div>

                    {/* Text: Browse Image (Green) */}
                    <span className="text-xs font-semibold text-[#85A72C] group-hover:underline mt-2.5">
                      Browse Image
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Form Inputs (Matches Image 3) */}
        <div className="space-y-4 pt-2">
          {/* Row 1: 4 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Product Name */}
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1.5">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Fresh Strawberry"
                className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#85A72C] focus:ring-1 focus:ring-[#85A72C] bg-white transition-all"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1.5">
                Price
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="$100"
                className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#85A72C] focus:ring-1 focus:ring-[#85A72C] bg-white transition-all"
                required
              />
            </div>

            {/* Select Currency */}
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1.5">
                Select Currency
              </label>
              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="appearance-none w-full h-11 px-3.5 pr-8 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#85A72C] bg-white transition-all cursor-pointer"
                >
                  <option value="$90">$90</option>
                  <option value="USD">USD ($)</option>
                  <option value="CDF">CDF (FC)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
                <svg
                  className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Delivery Fee */}
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1.5">
                Delivery Fee
              </label>
              <input
                type="text"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(e.target.value)}
                placeholder="$9"
                className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#85A72C] focus:ring-1 focus:ring-[#85A72C] bg-white transition-all"
              />
            </div>
          </div>

          {/* Row 2: 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Select Category */}
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1.5">
                Select Category
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none w-full h-11 px-3.5 pr-8 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#85A72C] bg-white transition-all cursor-pointer"
                >
                  <option value="Foods">Foods</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Beverages">Beverages</option>
                </select>
                <svg
                  className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Select Sub Category */}
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1.5">
                Select Sub Category
              </label>
              <div className="relative">
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="appearance-none w-full h-11 px-3.5 pr-8 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#85A72C] bg-white transition-all cursor-pointer"
                >
                  <option value="Fruits">Fruits</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Dairy">Dairy</option>
                </select>
                <svg
                  className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1.5">
                Quantity
              </label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="500-600gm"
                className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#85A72C] focus:ring-1 focus:ring-[#85A72C] bg-white transition-all"
              />
            </div>
          </div>

          {/* Row 3: Description */}
          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1.5">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write here...."
              className="w-full p-3.5 rounded-xl border border-stone-200 text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:border-[#85A72C] focus:ring-1 focus:ring-[#85A72C] bg-white transition-all resize-none"
            />
          </div>
        </div>

        {/* Centered Publish Button (Matches Image 3) */}
        <div className="pt-6 flex justify-center">
          <button
            type="submit"
            className="px-14 py-3 rounded-xl bg-[#E05A27] hover:bg-[#c94d1d] text-white font-bold text-sm shadow-md transition-all active:scale-98"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
