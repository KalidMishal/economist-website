import re

with open('src/app/admin/review-post/[id]/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add states
state_addition = '''  const [imageCredit, setImageCredit] = useState('');
  const [isUploadingCloud, setIsUploadingCloud] = useState(false);
  const [uploadedCloudSuccessMsg, setUploadedCloudSuccessMsg] = useState('');'''
content = re.sub(r'const \[imageCredit,\s*setImageCredit\]\s*=\s*useState\(\'\'\);', state_addition, content)

# 2. Add handleFileUpload function
upload_func = '''  const handleFileUpload = (file: File) => {
    setImageFile(file);
    setIsUploadingCloud(true);
    setUploadedCloudSuccessMsg('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
        } else {
          if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const formData = new FormData();
          formData.append('folder', 'articles');
          formData.append('file', blob, file.name.replace(/\.[^/.]+$/, "") + ".webp");
          try {
            const res = await fetch('http://localhost:5000/api/upload', {
              method: 'POST',
              body: formData
            });
            const data = await res.json();
            if (data.success) {
              setImageUrl(data.url);
              setUploadedCloudSuccessMsg(? FILE " + file.name.toUpperCase() + " COMPRESSED & UPLOADED TO CLOUD!);
            } else {
              alert('Upload failed: ' + data.message);
            }
          } catch (err) {
            console.error('Upload error', err);
            alert('Network error during upload');
          } finally {
            setIsUploadingCloud(false);
          }
        }, 'image/webp', 0.8);
      };
      if (event.target) img.src = event.target.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleInsertImage'''
content = re.sub(r'\s*const handleInsertImage', "\n" + upload_func, content, count=1)

# 3. Simplify handleInsertImage
old_upload_logic = r'''if \(imageFile\) \{.*?reader\.readAsDataURL\(imageFile\);\n\s*\} else \{\n\s*performInsertion\(imageUrl\);\n\s*setImageUrl\(''\);\n\s*setImageFile\(null\);\n\s*setImageCaption\(''\);\n\s*setImageCredit\(''\);\n\s*setIsImageModalOpen\(false\);\n\s*setIsEditingImage\(false\);\n\s*setIsInsertingImage\(false\);\n\s*\}\n\s*\};'''

new_upload_logic = '''performInsertion(imageUrl);
      setImageUrl('');
      setImageFile(null);
      setImageCaption('');
      setImageCredit('');
      setUploadedCloudSuccessMsg('');
      setIsImageModalOpen(false);
      setIsEditingImage(false);
      setIsInsertingImage(false);
    };'''

content = re.sub(old_upload_logic, new_upload_logic, content, flags=re.DOTALL)
content = content.replace("if (!imageUrl && !imageFile) { setIsInsertingImage(false); return; }", "if (!imageUrl) { setIsInsertingImage(false); return; }")

# 4. Modify the UI
old_ui = r'''\{/\* Choose File \*/\}\s*<div className="mb-5">\s*<label className="block text-\[10px\] font-bold text-gray-500 uppercase tracking-widest mb-2">Choose Computer File</label>\s*<div className="border border-dashed border-gray-400 rounded p-4 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">\s*<input\s*type="file"\s*accept="image/\*"\s*onChange=\{\(e\) => \{\s*if \(e\.target\.files && e\.target\.files\[0\]\) \{\s*setImageFile\(e\.target\.files\[0\]\);\s*setImageUrl\(''\);\s*\}\s*\}\}\s*className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"\s*/>\s*<span className="text-sm font-mono text-gray-700">\s*\{imageFile \? imageFile\.name : \(imageUrl \? "current_image\.jpg" : "Choose file No file chosen"\)\}\s*</span>\s*</div>\s*</div>'''

new_ui = '''{/* Paste Image URL */}
              <div className="mb-4">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Paste Image URL</label>
                <input 
                  type="text" 
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..." 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6] transition-colors"
                />
              </div>

              <div className="flex items-center gap-4 my-4">
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">OR UPLOAD FILE</span>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>

              {/* Choose File */}
              <div className="mb-5">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Choose Computer File</label>
                <div className="border border-dashed border-gray-400 rounded p-4 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <span className="text-sm font-mono text-gray-700 flex items-center gap-2">
                    {isUploadingCloud ? (
                      <><svg className="animate-spin h-4 w-4 text-gray-500" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Uploading...</>
                    ) : (
                      imageFile ? imageFile.name : (imageUrl ? "current_image.jpg" : "Choose File No file chosen")
                    )}
                  </span>
                </div>
                {uploadedCloudSuccessMsg && (
                  <div className="mt-2 text-[10px] font-bold text-green-600 uppercase tracking-widest flex items-center gap-1">
                    {uploadedCloudSuccessMsg}
                  </div>
                )}
              </div>'''

content = re.sub(old_ui, new_ui, content, flags=re.DOTALL)

with open('src/app/admin/review-post/[id]/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
