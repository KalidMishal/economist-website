import json

with open('src/app/admin/review-post/[id]/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add States
states = '''  const [isMailBoxOpen, setIsMailBoxOpen] = useState(false);
  const [recipientEmails, setRecipientEmails] = useState<string[]>([]);
  const [recipientInput, setRecipientInput] = useState('');
  const [isSavingRecipients, setIsSavingRecipients] = useState(false);
'''
content = content.replace("const [isPlacementDropdownOpen, setIsPlacementDropdownOpen] = useState(false);", "const [isPlacementDropdownOpen, setIsPlacementDropdownOpen] = useState(false);\n" + states)


# 2. Add DB loading in useEffect
load_logic = '''if (data.post.targeted_emails) {
          try {
            setRecipientEmails(JSON.parse(data.post.targeted_emails));
          } catch(e) {}
        }'''
content = content.replace("setPlacement(data.post.placement || '');", "setPlacement(data.post.placement || '');\n        " + load_logic)


# 3. Add handleSaveRecipients and handleAddRecipients functions
functions = '''  const handleAddRecipients = () => {
    if (!recipientInput.trim()) return;
    const emails = recipientInput.split(/[\s,]+/).filter(e => e.includes('@') && e.includes('.'));
    if (emails.length > 0) {
      setRecipientEmails(prev => Array.from(new Set([...prev, ...emails])));
    }
    setRecipientInput('');
  };

  const handleSaveRecipients = async () => {
    setIsSavingRecipients(true);
    try {
      const res = await fetch(http://localhost:5000/api/posts/, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: titleInput,
          subtitle,
          content: getCleanEditorContent() || previewContent || '',
          mainCategory,
          selectedSubCats,
          tags,
          cardSummary,
          focusKeyword,
          metaDescription,
          readDuration,
          imageUrl: imagePreview,
          status: postData?.status || 'pending',
          placement,
          rejectionReason: '',
          targetedEmails: recipientEmails
        })
      });
      const data = await res.json();
      if(data.success) {
         setIsMailBoxOpen(false);
         alert("Recipients saved successfully!");
      } else {
         alert("Failed to save recipients.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving recipients.");
    } finally {
      setIsSavingRecipients(false);
    }
  };
'''
content = content.replace("  const handleUpdateStatus = async", functions + "\n  const handleUpdateStatus = async")

# Update targetedEmails in handleUpdateStatus PUT request body as well to ensure they aren't wiped when approving.
content = content.replace("rejectionReason: overrideRejectReason || ''", "rejectionReason: overrideRejectReason || '',\n          targetedEmails: recipientEmails")

# 4. Insert targeted emails trigger button UI in sidebar
sidebar_ui = '''                {/* Targeted Email Distribution */}
                <div className="mt-8 border border-[#cce0ff] rounded-xl overflow-hidden shadow-sm">
                  <div className="px-5 py-4 border-b border-[#e6f0ff] bg-[#f5f9ff]">
                    <h3 className="font-bold text-[#1a65d6] text-[11px] uppercase tracking-widest flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      Targeted Email Distribution
                    </h3>
                  </div>
                  <div className="p-5 bg-white">
                    <p className="text-[12px] text-gray-500 mb-4 leading-relaxed">Add specific VIP, partner, or client emails to receive this story upon publication.</p>
                    <button 
                      onClick={() => setIsMailBoxOpen(true)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all flex justify-center items-center gap-2"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a65d6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      Mail Box <span className="text-gray-400 font-normal">(Add Recipients)</span>
                    </button>
                  </div>
                </div>
'''
content = content.replace("                {/* Publish Controls */}", sidebar_ui + "\n                {/* Publish Controls */}")

# 5. Insert Modal
modal_ui = '''
      {/* Targeted Email Modal */}
      {isMailBoxOpen && (
        <div className="fixed inset-0 bg-[#0f172a]/60 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[500px] overflow-hidden flex flex-col relative">
            
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#f0f5ff] flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a65d6" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <h2 className="text-[17px] font-bold text-[#131a26] mb-1">Article Mail Box & Targeted Distribution</h2>
                  <p className="text-[12px] text-gray-500">Add specific emails (VIPs, clients, sponsors) to receive this article upon publication.</p>
                </div>
              </div>
              <button onClick={() => setIsMailBoxOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <label className="block text-[13px] font-bold text-[#131a26] mb-2">Add Recipient Emails</label>
              <div className="flex gap-2 mb-2">
                <input 
                  type="text" 
                  placeholder="e.g. client@company.com, editor@partner.com" 
                  value={recipientInput}
                  onChange={(e) => setRecipientInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddRecipients();
                    }
                  }}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-[#1a65d6]"
                />
                <button 
                  onClick={handleAddRecipients}
                  className="bg-[#0f4b99] hover:bg-[#0a3570] text-white font-bold text-[13px] px-5 py-2.5 rounded-lg transition-colors flex items-center gap-1"
                >
                  + Add
                </button>
              </div>
              <p className="text-[11px] text-gray-500 mb-6 flex items-center gap-1">
                <span className="text-orange-400">??</span> Press Enter or comma (,) to add. You can also paste multiple comma-separated emails.
              </p>

              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                CONFIGURED RECIPIENTS ({recipientEmails.length})
              </label>
              <div className="border border-gray-100 rounded-xl bg-gray-50/50 p-4 min-h-[120px] max-h-[250px] overflow-y-auto">
                {recipientEmails.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-[13px] text-gray-400 italic py-8">
                    No custom emails added yet.
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {recipientEmails.map(email => (
                      <div key={email} className="bg-white border border-gray-200 shadow-sm rounded-full px-3 py-1.5 flex items-center gap-2 text-[13px] text-gray-700">
                        {email}
                        <button onClick={() => setRecipientEmails(recipientEmails.filter(e => e !== email))} className="text-gray-400 hover:text-red-500">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50">
              <button 
                onClick={() => setIsMailBoxOpen(false)}
                className="px-5 py-2.5 text-[13px] font-medium text-gray-600 hover:text-gray-800 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                Close
              </button>
              <button 
                onClick={handleSaveRecipients}
                disabled={isSavingRecipients}
                className="bg-[#0f4b99] hover:bg-[#0a3570] disabled:bg-gray-400 text-white font-bold text-[13px] px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                {isSavingRecipients ? 'Saving...' : '? Save Recipients'}
              </button>
            </div>
          </div>
        </div>
      )}
'''

content = content.replace("    </div>\n  );\n}", modal_ui + "\n    </div>\n  );\n}")

with open('src/app/admin/review-post/[id]/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
