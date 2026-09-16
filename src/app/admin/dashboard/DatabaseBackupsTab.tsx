"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

const IconDownload = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
);

const IconTrash = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);

const IconCloudUpload = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16l-4-4-4 4"></path><path d="M12 12v9"></path><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><path d="M16 16l-4-4-4 4"></path></svg>
);

const IconDatabase = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
);

interface Backup {
  filename: string;
  size: number;
  lastModified: string;
  url?: string;
}

export default function DatabaseBackupsTab() {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [restoringFile, setRestoringFile] = useState<string | null>(null);
  const [uploadingRestore, setUploadingRestore] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchBackups = useCallback(async () => {
    setLoading(true);
    try {
      const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
      const res = await fetch(`http://${hostname}:5000/api/admin/backups`);
      if (res.ok) {
        const data = await res.json();
        setBackups(data);
      }
    } catch (error) {
      console.error("Failed to fetch backups", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const pollBackupStatus = useCallback(async () => {
    try {
      const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
      const res = await fetch(`http://${hostname}:5000/api/admin/backups/status`);
      if (res.ok) {
        const status = await res.json();
        if (status.inProgress) {
          setCreating(true);
          setStatusMessage(`Backup in progress: ${status.stage === 'uploading' ? 'Uploading snapshot to Backblaze B2...' : 'Generating snapshot...'}`);
          return true;
        } else if (status.stage === 'completed' && status.lastCompleted) {
          setCreating(false);
          setStatusMessage(`Backup completed and stored in Backblaze B2: ${status.filename || ''}`);
          fetchBackups();
          setTimeout(() => setStatusMessage(null), 6000);
          return false;
        } else if (status.stage === 'error') {
          setCreating(false);
          setStatusMessage(`Backup error: ${status.error || 'Failed to upload'}`);
          return false;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  }, [fetchBackups]);

  useEffect(() => {
    fetchBackups();
    pollBackupStatus();
  }, [fetchBackups, pollBackupStatus]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (creating) {
      interval = setInterval(async () => {
        const stillRunning = await pollBackupStatus();
        if (!stillRunning) {
          clearInterval(interval);
        }
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [creating, pollBackupStatus]);

  const handleCreateBackup = async () => {
    setCreating(true);
    setStatusMessage('Initiating database backup in background...');
    try {
      const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
      const res = await fetch(`http://${hostname}:5000/api/admin/backups`, {
        method: 'POST'
      });
      if (res.ok) {
        setStatusMessage('Backup running in background: Uploading snapshot to Backblaze B2...');
      } else {
        setCreating(false);
        alert("Failed to start backup.");
      }
    } catch (error) {
      setCreating(false);
      console.error(error);
      alert("Error starting backup.");
    }
  };

  // Restore from cloud snapshot
  const handleRestoreCloud = async (filename: string) => {
    if (!window.confirm(`Are you sure you want to restore the database from cloud snapshot "${filename}"?\n\nThis will update your live articles, users, subscribers, ads, and leads with data from this snapshot.`)) {
      return;
    }

    setRestoringFile(filename);
    setStatusMessage(`Restoring database from cloud backup ${filename}... Please wait.`);

    try {
      const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
      const res = await fetch(`http://${hostname}:5000/api/admin/backups/restore-cloud`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert(`Database restored successfully from "${filename}"!\n\nSummary:\n• Articles: ${data.summary?.articlesRestored || 0}\n• Users: ${data.summary?.usersRestored || 0}\n• Subscribers: ${data.summary?.subscribersRestored || 0}\n• Ads: ${data.summary?.adsRestored || 0}\n• Contacts: ${data.summary?.contactsRestored || 0}\n• Leads: ${data.summary?.leadsRestored || 0}`);
        setStatusMessage(`Database successfully restored from ${filename}!`);
      } else {
        alert(data.message || "Failed to restore database from cloud backup.");
      }
    } catch (error: any) {
      console.error(error);
      alert("Error restoring database: " + error.message);
    } finally {
      setRestoringFile(null);
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  // Upload and restore from JSON file
  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      alert("Please select a valid .json backup file.");
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    if (!window.confirm(`Are you sure you want to restore the database from "${file.name}"?\n\nThis will update your live articles, users, subscribers, ads, and leads.`)) {
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setUploadingRestore(true);
    setStatusMessage(`Reading and restoring database from "${file.name}"... Please wait.`);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const content = event.target?.result as string;
          const backupData = JSON.parse(content);

          const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
          const res = await fetch(`http://${hostname}:5000/api/admin/backups/restore-upload`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ backupData })
          });

          const data = await res.json();
          if (res.ok && data.success) {
            alert(`Database restored successfully from "${file.name}"!\n\nSummary:\n• Articles: ${data.summary?.articlesRestored || 0}\n• Users: ${data.summary?.usersRestored || 0}\n• Subscribers: ${data.summary?.subscribersRestored || 0}\n• Ads: ${data.summary?.adsRestored || 0}\n• Contacts: ${data.summary?.contactsRestored || 0}\n• Leads: ${data.summary?.leadsRestored || 0}`);
            setStatusMessage(`Database successfully restored from ${file.name}!`);
          } else {
            alert(data.message || "Failed to restore database from uploaded JSON.");
          }
        } catch (parseErr: any) {
          alert("Invalid JSON file: " + parseErr.message);
        } finally {
          setUploadingRestore(false);
          if (fileInputRef.current) fileInputRef.current.value = '';
          setTimeout(() => setStatusMessage(null), 5000);
        }
      };
      reader.readAsText(file);
    } catch (err: any) {
      setUploadingRestore(false);
      alert("Error reading file: " + err.message);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  const handleDelete = async (filename: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${filename}" from Backblaze B2?`)) return;
    try {
      const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
      const res = await fetch(`http://${hostname}:5000/api/admin/backups/${encodeURIComponent(filename)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setBackups(backups.filter(b => b.filename !== filename));
        setStatusMessage(`Backup ${filename} deleted successfully.`);
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        alert("Failed to delete backup from Backblaze B2.");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting backup.");
    }
  };

  const handleDownload = (filename: string) => {
    try {
      const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
      const downloadUrl = `http://${hostname}:5000/api/admin/backups/${encodeURIComponent(filename)}/download`;
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
    }
  };

  const formatSize = (bytes: number) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
      {/* Hidden file input for Upload JSON Restore */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileSelected} 
        accept=".json,application/json" 
        className="hidden" 
      />

      {/* Header Info */}
      <div className="p-8 pb-6 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="max-w-[700px]">
          <h2 className="text-[22px] font-bold text-[#0B1E36]">Database Backups & Cloud Restore</h2>
          <p className="text-sm text-gray-400 mt-1 font-mono mb-4">Automated and manual database snapshots stored on Backblaze B2.</p>
          <p className="text-[13px] text-gray-500 leading-relaxed">
            Backups are automatically taken every 24 hours. The snapshots include all live published articles, user accounts, newsletter subscribers, active ad placements, contact us submissions, and advertise client leads.
          </p>
          {statusMessage && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              {statusMessage}
            </div>
          )}
        </div>
        <div className="flex gap-3 shrink-0 w-full lg:w-auto">
          <button 
            onClick={handleCreateBackup}
            disabled={creating || uploadingRestore || !!restoringFile}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 border border-[#e3120b] text-[#e3120b] hover:bg-[#fff0f0] px-5 py-2.5 rounded text-[11px] font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            <IconDatabase size={14} />
            {creating ? (
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 border-2 border-[#e3120b] border-t-transparent rounded-full animate-spin"></span>
                UPLOADING TO B2...
              </span>
            ) : (
              'CREATE B2 BACKUP'
            )}
          </button>
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingRestore || creating || !!restoringFile}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#0B1E36] hover:bg-[#1a365d] text-white px-5 py-2.5 rounded text-[11px] font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            <IconCloudUpload size={14} />
            {uploadingRestore ? 'RESTORING JSON...' : 'UPLOAD JSON RESTORE'}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-white text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100">
            <tr>
              <th className="px-8 py-5">BACKUP FILE</th>
              <th className="px-6 py-5">BACKUP DATE</th>
              <th className="px-6 py-5">FILE SIZE</th>
              <th className="px-8 py-5 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-8 py-12 text-center text-gray-400 font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    Loading backups from Backblaze B2...
                  </div>
                </td>
              </tr>
            ) : backups.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-8 py-12 text-center text-gray-400">
                  No backups found in Backblaze B2. Click &ldquo;CREATE B2 BACKUP&rdquo; above to create the first snapshot.
                </td>
              </tr>
            ) : (
              backups.map((backup) => (
                <tr key={backup.filename} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-4 font-semibold text-[#0B1E36] font-mono text-[13px]">{backup.filename}</td>
                  <td className="px-6 py-4 text-gray-500 text-[13px]">{formatDate(backup.lastModified)}</td>
                  <td className="px-6 py-4 text-gray-500 text-[13px] font-mono">{formatSize(backup.size)}</td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => handleRestoreCloud(backup.filename)}
                        disabled={restoringFile === backup.filename || uploadingRestore}
                        className="text-[#e3120b] bg-[#ffeeee] hover:bg-[#fedddd] px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                      >
                        {restoringFile === backup.filename ? 'RESTORING...' : 'RESTORE'}
                      </button>
                      <button 
                        onClick={() => handleDownload(backup.filename)} 
                        title="Download JSON Backup"
                        className="text-gray-400 hover:text-[#0B1E36] p-1 transition-colors"
                      >
                        <IconDownload size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(backup.filename)} 
                        title="Delete Backup"
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                      >
                        <IconTrash size={16} />
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
  );
}
