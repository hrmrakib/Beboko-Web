"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface FeedbackItem {
  id: number;
  name: string;
  description: string;
  time: string;
  status: 'Pending' | 'Replied';
  replyMessage?: string;
}

const initialFeedbackList: FeedbackItem[] = [
  {
    id: 1,
    name: "Jullu Jalal",
    description: "Our Bachelor of Commerce program is ACBSP-accredited.",
    time: "8:38 AM",
    status: "Pending"
  },
  {
    id: 2,
    name: "Jullu Jalal",
    description: "Our Bachelor of Commerce program is ACBSP-accredited.",
    time: "8:38 AM",
    status: "Replied",
    replyMessage: "Thank you for letting us know! We have verified and updated your profile."
  },
  {
    id: 3,
    name: "Jullu Jalal",
    description: "Our Bachelor of Commerce program is ACBSP-accredited.",
    time: "8:38 AM",
    status: "Replied",
    replyMessage: "Noted with thanks. Our team has reviewed your inquiry."
  },
  {
    id: 4,
    name: "Jullu Jalal",
    description: "Our Bachelor of Commerce program is ACBSP-accredited.",
    time: "8:38 AM",
    status: "Replied",
    replyMessage: "Your store verification documents have been processed."
  },
  {
    id: 5,
    name: "Jullu Jalal",
    description: "Our Bachelor of Commerce program is ACBSP-accredited.",
    time: "8:38 AM",
    status: "Replied",
    replyMessage: "All concerns resolved."
  }
];

export default function AdminFeedbackPage() {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>(initialFeedbackList);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeReplyItem, setActiveReplyItem] = useState<FeedbackItem | null>(null);
  const [replyText, setReplyText] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filteredList = feedbackList.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
  });

  const handleDelete = (id: number) => {
    setFeedbackList((prev) => prev.filter((item) => item.id !== id));
    setToastMsg("Feedback entry deleted.");
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleOpenReply = (item: FeedbackItem) => {
    setActiveReplyItem(item);
    setReplyText(item.replyMessage || "");
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReplyItem) return;

    setFeedbackList((prev) =>
      prev.map((item) => {
        if (item.id === activeReplyItem.id) {
          return {
            ...item,
            status: 'Replied',
            replyMessage: replyText.trim() || 'Response sent by Administrator.'
          };
        }
        return item;
      })
    );

    setToastMsg(`Reply sent to ${activeReplyItem.name}.`);
    setTimeout(() => setToastMsg(null), 3500);
    setActiveReplyItem(null);
    setReplyText("");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-stone-900/95 text-white text-sm font-semibold shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in">
          <span className="w-2 h-2 rounded-full bg-[#85A72C] animate-ping" />
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="ml-2 text-stone-400 hover:text-white p-1">
            ✕
          </button>
        </div>
      )}

      {/* Header Bar (Matches Image 4 & 5: ← Feedback) */}
      <div className="flex items-center gap-3 pb-2">
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
          Feedback
        </h1>
      </div>

      {/* Search Input Box (Matches Image 4 & 5) */}
      <div className="pt-1">
        <div className="relative w-full max-w-md">
          <svg
            className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" strokeWidth={2} />
            <path strokeLinecap="round" strokeWidth={2} d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-stone-200 text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:border-[#85A72C] focus:ring-1 focus:ring-[#85A72C] transition-all bg-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Table Container (Matches Image 4 & 5) */}
      <div className="overflow-x-auto select-none pt-2">
        <table className="w-full text-left text-xs sm:text-sm min-w-[750px]">
          <thead>
            <tr className="text-stone-700 font-bold border-b border-stone-100 pb-3">
              <th className="py-3 px-3 font-bold w-48">Name</th>
              <th className="py-3 px-3 font-bold">Description</th>
              <th className="py-3 px-3 font-bold w-28 whitespace-nowrap">Time</th>
              <th className="py-3 px-3 font-bold w-36 text-center">Status</th>
              <th className="py-3 px-3 font-bold w-12 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100/70">
            {filteredList.map((item) => (
              <tr key={item.id} className="hover:bg-stone-50/60 transition-colors">
                {/* Name */}
                <td className="py-4 px-3 font-medium text-stone-700 whitespace-nowrap">
                  {item.name}
                </td>

                {/* Description */}
                <td className="py-4 px-3 text-stone-600 leading-relaxed">
                  {item.description}
                </td>

                {/* Time */}
                <td className="py-4 px-3 text-stone-500 whitespace-nowrap text-xs font-medium">
                  {item.time}
                </td>

                {/* Status: Outlined pill button with curved reply arrow (Matches Image 4 & 5) */}
                <td className="py-4 px-3 text-center whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => handleOpenReply(item)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all active:scale-95 shadow-2xs ${
                      item.status === 'Pending'
                        ? 'border-[#4F46E5] text-[#4F46E5] hover:bg-indigo-50/60'
                        : 'border-[#22C55E] text-[#16A34A] hover:bg-green-50/60'
                    }`}
                    title={item.status === 'Pending' ? 'Click to reply' : 'View or update reply'}
                  >
                    {/* Curved Reply Arrow Icon */}
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.2}
                        d="M3 10h10a5 5 0 015 5v2m-15-7l4-4m-4 4l4 4"
                      />
                    </svg>
                    <span>{item.status}</span>
                  </button>
                </td>

                {/* Trash Can Action Button (Matches Image 4 & 5) */}
                <td className="py-4 px-3 text-center whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg transition-colors"
                    title="Delete feedback"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reply Modal */}
      {activeReplyItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-800 text-lg">
                Respond to {activeReplyItem.name}
              </h3>
              <button
                onClick={() => setActiveReplyItem(null)}
                className="text-stone-400 hover:text-stone-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 p-3.5 bg-stone-50 rounded-xl border border-stone-200/70 text-xs text-stone-600">
              <span className="font-bold text-stone-700">User Comment: </span>
              &ldquo;{activeReplyItem.description}&rdquo;
            </div>

            <form onSubmit={handleSendReply} className="pt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Administrator Response Message
                </label>
                <textarea
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type official reply here..."
                  className="w-full p-3.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#85A72C] focus:ring-1 focus:ring-[#85A72C]"
                  required
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#85A72C] hover:bg-[#729124] text-white font-bold text-sm shadow-sm transition-all"
                >
                  Send Reply &amp; Mark Replied
                </button>
                <button
                  type="button"
                  onClick={() => setActiveReplyItem(null)}
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
