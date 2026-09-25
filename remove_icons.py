import os
import re

def remove_icons(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = r'<div className="flex items-center gap-3">\s*<button className="w-9 h-9 rounded-full border border-\[#e6e6e6\] text-gray-500 hover:text-\[#E3120B\] hover:border-\[#E3120B\] flex items-center justify-center transition-colors bg-white">[\s\S]*?<\/ShareDropdown>\s*<\/div>'
    
    new_content = re.sub(pattern, '', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Processed {file_path}")

remove_icons('src/app/writer/new-post/page.tsx')
remove_icons('src/app/admin/review-post/[id]/page.tsx')
