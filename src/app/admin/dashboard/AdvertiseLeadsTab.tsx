"use client";

import React, { useState, useEffect } from 'react';
const IconSearch = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);
const IconEye = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);
const IconTrash = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
);

interface Submission {
  id: number;
  name: string;
  company_name: string;
  email: string;
  phone: string;
  whatsapp: string;
  interested_option: string;
  detail: string;
  status: 'New' | 'Contacted' | 'Proposal sent' | 'Won' | 'Lost';
  created_at: string;
}

export default function AdvertiseLeadsTab() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Service Options');
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [viewLead, setViewLead] = useState<Submission | null>(null);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (search) query.append('search', search);
      if (typeFilter && typeFilter !== 'All Service Options') query.append('type', typeFilter);

      const res = await fetch(`http://localhost:5000/api/advertise-leads?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch (error) {
      console.error("Failed to fetch submissions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [search, typeFilter]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    setOpenDropdownId(null);
    try {
      const res = await fetch(`http://localhost:5000/api/advertise-leads/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setSubmissions(submissions.map(sub => sub.id === id ? { ...sub, status: newStatus as any } : sub));
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this submission?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/advertise-leads/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setSubmissions(submissions.filter(sub => sub.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete submission", error);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + '. ' +
           d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const truncateMessage = (msg: string) => {
    if (!msg) return '';
    return msg.length > 45 ? msg.substring(0, 45) + '...' : msg;
  };

  return (
    <>
      {/* Modal */}
      {viewLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[600px] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-6 pt-6 pb-4 relative">
              <button 
                onClick={() => setViewLead(null)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              
              <div className="inline-block bg-[#e6f0ff] text-[#0047b3] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3">
                {viewLead.interested_option}
              </div>
              <h2 className="text-2xl font-bold text-[#0B1E36]">Client Lead Details</h2>
              <p className="text-xs text-gray-500 mt-1">Submitted on {formatDate(viewLead.created_at)}</p>
            </div>
            
            {/* Body */}
            <div className="px-6 py-4 flex-1 overflow-y-auto">
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Client Name</label>
                  <div className="font-semibold text-gray-900">{viewLead.name}</div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Company</label>
                  <div className="font-semibold text-gray-900">{viewLead.company_name || '-'}</div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email Address</label>
                  <a href={`mailto:${viewLead.email}`} className="font-semibold text-[#1a65d6] hover:underline">{viewLead.email}</a>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</label>
                  <select 
                    value={viewLead.status}
                    onChange={(e) => {
                      handleStatusChange(viewLead.id, e.target.value);
                      setViewLead({...viewLead, status: e.target.value as any});
                    }}
                    className="border border-gray-300 rounded px-2 py-1 text-sm text-[#0B1E36] font-medium min-w-[140px] focus:outline-none focus:border-[#215EBA]"
                  >
                    {['New', 'Contacted', 'Proposal sent', 'Won', 'Lost'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Phone Number</label>
                  <div className="font-semibold text-gray-900">{viewLead.phone || '-'}</div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">WhatsApp</label>
                  <div className="font-semibold text-gray-900">{viewLead.whatsapp || '-'}</div>
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Advertising / Brand Details</label>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap min-h-[100px]">
                  {viewLead.detail || 'No details provided.'}
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
              <button 
                onClick={() => {
                  handleDelete(viewLead.id);
                  setViewLead(null);
                }}
                className="px-4 py-2 text-xs font-bold text-red-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors uppercase tracking-widest"
              >
                Delete Lead
              </button>
              <button 
                onClick={() => setViewLead(null)}
                className="px-6 py-2 bg-[#0B1E36] hover:bg-[#1a365d] text-white text-xs font-bold uppercase tracking-widest rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-[22px] font-bold text-[#0B1E36]">Advertise Client Leads</h2>
            <p className="text-sm text-gray-500 mt-1">
              View and manage leads submitted by businesses and partners on the Advertise page.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search name, email, message..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full sm:w-[280px] focus:outline-none focus:ring-2 focus:ring-[#E3120B]/20 focus:border-[#E3120B]"
              />
            </div>
            <select 
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E3120B]/20 focus:border-[#E3120B] bg-white appearance-none"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option>All Service Options</option>
              <option>Publish Company Article</option>
              <option>Publish CEO Profile</option>
              <option>Report News</option>
              <option>Newyork Capital Magazine</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm text-gray-600 min-w-[800px]">
            <thead className="bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4">DATE</th>
                <th className="px-6 py-4">NAME / COMPANY</th>
                <th className="px-6 py-4">EMAIL</th>
                <th className="px-6 py-4">PHONE / WHATSAPP</th>
                <th className="px-6 py-4">SERVICE OPTION</th>
                <th className="px-6 py-4 w-[250px]">REQUIREMENTS</th>
                <th className="px-6 py-4">STATUS</th>
                <th className="px-6 py-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">Loading advertise leads...</td>
                </tr>
              ) : submissions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">No advertise leads found.</td>
                </tr>
              ) : (
                submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-5 whitespace-nowrap text-gray-500">{formatDate(sub.created_at)}</td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="font-semibold text-gray-900">{sub.name || 'N/A'}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{sub.company_name || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-gray-600">{sub.email}</td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-gray-600 text-xs"><span className="text-gray-400 mr-1">P:</span> {sub.phone || 'N/A'}</div>
                      <div className="text-gray-600 text-xs mt-0.5"><span className="text-gray-400 mr-1">W:</span> {sub.whatsapp || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="bg-gray-100 text-[#0B1E36] px-3 py-1 rounded-full text-xs font-medium">
                        {sub.interested_option}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-gray-600 line-clamp-1">{truncateMessage(sub.detail)}</p>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap relative">
                      <div 
                        className="cursor-pointer border border-[#E3120B]/20 text-[#E3120B] px-4 py-1.5 rounded text-xs font-medium flex items-center justify-between gap-3 min-w-[120px]"
                        onClick={() => setOpenDropdownId(openDropdownId === sub.id ? null : sub.id)}
                      >
                        <span>{sub.status}</span>
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>

                      {/* Custom Dropdown */}
                      {openDropdownId === sub.id && (
                        <div className="absolute top-12 left-6 w-[120px] bg-white border border-[#215EBA] rounded shadow-lg z-10 overflow-hidden">
                          {['New', 'Contacted', 'Proposal sent', 'Won', 'Lost'].map((statusOption) => (
                            <div 
                              key={statusOption}
                              className={`px-4 py-2 text-xs cursor-pointer ${sub.status === statusOption ? 'bg-[#215EBA] text-white' : 'text-[#215EBA] hover:bg-gray-50'}`}
                              onClick={() => handleStatusChange(sub.id, statusOption)}
                            >
                              {statusOption}
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => setViewLead(sub)} className="text-gray-400 hover:text-[#215EBA] transition-colors" title="View Details">
                          <IconEye size={18} />
                        </button>
                        <button 
                          className="text-gray-400 hover:text-red-500 transition-colors" 
                          title="Delete"
                          onClick={() => handleDelete(sub.id)}
                        >
                          <IconTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
