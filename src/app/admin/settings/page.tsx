"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

  // Profile Form State
  const [profileData, setProfileData] = useState({
    fullName: 'Giring Furqon',
    email: 'alma.lawson@example.com',
    phoneNumber: '(+33) 7 00 55 57 60',
    dateOfBirth: 'Strawberry Land',
    location: '312 3rd St. Albany, New York 12206, USA',
    avatar: '/images/giring-furqon.jpg',
  });

  // Change Password Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: 'ewsrtyo4678@#$_)(*&',
    newPassword: 'ewsrtyo4678@#$_)(*&',
    confirmPassword: 'ewsrtyo4678@#$_)(*&',
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toast / Feedback State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile information successfully updated.');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('New passwords do not match. Please try again.');
      return;
    }
    showToast('Admin password changed successfully.');
  };

  const handlePasswordReset = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    showToast('Password fields cleared.');
  };

  const handleAvatarChange = () => {
    showToast('Photo upload dialog opened. Select a new profile picture.');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-stone-900/95 text-white text-sm font-semibold shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#E05A27] animate-ping" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-stone-400 hover:text-white p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex items-center gap-3 pb-3">
        <Link
          href="/admin"
          className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          title="Back to Dashboard"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold text-stone-800 tracking-tight">
          Profile
        </h1>
      </div>

      {/* Hero Profile Card (Matches Image 4 & 5) */}
      <div className="relative bg-[#F4F5F7] rounded-[22px] py-8 px-6 sm:py-10 flex flex-col items-center justify-center transition-all shadow-2xs">
        {/* Top-Right Edit Pencil Button */}
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-white/70 transition-colors"
          title="Edit Profile"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>

        {/* Centered Avatar with Camera Badge */}
        <div className="relative group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-white shadow-md bg-stone-200">
            <img
              src={profileData.avatar}
              alt={profileData.fullName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Camera / Photo Overlay Badge (bottom-right of avatar) */}
          <button
            type="button"
            onClick={handleAvatarChange}
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border border-stone-200 shadow-md flex items-center justify-center text-stone-600 hover:text-[#E05A27] hover:scale-105 transition-all"
            title="Change Avatar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* User Name */}
        <h2 className="mt-4 text-xl sm:text-2xl font-bold text-stone-700 tracking-tight">
          {profileData.fullName}
        </h2>
      </div>

      {/* Tabs Navigation (Profile | Change Password) */}
      <div className="border-b border-stone-200/80">
        <div className="flex gap-8 text-sm sm:text-base">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`pb-3 font-bold transition-all relative ${
              activeTab === 'profile'
                ? 'text-stone-900'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Profile
            {activeTab === 'profile' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E05A27] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('password')}
            className={`pb-3 font-bold transition-all relative ${
              activeTab === 'password'
                ? 'text-stone-900'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Change Password
            {activeTab === 'password' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E05A27] rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* TAB 1: Profile Form (Image 4) */}
      {activeTab === 'profile' && (
        <form onSubmit={handleProfileSubmit} className="pt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-stone-500 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                className="w-full h-11 sm:h-12 px-4 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#E05A27] focus:ring-1 focus:ring-[#E05A27] transition-all bg-white"
                placeholder="Enter full name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-stone-500 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full h-11 sm:h-12 px-4 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#E05A27] focus:ring-1 focus:ring-[#E05A27] transition-all bg-white"
                placeholder="Enter email address"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-stone-500 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={profileData.phoneNumber}
                onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                className="w-full h-11 sm:h-12 px-4 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#E05A27] focus:ring-1 focus:ring-[#E05A27] transition-all bg-white"
                placeholder="Enter phone number"
                required
              />
            </div>

            {/* Date of birth */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-stone-500 mb-1.5">
                Date of birth
              </label>
              <input
                type="text"
                value={profileData.dateOfBirth}
                onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                className="w-full h-11 sm:h-12 px-4 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#E05A27] focus:ring-1 focus:ring-[#E05A27] transition-all bg-white"
                placeholder="Enter birth date or location"
              />
            </div>

            {/* Location (Full Row) */}
            <div className="md:col-span-2">
              <label className="block text-xs sm:text-sm font-medium text-stone-500 mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                className="w-full h-11 sm:h-12 px-4 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#E05A27] focus:ring-1 focus:ring-[#E05A27] transition-all bg-white"
                placeholder="Enter location address"
              />
            </div>
          </div>

          {/* Centered Update Button */}
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="px-10 sm:px-14 py-2.5 sm:py-3 rounded-xl bg-[#E05A27] hover:bg-[#c94d1d] text-white font-bold text-sm sm:text-base shadow-md transition-all active:scale-98"
            >
              Update
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: Change Password Form (Image 5) */}
      {activeTab === 'password' && (
        <form onSubmit={handlePasswordSubmit} className="pt-4 space-y-6">
          {/* Centered Section Title */}
          <div className="text-center">
            <h3 className="text-base sm:text-lg font-bold text-stone-800 tracking-tight">
              Change Password
            </h3>
          </div>

          {/* Password Inputs */}
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              {/* Current Password */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-stone-500 mb-1.5">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, currentPassword: e.target.value })
                    }
                    className="w-full h-11 sm:h-12 pl-4 pr-11 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#E05A27] focus:ring-1 focus:ring-[#E05A27] transition-all bg-white font-mono"
                    placeholder="Enter current password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                    title={showCurrentPassword ? 'Hide password' : 'Show password'}
                  >
                    {showCurrentPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-stone-500 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                    className="w-full h-11 sm:h-12 pl-4 pr-11 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#E05A27] focus:ring-1 focus:ring-[#E05A27] transition-all bg-white font-mono"
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                    title={showNewPassword ? 'Hide password' : 'Show password'}
                  >
                    {showNewPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Confirm Password (Full row or left col) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <div className="md:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-stone-500 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
                    className="w-full h-11 sm:h-12 pl-4 pr-11 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#E05A27] focus:ring-1 focus:ring-[#E05A27] transition-all bg-white font-mono"
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                    title={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons: Reset & Confirm (side-by-side, centered) */}
          <div className="pt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handlePasswordReset}
              className="px-8 sm:px-10 py-2 sm:py-2.5 rounded-xl border border-[#E05A27]/40 text-[#E05A27] bg-white hover:bg-orange-50/50 font-semibold text-sm transition-all"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-8 sm:px-10 py-2 sm:py-2.5 rounded-xl bg-[#E05A27] hover:bg-[#c94d1d] text-white font-bold text-sm shadow-md transition-all active:scale-98"
            >
              Confirm
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
