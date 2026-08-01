import re
content = open('src/app/page.tsx', 'r', encoding='utf-8').read()
content = content.replace('ADVERTISEMENT (970 Ã— 400)', 'ADVERTISEMENT (970 x 400)')
content = content.replace('ADVERTISEMENT (300 Ã— 260)', 'ADVERTISEMENT (300 x 260)')
content = content.replace('ADVERTISEMENT (336 Ã— 770)', 'ADVERTISEMENT (336 x 770)')
content = content.replace('ADVERTISEMENT (300 Ã— 600)', 'ADVERTISEMENT (300 x 600)')
content = content.replace('ADVERTISEMENT (1150 Ã— 380)', 'ADVERTISEMENT (1150 x 380)')

content = re.sub(r'(\n\s*<span[^>]+>)ADVERTISEMENT(</span>\n\s*</div>\n\s*<!-- TOP HIGHLIGHTS -->)', r'\1ADVERTISEMENT (336 x 770)\2', content)

content = re.sub(r'ADVERTISEMENT \([^\)]+\)', lambda m: m.group(0).replace('Ã—', 'x').replace('Â', '').replace('×', 'x').replace('A-', 'x'), content)
content = re.sub(r'ADVERTISEMENT \(970 [^0-9]+ 400\)', 'ADVERTISEMENT (970 x 400)', content)
content = re.sub(r'ADVERTISEMENT \(300 [^0-9]+ 260\)', 'ADVERTISEMENT (300 x 260)', content)
content = re.sub(r'ADVERTISEMENT \(336 [^0-9]+ 770\)', 'ADVERTISEMENT (336 x 770)', content)
content = re.sub(r'ADVERTISEMENT \(300 [^0-9]+ 600\)', 'ADVERTISEMENT (300 x 600)', content)
content = re.sub(r'ADVERTISEMENT \(1150 [^0-9]+ 380\)', 'ADVERTISEMENT (1150 x 380)', content)

# Check line 297 manually just in case regex above failed due to comments
if '<!-- TOP HIGHLIGHTS -->' not in content:
    # use line index
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if 'mb-6 ml-[-2%] pr-5' in lines[i-1] and 'ADVERTISEMENT' in line and '(' not in line:
            lines[i] = line.replace('ADVERTISEMENT', 'ADVERTISEMENT (336 x 770)')
    content = '\n'.join(lines)

open('src/app/page.tsx', 'w', encoding='utf-8').write(content)
print("Done fixing ad encodings")
