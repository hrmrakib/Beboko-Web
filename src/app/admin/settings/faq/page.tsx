"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface FAQEntry {
  id: number;
  questionNumber: number;
  question: string;
  answer: string;
}

const initialFAQEntries: FAQEntry[] = [
  {
    id: 1,
    questionNumber: 1,
    question: "How do I book an appointment?",
    answer: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal ."
  },
  {
    id: 2,
    questionNumber: 2,
    question: "Can I cancel or reschedule an appointment?",
    answer: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal ."
  },
  {
    id: 3,
    questionNumber: 3,
    question: "How do I join a telemedicine consultation?",
    answer: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal ."
  },
  {
    id: 4,
    questionNumber: 4,
    question: "How do I access my medical records?",
    answer: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal ."
  }
];

export default function FAQSettingsPage() {
  const [faqs, setFaqs] = useState<FAQEntry[]>(initialFAQEntries);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    const nextNumber = faqs.length > 0 ? Math.max(...faqs.map(f => f.questionNumber)) + 1 : 1;
    const newEntry: FAQEntry = {
      id: Date.now(),
      questionNumber: nextNumber,
      question: newQuestion,
      answer: newAnswer
    };

    setFaqs([...faqs, newEntry]);
    setNewQuestion("");
    setNewAnswer("");
    setShowAddModal(false);
    setToastMsg(`Question no: ${nextNumber} added successfully.`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleDelete = (id: number) => {
    setFaqs(faqs.filter(f => f.id !== id));
    setToastMsg("Question removed.");
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
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
      <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
        <Link
          href="/admin/settings"
          className="p-1 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          title="Back to Settings"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold text-stone-800 tracking-tight">
          FAQ
        </h1>
      </div>

      {/* 2-Column FAQ Grid (Exact spacing, headers, answers matching Image 3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 sm:gap-x-16 gap-y-10 pt-2">
        {faqs.map((faq) => (
          <div key={faq.id} className="relative group space-y-2">
            {/* Question Number */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-stone-600">
                Question no: {faq.questionNumber}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(faq.id)}
                className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-red-500 p-1 transition-opacity"
                title="Delete question"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            {/* Question Title */}
            <h3 className="text-sm sm:text-[15px] font-semibold text-stone-800 leading-snug">
              {faq.question}
            </h3>

            {/* Answer Label */}
            <div className="pt-2 text-sm font-semibold text-stone-600">
              Answer
            </div>

            {/* Answer Content */}
            <p className="text-xs sm:text-[13px] text-stone-500 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      {/* Centered Bottom Action Button: Add new question + (Matches Image 3) */}
      <div className="pt-8 flex justify-center">
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-8 py-3 rounded-xl bg-[#E05A27] hover:bg-[#c94d1d] text-white font-semibold text-sm shadow-md transition-all active:scale-98 flex items-center gap-2"
        >
          <span>Add new question</span>
          <span className="text-lg leading-none font-bold">+</span>
        </button>
      </div>

      {/* Add New Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-800 text-lg">Add New Question</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddQuestion} className="pt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Question
                </label>
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="e.g. How do I track my order delivery?"
                  className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#E05A27] focus:ring-1 focus:ring-[#E05A27]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Answer
                </label>
                <textarea
                  rows={4}
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Enter the detailed answer..."
                  className="w-full p-3.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#E05A27] focus:ring-1 focus:ring-[#E05A27]"
                  required
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#E05A27] hover:bg-[#c94d1d] text-white font-bold text-sm shadow-sm transition-all"
                >
                  Save Question
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
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
