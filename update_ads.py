import sys

def update_ads(filepath):
    lines = open(filepath, 'r', encoding='utf-8').read().splitlines()
    
    # We will modify specific lines
    # Line 357: 970x400
    if 'ADVERTISEMENT' in lines[356]:
        lines[356] = lines[356].replace('ADVERTISEMENT', 'ADVERTISEMENT (970 × 400)')
        
    # Line 546: 300x260
    if 'ADVERTISEMENT' in lines[545]:
        lines[545] = lines[545].replace('ADVERTISEMENT', 'ADVERTISEMENT (300 × 260)')
        
    # Line 777: 300x770
    if 'ADVERTISEMENT' in lines[776]:
        lines[776] = lines[776].replace('ADVERTISEMENT', 'ADVERTISEMENT (336 × 770)')
        
    # Line 983: 336x600 (or something)
    if 'ADVERTISEMENT' in lines[982]:
        lines[982] = lines[982].replace('ADVERTISEMENT', 'ADVERTISEMENT (300 × 600)')
        
    # Line 993: 1150x380
    if 'ADVERTISEMENT' in lines[992]:
        lines[992] = lines[992].replace('ADVERTISEMENT', 'ADVERTISEMENT (1150 × 380)')
        
    open(filepath, 'w', encoding='utf-8').write('\n'.join(lines))
    print("Done")

update_ads('src/app/page.tsx')
