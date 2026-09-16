'use client';
import React, { useState, useEffect } from 'react';

export default function UsersTab({ currentUser }: { currentUser: any }) {
  const [users, setUsers] = useState<any[]>([]);
  const [activeSubTab, setActiveSubTab] = useState('all');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({ id: '', name: '', email: '', password: '', role: 'writer', bio: '', linkedin_url: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const showSuccessToast = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/users');
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (e) {
      console.error('Failed to fetch users', e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    if (activeSubTab === 'admins') return user.role === 'admin';
    if (activeSubTab === 'writers') return user.role === 'writer';
    if (activeSubTab === 'readers') return user.role === 'reader';
    return true; // all
  });

  const validatePassword = (pass: string) => {
    const minLength = pass.length >= 7;
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[^A-Za-z0-9]/.test(pass);
    return minLength && hasUpper && hasLower && hasNumber && hasSpecial;
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validatePassword(formData.password)) {
      setError('Password must be 7 Characters long and include Atleast 1 Uppercase Letter,1 Lowercase letter,one number, and one special character.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setIsAddModalOpen(false);
        fetchUsers();
        showSuccessToast(`🎉 New user "${formData.name}" created successfully!`);
      } else {
        setError(data.message || 'Error creating user');
      }
    } catch (e) {
      setError('Network error');
    }
    setLoading(false);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password && !validatePassword(formData.password)) {
      setError('Password must be 7 Characters long and include Atleast 1 Uppercase Letter,1 Lowercase letter,one number, and one special character.');
      return;
    }
    
    setLoading(true);
    try {
      const payload: any = { 
        name: formData.name, 
        email: formData.email, 
        role: formData.role,
        bio: formData.bio,
        linkedin_url: formData.linkedin_url
      };
      if (formData.password) payload.password = formData.password;
      
      const res = await fetch(`http://localhost:5000/api/admin/users/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setIsEditModalOpen(false);
        fetchUsers();
        showSuccessToast(`✨ User "${formData.name}" updated successfully!`);
      } else {
        setError(data.message || 'Error updating user');
      }
    } catch (e) {
      setError('Network error');
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchUsers();
      } else {
        alert(data.message || 'Error deleting user');
      }
    } catch (e) {
      alert('Network error');
    }
  };

  const openAddModal = () => {
    setFormData({ id: '', name: '', email: '', password: '', role: 'writer', bio: '', linkedin_url: '' });
    setError('');
    setIsAddModalOpen(true);
  };

  const openEditModal = (user: any) => {
    setFormData({ id: user.id, name: user.name, email: user.email, password: '', role: user.role, bio: user.bio || '', linkedin_url: user.linkedin_url || '' });
    setShowPassword(false);
    setError('');
    setIsEditModalOpen(true);
  };

  const openViewModal = async (user: any) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
    try {
      const res = await fetch(`http://localhost:5000/api/users/${user.id}`);
      const data = await res.json();
      if (data.success && data.user) {
        setSelectedUser(data.user);
      }
    } catch (e) {
      console.error('Failed to fetch detailed profile', e);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-4 md:p-6">
      {/* Header section */}
      <div className="flex justify-between items-start md:items-center mb-6 gap-2 md:gap-0">
        <h2 className="text-[17px] font-bold text-gray-900 flex-1 md:flex-none whitespace-nowrap md:whitespace-normal">Users Desk</h2>
        <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-4 shrink-0">
          <button 
            onClick={openAddModal}
            className="bg-[#e63946] hover:bg-[#d62828] text-white px-5 py-2.5 rounded-lg font-bold text-xs flex items-center gap-2 transition-colors uppercase tracking-widest shadow-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
            ADD USER
          </button>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
            Total Users: {users.length}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 md:gap-8 border-b border-gray-100 mb-6 flex-nowrap overflow-x-auto custom-scrollbar-hide">
        <button 
          onClick={() => setActiveSubTab('all')}
          className={`pb-3 text-[11px] font-bold uppercase tracking-widest transition-colors relative shrink-0 whitespace-nowrap ${activeSubTab === 'all' ? 'text-[#e63946]' : 'text-gray-400 hover:text-gray-600'}`}
        >
          ALL USERS ({users.length})
          {activeSubTab === 'all' && <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#e63946]"></span>}
        </button>
        <button 
          onClick={() => setActiveSubTab('admins')}
          className={`pb-3 text-[11px] font-bold uppercase tracking-widest transition-colors relative shrink-0 whitespace-nowrap ${activeSubTab === 'admins' ? 'text-[#e63946]' : 'text-gray-400 hover:text-gray-600'}`}
        >
          ADMINS ({users.filter(u => u.role === 'admin').length})
          {activeSubTab === 'admins' && <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#e63946]"></span>}
        </button>
        <button 
          onClick={() => setActiveSubTab('writers')}
          className={`pb-3 text-[11px] font-bold uppercase tracking-widest transition-colors relative shrink-0 whitespace-nowrap ${activeSubTab === 'writers' ? 'text-[#e63946]' : 'text-gray-400 hover:text-gray-600'}`}
        >
          WRITERS ({users.filter(u => u.role === 'writer').length})
          {activeSubTab === 'writers' && <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#e63946]"></span>}
        </button>
        <button 
          onClick={() => setActiveSubTab('readers')}
          className={`pb-3 text-[11px] font-bold uppercase tracking-widest transition-colors relative shrink-0 whitespace-nowrap ${activeSubTab === 'readers' ? 'text-[#e63946]' : 'text-gray-400 hover:text-gray-600'}`}
        >
          READERS ({users.filter(u => u.role === 'reader').length})
          {activeSubTab === 'readers' && <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#e63946]"></span>}
        </button>
      </div>

      <div className="mb-4 text-xs font-bold text-gray-900 tracking-wide">
        User Workspace Roles
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">NAME</th>
              <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">EMAIL ADDRESS</th>
              <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">WORKSPACE ROLE</th>
              <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-4 text-sm font-bold text-gray-900 flex items-center gap-2">
                  {user.name} 
                  {user.id === currentUser?.id && <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">You</span>}
                  {user.is_default_admin ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold border border-yellow-400 text-yellow-600 bg-yellow-50 flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                      DEFAULT ADMIN
                    </span>
                  ) : null}
                </td>
                <td className="py-4 px-4 text-xs font-medium text-gray-500">{user.email}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                    user.role === 'admin' ? 'border-red-200 text-red-600 bg-red-50/30' : 
                    user.role === 'writer' ? 'border-blue-200 text-blue-600 bg-blue-50/30' : 
                    'border-gray-200 text-gray-500 bg-gray-50/50'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end gap-2">
                    {/* View Icon is always visible */}
                    <button onClick={() => openViewModal(user)} className="p-1.5 text-blue-500 hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded transition-colors flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </button>
                    
                    {/* Edit visible if: Default Admin, or editing self, or editing writer/reader */}
                    {(Boolean(currentUser?.is_default_admin) || user.id === currentUser?.id || (user.role !== 'admin' && !Boolean(user.is_default_admin))) && (
                      <button onClick={() => openEditModal(user)} className="px-2 py-1.5 text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 rounded transition-colors flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        EDIT
                      </button>
                    )}

                    {/* Delete visible if: not self, not default admin, and (is default admin OR target is not admin) */}
                    {user.id !== currentUser?.id && !Boolean(user.is_default_admin) && (Boolean(currentUser?.is_default_admin) || user.role !== 'admin') && (
                      <button onClick={() => handleDelete(user.id)} className="px-2 py-1.5 text-[#e63946] border border-[#e63946]/30 hover:bg-[#e63946]/5 rounded transition-colors flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        DELETE
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500 text-sm">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e63946" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                Add New User
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6">
              {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100">{error}</div>}
              
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">User Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Richard Hendricks" className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#e63946] focus:ring-1 focus:ring-[#e63946]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">User Email</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="e.g. richard@washingtontimes.com" className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#e63946] focus:ring-1 focus:ring-[#e63946]" />
                </div>
                <div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">User Password</label>
                    <div className="relative">
                      <input required type={showPassword ? "text" : "password"} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="Create user passcode" className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#e63946] focus:ring-1 focus:ring-[#e63946] pr-10" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none">
                        {showPassword ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        )}
                      </button>
                    </div>
                    <p className="mt-1 text-[10px] text-gray-500">Password must be 7 Characters long and include Atleast 1 Uppercase Letter,1 Lowercase letter,one number, and one special character..</p>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Workspace Role</label>
                  <div className="relative">
                    <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#e63946] focus:ring-1 focus:ring-[#e63946] bg-white cursor-pointer appearance-none">
                      <option value="writer">Writer</option>
                      <option value="reader">Reader</option>
                      {currentUser?.is_default_admin && <option value="admin">Admin</option>}
                    </select>
                    <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors uppercase tracking-widest">Cancel</button>
                <button type="submit" disabled={loading} className="px-6 py-2.5 bg-[#e63946] hover:bg-[#d62828] text-white rounded-lg text-sm font-bold uppercase tracking-widest transition-colors shadow-sm disabled:opacity-50">
                  {loading ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e63946" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                Edit User Details
              </h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6">
              {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100">{error}</div>}
              
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">User Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#e63946] focus:ring-1 focus:ring-[#e63946]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">User Email</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#e63946] focus:ring-1 focus:ring-[#e63946]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">User Password <span className="text-gray-400 font-normal normal-case tracking-normal">(leave blank to keep unchanged)</span></label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="Create new user passcode" className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#e63946] focus:ring-1 focus:ring-[#e63946] pr-10" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none">
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-[10px] text-gray-500">Password must be 7 Characters long and include Atleast 1 Uppercase Letter,1 Lowercase letter,one number, and one special character..</p>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">User Bio</label>
                  <textarea 
                    rows={3} 
                    value={formData.bio} 
                    onChange={e => setFormData({...formData, bio: e.target.value})} 
                    placeholder="Short bio or description..." 
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#e63946] focus:ring-1 focus:ring-[#e63946] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">LinkedIn Profile URL</label>
                  <input 
                    type="text" 
                    value={formData.linkedin_url} 
                    onChange={e => setFormData({...formData, linkedin_url: e.target.value})} 
                    placeholder="https://linkedin.com/in/username" 
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#e63946] focus:ring-1 focus:ring-[#e63946]" 
                  />
                </div>

                {!users.find(u => u.id === formData.id)?.is_default_admin && (
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Workspace Role</label>
                  <div className="relative">
                    <select 
                      value={formData.role} 
                      onChange={e => setFormData({...formData, role: e.target.value})} 
                      className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#e63946] focus:ring-1 focus:ring-[#e63946] bg-white cursor-pointer appearance-none pr-10"
                    >
                      <option value="writer">Writer</option>
                      <option value="reader">Reader</option>
                      {/* Only show Admin option if the edited user is already an admin, or the current user is default admin */}
                      {(Boolean(currentUser?.is_default_admin) || formData.role === 'admin') && <option value="admin">Admin</option>}
                    </select>
                    <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
                )}
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors uppercase tracking-widest">Cancel</button>
                <button type="submit" disabled={loading} className="px-6 py-2.5 bg-[#e63946] hover:bg-[#d62828] text-white rounded-lg text-sm font-bold uppercase tracking-widest transition-colors shadow-sm disabled:opacity-50">
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Profile Details Modal */}
      {isViewModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[480px] overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
              <h2 className="text-[17px] font-bold text-[#0A1A2F] flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                Profile Details
              </h2>
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="p-6 flex flex-col w-full bg-white">
              {/* Profile Top section */}
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={selectedUser.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.name || 'User')}&background=random`} 
                  alt={selectedUser.name} 
                  className="w-16 h-16 rounded-full shadow-sm object-cover border border-gray-100" 
                />
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 leading-none mb-2">{selectedUser.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                          selectedUser.role === 'admin' ? 'border-red-200 text-red-600 bg-white' : 
                          selectedUser.role === 'writer' ? 'border-blue-600 text-blue-600 bg-white' : 
                          'border-gray-200 text-gray-500 bg-white'
                        }`}>
                          {selectedUser.role}
                    </span>
                    {Boolean(selectedUser.is_default_admin) && (
                      <span className="px-2 py-1 rounded text-[9px] font-bold border border-yellow-400 text-yellow-600 bg-yellow-50 flex items-center gap-1">
                        DEFAULT ADMIN
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Profile Details section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Email</label>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    {selectedUser.email}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Bio</label>
                  <div className="bg-[#f8f9fa] rounded-lg p-4 text-[13px] text-gray-600 leading-relaxed min-h-[80px] whitespace-pre-wrap">
                    {selectedUser.bio || "No bio provided."}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">LinkedIn</label>
                  <div className="text-sm text-gray-500">
                    {selectedUser.linkedin_url ? (
                      <a 
                        href={selectedUser.linkedin_url.startsWith('http') ? selectedUser.linkedin_url : `https://${selectedUser.linkedin_url}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        {selectedUser.linkedin_url}
                      </a>
                    ) : (
                      "Not linked."
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 w-full">
                 <button onClick={() => setIsViewModalOpen(false)} className="w-full py-2.5 text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors uppercase tracking-widest">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Success Toast */}
      {successMessage && (
        <div className="fixed bottom-6 right-6 bg-white border border-green-200 text-green-700 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <span className="font-bold text-sm tracking-wide">{successMessage}</span>
          <button onClick={() => setSuccessMessage('')} className="ml-4 text-green-400 hover:text-green-600">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      )}
    </div>
  );
}