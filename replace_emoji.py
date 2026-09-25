import re

with open('src/app/admin/review-post/[id]/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

bulb_svg = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400 flex-shrink-0"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>'

new_content = content.replace('<span className="text-orange-400">??</span>', bulb_svg)

if new_content != content:
    with open('src/app/admin/review-post/[id]/page.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Replaced emoji with SVG bulb.")
else:
    print("Did not find emoji.")
