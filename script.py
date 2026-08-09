import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

def replace_span(match):
    full_span = match.group(0)
    classes = match.group(1)
    text = match.group(2)
    
    # Skip non-categories
    if 'View all latest' in text or '&rarr;' in text or text.strip() in ['1', '2', '3', '4', '5'] or 'ADVERTISEMENT' in text:
        return full_span
        
    # Also skip if it's already exactly the Law & Justice one, though it won't hurt to process
    
    # Remove typography-related classes
    classes_list = classes.split(' ')
    new_classes = []
    for c in classes_list:
        if c.startswith('text-[') and c.endswith('px]'): continue
        if c.startswith('xl:text-'): continue
        if c in ['font-sans', 'font-medium', 'font-bold', 'uppercase', 'tracking-tight', 'tracking-wider', 'tracking-widest']: continue
        if c.strip() == '': continue
        new_classes.append(c)
        
    # Insert new typography classes right after text-[#E3120B]
    if 'text-[#E3120B]' in new_classes:
        idx = new_classes.index('text-[#E3120B]')
        new_classes.insert(idx + 1, 'text-[13px]')
        new_classes.insert(idx + 2, 'xl:text-[14px]')
        new_classes.insert(idx + 3, 'font-bold')
        new_classes.insert(idx + 4, 'uppercase')
        new_classes.insert(idx + 5, 'tracking-widest')
    else:
        new_classes = ['text-[#E3120B]', 'text-[13px]', 'xl:text-[14px]', 'font-bold', 'uppercase', 'tracking-widest'] + new_classes
        
    final_classes = ' '.join(new_classes)
    return f'<span className="{final_classes}">{text}</span>'

# Regex to match spans with text-[#E3120B]
pattern = r'<span className="([^"]*text-\[#E3120B\][^"]*)">([^<]+)</span>'
new_content = re.sub(pattern, replace_span, content)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Updated page.tsx")
