with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find('Latest News</h2>')
if idx != -1:
    before = content[:idx]
    after = content[idx:]
    
    after = after.replace('<span className="text-[#E3120B] text-[11px] font-bold mb-1">Markets</span>', '<span className="text-[#E3120B] text-[12px] font-bold uppercase tracking-wider mb-1">Markets</span>', 1)
    after = after.replace('<span className="text-[#E3120B] text-[11px] font-bold mb-1">Business</span>', '<span className="text-[#E3120B] text-[12px] font-bold uppercase tracking-wider mb-1">Business</span>', 2)
    
    with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(before + after)

print("DONE")
