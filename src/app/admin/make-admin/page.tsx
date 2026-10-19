"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'Super Admin' | 'Operations Admin' | 'Support Admin';
  avatar: string;
  dateAdded: string;
}

const initialAdmins: AdminUser[] = [
  {
    id: 1,
    name: 'Giring Furqon',
    email: 'alma.lawson@example.com',
    role: 'Super Admin',
    avatar: '/images/giring-furqon.jpg',
    dateAdded: '01/10/2024',
  },
  {
    id: 2,
    name: 'Faysal Rahman',
    email: 'faysal@dardar.app',
    role: 'Operations Admin',
    avatar: '/images/avatar-1.png',
    dateAdded: '15/11/2024',
  },
  {
    id: 3,
    name: 'Jawwad Hossain',
    email: 'jawwad@dardar.app',
    role: 'Support Admin',
    avatar: '/images/avatar-2.png',
    dateAdded: '02/12/2024',
  },
];

export default function MakeAdminPage() {
  const [admins, setAdmins] = useState<AdminUser[]>(initialAdmins);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<'Operations Admin' | 'Support Admin'>('Operations Admin');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !newName.trim()) return;

    const newAdmin: AdminUser = {
      id: Date.now(),
      name: newName,
      email: newEmail,
      role: newRole,
      avatar: '/images/avatar-3.png',
      dateAdded: new Date().toLocaleDateString('en-GB'),
    };

    setAdmins([...admins, newAdmin]);
    setNewEmail('');
    setNewName('');
    setShowInviteModal(false);
    setToastMsg(`Invitation successfully sent to ${newEmail}`);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleRemove = (id: number) => {
    if (admins.length <= 1) {
      setToastMsg('Cannot remove the primary Super Admin.');
      setTimeout(() => setToastMsg(null), 3000);
      return;
    }
    setAdmins(admins.filter((a) => a.id !== id));
    setToastMsg('Admin privileges revoked.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {toastMsg && (
        <div className="p-3.5 rounded-xl bg-stone-900 text-white text-xs sm:text-sm font-semibold flex items-center justify-between shadow-sm">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="text-stone-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-1 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            title="Back to Dashboard"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-800 tracking-tight">
            Admin Access & Roles
          </h1>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="px-4 py-2 rounded-xl bg-[#85A72C] hover:bg-[#729124] text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
        >
          + Make Admin
        </button>
      </div>

      {/* Admin Users Table */}
      <div className="overflow-x-auto select-none">
        <table className="w-full text-left text-xs sm:text-sm min-w-[700px]">
          <thead>
            <tr className="text-stone-700 font-bold border-b border-stone-100 pb-3">
              <th className="py-3 px-3 font-bold">Admin User</th>
              <th className="py-3 px-3 font-bold">Role</th>
              <th className="py-3 px-3 font-bold">Date Added</th>
              <th className="py-3 px-3 font-bold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {admins.map((adm) => (
              <tr key={adm.id} className="hover:bg-stone-50/60 transition-colors">
                <td className="py-4 px-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={adm.avatar}
                      alt={adm.name}
                      className="w-10 h-10 rounded-full object-cover border border-stone-200"
                    />
                    <div>
                      <div className="font-bold text-stone-800 leading-tight">{adm.name}</div>
                      <div className="text-[11px] text-stone-400 mt-0.5">{adm.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      adm.role === 'Super Admin'
                        ? 'bg-orange-100 text-[#E05A27]'
                        : adm.role === 'Operations Admin'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {adm.role}
                  </span>
                </td>
                <td className="py-4 px-3 text-stone-500 font-medium">{adm.dateAdded}</td>
                <td className="py-4 px-3 text-center">
                  {adm.role !== 'Super Admin' && (
                    <button
                      onClick={() => handleRemove(adm.id)}
                      className="text-red-500 hover:text-red-700 font-semibold text-xs px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Revoke Access
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-800 text-lg">Invite New Administrator</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleInvite} className="pt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Jean Dupont"
                  className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#85A72C]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="admin@dardar.app"
                  className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#85A72C]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Assigned Role
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#85A72C]"
                >
                  <option value="Operations Admin">Operations Admin</option>
                  <option value="Support Admin">Support Admin</option>
                </select>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#85A72C] hover:bg-[#729124] text-white font-bold text-sm shadow-sm transition-all"
                >
                  Send Invitation
                </button>
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 font-semibold text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
