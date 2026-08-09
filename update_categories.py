import re
import os

def process_file(filepath):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    def repl(m):
        class_str = m.group(1)
        text_content = m.group(2)
        
        # Skip non-category text
        skip_list = ['1', '2', '3', '4', '5', '&rarr;', 'View all latest news', '"', 'Law &amp; Justice', 'Law & Justice']
        if text_content.strip() in skip_list:
            return m.group(0)
            
        classes = class_str.split()
        
        # Classes to remove
        remove_patterns = [
            r'^text-\[\d+(\.\d+)?px\]$',
            r'^xl:text-\[\d+(\.\d+)?px\]$',
            r'^font-(sans|serif|medium|semibold|bold)$',
            r'^uppercase$',
            r'^tracking-.*$',
            r'^text-\[#[eE]3120[bB]\]$'
        ]
        
        new_classes = []
        for c in classes:
            should_remove = False
            for pat in remove_patterns:
                if re.match(pat, c):
                    should_remove = True
                    break
            if not should_remove:
                new_classes.append(c)
                
        # Add desired classes
        new_classes = ['text-[#E3120B]', 'text-[11px]', 'font-bold'] + new_classes
        
        # Remove duplicates while preserving order
        seen = set()
        final_classes = []
        for c in new_classes:
            if c not in seen:
                seen.add(c)
                final_classes.append(c)
                
        new_class_str = " ".join(final_classes)
        return f'<span className="{new_class_str}">{text_content}</span>'

    # Match any span that contains the red color
    new_content = re.sub(r'<span className="([^"]*text-\[#[eE]3120[bB]\][^"]*)">([^<]+)</span>', repl, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

process_file('src/app/page.tsx')
process_file('src/app/topics/[slug]/page.tsx')
print('DONE')
