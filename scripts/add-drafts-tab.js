const fs = require('fs');
let code = fs.readFileSync('src/app/writer/dashboard/page.tsx', 'utf-8');

// Add activeTab state and drafts state
code = code.replace(/const \[isSettingsOpen, setIsSettingsOpen\] = useState\(false\);/, 
  `const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Published');
  const [drafts, setDrafts] = useState<any[]>([]);`);

// In useEffect, read draft and URL
code = code.replace(/useEffect\(\(\) => \{/, `useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('tab=drafts')) {
      setActiveTab('Drafts');
    }
    const draft = localStorage.getItem('draftPost');
    if (draft) {
      setDrafts([JSON.parse(draft)]);
    }`);

// Update the tabs UI
const tabsHtml = `
        <div className="flex items-center gap-6 border-b border-gray-200 mb-6 px-1">
          {['Published', 'Drafts', 'Pending review', 'Trash'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={\`font-medium text-[15px] pb-3 border-b-2 transition-colors \${activeTab === tab ? 'text-[#1a65d6] border-[#1a65d6]' : 'text-gray-500 hover:text-gray-800 border-transparent'}\`}
            >
              {tab} {tab === 'Drafts' && drafts.length > 0 && <span className="ml-1 bg-[#f0f5ff] text-[#1a65d6] text-[10px] font-bold px-1.5 py-0.5 rounded-full">{drafts.length}</span>}
            </button>
          ))}
        </div>
`;
code = code.replace(/<div className="flex items-center gap-6 border-b border-gray-200 mb-6 px-1">[\s\S]*?<\/div>/, tabsHtml);

// Add the Drafts table view
const draftsTable = `
          {/* Drafts List */}
          {activeTab === 'Drafts' && drafts.length > 0 ? (
            <div className="w-full">
              {/* Header row */}
              <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-3 mb-2 mt-4 px-6">
                <div className="flex-1">Post Title & Summary</div>
                <div className="w-[120px]">Category</div>
                <div className="w-[120px]">Date</div>
                <div className="w-[100px]">Status</div>
                <div className="w-[100px] text-right">Actions</div>
              </div>
              
              {/* Draft Rows */}
              {drafts.map((draft, idx) => {
                // Extract summary
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = draft.content || '';
                const textContent = tempDiv.textContent || tempDiv.innerText || '';
                const summary = textContent.slice(0, 150) + (textContent.length > 150 ? '...' : '');

                return (
                  <div key={idx} className="flex items-start px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                    <div className="flex-1 flex gap-4 pr-6">
                      {draft.imageUrl && (
                        <div className="w-[60px] h-[60px] rounded overflow-hidden flex-shrink-0 border border-gray-200 bg-gray-100">
                          <img src={draft.imageUrl} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <h3 className="font-bold text-[#0f0f0f] text-[15px] mb-1 leading-tight">{draft.title || 'Untitled Draft'}</h3>
                        <p className="text-[13px] text-gray-600 leading-snug line-clamp-2">{summary}</p>
                        <span className="text-[11px] text-gray-400 font-sans mt-2">5 min read</span>
                      </div>
                    </div>
                    <div className="w-[120px] pt-1">
                      <span className="text-[13px] font-bold text-gray-800">{draft.mainCategory || '-'}</span>
                    </div>
                    <div className="w-[120px] pt-1">
                      <span className="text-[13px] text-gray-500">{draft.date || '-'}</span>
                    </div>
                    <div className="w-[100px] pt-1">
                      <span className="bg-gray-100 text-gray-800 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">Draft</span>
                    </div>
                    <div className="w-[100px] pt-1 text-right flex items-center justify-end gap-3">
                      <button onClick={() => router.push('/writer/new-post')} className="text-[#1a65d6] hover:text-blue-800 text-[13px] font-bold">Edit Post</button>
                      <button onClick={() => {
                        localStorage.removeItem('draftPost');
                        setDrafts([]);
                      }} className="text-gray-400 hover:text-red-500">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="relative w-[120px] h-[120px] mb-6 flex items-center justify-center">
                {/* Abstract Illustration Elements */}
                <div className="absolute top-2 left-0 w-4 h-4 bg-[#1f2937] rounded-sm transform -rotate-12"></div>
                
                <div className="absolute right-0 top-6 w-16 h-16 border-t-2 border-r-2 border-[#fbcfe8] rounded-tr-full"></div>
                
                <div className="absolute bottom-4 left-6 w-12 h-6 bg-[#fbbf24] rounded-b-full"></div>
                
                <div className="absolute right-2 bottom-8 w-3 h-3 bg-[#34d399] rounded-full"></div>
                
                <div className="absolute top-4 right-8 w-1 h-1 bg-[#1f2937] rounded-full"></div>
                <div className="absolute bottom-6 right-12 w-1 h-1 bg-[#1f2937] rounded-full"></div>

                {/* Main Blue Box */}
                <div className="relative z-10 w-12 h-12 bg-[#1a65d6] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 transform rotate-6">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#0f0f0f] mb-2">Share what's on your mind</h3>
              <p className="text-gray-500 text-sm mb-6">Create or import posts to start publishing.</p>
              
              <button onClick={() => router.push('/writer/new-post')} className="text-[#1a65d6] hover:text-blue-800 font-medium text-sm flex items-center gap-1 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Create Post
              </button>
            </div>
          )}
`;

code = code.replace(/<div className="flex-1 flex flex-col items-center justify-center p-8">[\s\S]*?<\/div>\s*<\/div>\s*<\/main>/, draftsTable + '\n        </div>\n      </main>');

fs.writeFileSync('src/app/writer/dashboard/page.tsx', code);
console.log('Added drafts view to dashboard');
