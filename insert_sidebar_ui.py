import sys

with open('src/app/admin/review-post/[id]/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

sidebar_ui = '''
                {/* Targeted Email Distribution */}
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

target_string = '''                          </div>
                        </>
                      )}
                    </div>
                  </div>'''

if target_string in content:
    content = content.replace(target_string, target_string + "\n" + sidebar_ui)
    with open('src/app/admin/review-post/[id]/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully inserted sidebar UI.")
else:
    print("Could not find target string!")
    sys.exit(1)
