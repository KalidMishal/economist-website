'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const INQUIRY_TYPES = [
  '--',
  'General Inquiry',
  'Advertising',
  'Press / Media',
  'Editorial',
  'Technical Support',
  'Subscriptions',
  'Careers',
  'Other',
];

export default function ContactUsPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    company: '',
    inquiryType: '--',
    detail: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`http://${window.location.hostname}:5000/api/contact-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          whatsapp: form.whatsapp,
          company: form.company,
          inquiry_type: form.inquiryType,
          message: form.detail
        })
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Banner */}
      <div className="w-full h-[280px] sm:h-[360px] md:h-[420px] relative overflow-hidden">
        <img
          src="/Contact-us Banner.jpeg"
          alt="Contact Us Banner"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">

          {/* Left: Company Info */}
          <div className="md:w-[300px] flex-shrink-0">
            <h1 className="text-[28px] md:text-[32px] font-serif font-bold text-[#1a1a1a] leading-tight mb-1">
              Newyork Capital
            </h1>
            {/* Red underline accent */}
            <div className="w-12 h-[3px] bg-[#c0392b] mb-6 mt-2" />

            <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-gray-500 mb-2">
              Headquarters Address
            </p>
            <p className="text-[15px] text-[#1a1a1a] font-sans leading-relaxed">
              2316 Eastgate St #160<br />
              Walla Walla, Washington (WA) 99362<br />
              United States
            </p>

            <div className="mt-8">
              <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-gray-500 mb-2">
                General Inquiries
              </p>
              <a
                href="mailto:newyorkcapital4@gmail.com"
                className="text-[15px] text-[#1a65d6] hover:underline font-sans"
              >
                newyorkcapital4@gmail.com
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex-1">
            <h2 className="text-[22px] md:text-[26px] font-serif font-bold text-[#1a1a1a] mb-1">
              Submit Your Query
            </h2>
            <p className="text-[14px] text-gray-500 mb-6">
              Please, fill out the form below and submit your inquiry.
            </p>

            {submitted ? (
              <div className="bg-[#f2fcf5] border border-[#d6f0e0] p-10 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-[#00c853] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-[#006633] text-[20px] font-serif font-bold mb-3">Query Submitted Successfully!</h3>
                <p className="text-[13px] text-gray-500 max-w-[500px] mb-6">
                  Thank you for reaching out to the Newyork Capital. Our editorial or support team will review your inquiry and get back to you shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', whatsapp: '', company: '', inquiryType: '--', detail: '' }); }}
                  className="bg-[#0b3c7c] hover:bg-[#0a2f5e] text-white text-[13px] font-bold px-6 py-2.5 transition-colors rounded-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-sans font-semibold text-gray-700 mb-1">
                      YOUR NAME <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-[14px] font-sans focus:outline-none focus:border-[#1a65d6] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-sans font-semibold text-gray-700 mb-1">
                      YOUR EMAIL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john.doe@example.com"
                      required
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-[14px] font-sans focus:outline-none focus:border-[#1a65d6] transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Phone + WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-sans font-semibold text-gray-700 mb-1">
                      PHONE NUMBER (WITH COUNTRY CODE) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      required
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-[14px] font-sans focus:outline-none focus:border-[#1a65d6] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-sans font-semibold text-gray-700 mb-1">
                      WHATSAPP NUMBER <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={form.whatsapp}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      required
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-[14px] font-sans focus:outline-none focus:border-[#1a65d6] transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3: Company + Inquiry Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-sans font-semibold text-gray-700 mb-1">
                      COMPANY NAME
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Company LLC (Optional)"
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-[14px] font-sans focus:outline-none focus:border-[#1a65d6] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-sans font-semibold text-gray-700 mb-1">
                      TYPE OF INQUIRY <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="inquiryType"
                      value={form.inquiryType}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-[14px] font-sans bg-white focus:outline-none focus:border-[#1a65d6] transition-colors"
                    >
                      {INQUIRY_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 4: Detail */}
                <div>
                  <label className="block text-[12px] font-sans font-semibold text-gray-700 mb-1">
                    YOUR QUESTION(S) / INQUIRY DETAIL <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="detail"
                    value={form.detail}
                    onChange={handleChange}
                    placeholder="Please enter your detailed query here..."
                    required
                    rows={5}
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-[14px] font-sans focus:outline-none focus:border-[#1a65d6] transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 bg-[#1a4a8a] hover:bg-[#0f3470] text-white font-sans font-bold text-[13px] uppercase tracking-widest px-6 py-3 transition-colors disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                        Submit Inquiry
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
