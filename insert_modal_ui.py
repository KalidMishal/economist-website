import re

with open('src/app/admin/review-post/[id]/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

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

new_content = re.sub(r'(\s*</>\s*\\n\s*\);\s*\})', r'\n' + modal_ui + r'\1', content)

if new_content == content:
    # Try different regex just in case
    new_content = content.replace("        </>\n\n  );\n}", modal_ui + "\n        </>\n\n  );\n}")

if new_content != content:
    with open('src/app/admin/review-post/[id]/page.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully inserted modal UI.")
else:
    print("Could not find target string!")
